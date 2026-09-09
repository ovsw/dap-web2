const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// Run the actual Nuxt store with the flags that Nuxt injects into each bundle.
function loadStore(flags) {
  const source = fs.readFileSync(path.join(__dirname, "../store/index.js"), "utf8");
  return vm.runInNewContext(
    source.replace(/export const /g, "const ") + "\n({ state, mutations, actions })",
    { process: flags }
  );
}

function init(store, client) {
  const state = store.state();
  return store.actions.nuxtServerInit(
    { commit: (name, value) => store.mutations[name](state, value) },
    { $sanity: client }
  ).then(() => state);
}

async function main() {
  const flags = { server: true, static: true, dev: false };
  const store = loadStore(flags);
  let calls = 0;
  let resolve;
  const response = new Promise(done => { resolve = done; });
  const client = { fetch(query) {
    calls++;
    assert.strictEqual(query, '*[ _id == "siteSettings"].content.alertItems');
    return response;
  } };

  const pending = Array.from({ length: 161 }, () => init(store, client));
  assert.strictEqual(calls, 1, "concurrent routes must share one request");
  resolve([[{ alertIsActive: true, text: "Park notice" }]]);
  const states = await Promise.all(pending);
  assert(states.every(state => state.alertActive));
  states[0].alertItems[0].text = "Changed";
  assert.strictEqual(states[1].alertItems[0].text, "Park notice");
  await init(store, client);
  assert.strictEqual(calls, 1, "later routes must reuse the completed request");

  await init(loadStore(flags), client);
  assert.strictEqual(calls, 2, "a new generation must fetch fresh data");

  for (const runtime of [
    { server: false, static: true, dev: false }, // Browser preview
    { server: true, static: true, dev: true }, // Development
    { server: true, static: false, dev: false } // Ordinary SSR
  ]) {
    const freshStore = loadStore(runtime);
    let reads = 0;
    const freshClient = { fetch: async () => [[{ alertIsActive: ++reads === 1 }]] };
    assert.strictEqual((await init(freshStore, freshClient)).alertActive, true);
    assert.strictEqual((await init(freshStore, freshClient)).alertActive, false);
    assert.strictEqual(reads, 2, "live contexts must not reuse build data");
  }

  const retryStore = loadStore(flags);
  const failure = new Error("Sanity unavailable");
  await assert.rejects(init(retryStore, { fetch: async () => { throw failure; } }),
    error => error === failure);
  const empty = await init(retryStore, { fetch: async () => [] });
  assert.strictEqual(empty.alertItems.length, 0);
  assert.strictEqual(empty.alertActive, false);
  console.log("Store request tests passed: 161 routes, one request; fresh previews; isolated state; failure retry.");
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
