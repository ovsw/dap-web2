const assert = require("assert");
const { normalizeYouTubeUrl } = require("../utils/video-url");

assert.strictEqual(
  normalizeYouTubeUrl("https://www.youtube.com/shorts/PALBn1MidM0"),
  "https://www.youtube.com/watch?v=PALBn1MidM0"
);

assert.strictEqual(
  normalizeYouTubeUrl(
    "https://www.youtube.com/shorts/PALBn1MidM0?si=example"
  ),
  "https://www.youtube.com/watch?v=PALBn1MidM0"
);

assert.strictEqual(
  normalizeYouTubeUrl("https://www.youtube.com/watch?v=PALBn1MidM0"),
  "https://www.youtube.com/watch?v=PALBn1MidM0"
);

assert.strictEqual(
  normalizeYouTubeUrl("https://example.com/shorts/PALBn1MidM0"),
  "https://example.com/shorts/PALBn1MidM0"
);

console.log("video URL normalization tests passed");
