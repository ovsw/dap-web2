function normalizeYouTubeUrl(url) {
  if (typeof url !== "string") {
    return url;
  }

  try {
    const parsedUrl = new URL(url);
    const youtubeHosts = ["youtube.com", "www.youtube.com", "m.youtube.com"];
    const shortsMatch = parsedUrl.pathname.match(/^\/shorts\/([^/]+)\/?$/);

    if (!youtubeHosts.includes(parsedUrl.hostname) || !shortsMatch) {
      return url;
    }

    return `https://www.youtube.com/watch?v=${shortsMatch[1]}`;
  } catch (error) {
    return url;
  }
}

module.exports = {
  normalizeYouTubeUrl
};
