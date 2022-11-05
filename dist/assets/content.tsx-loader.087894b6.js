(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/content.tsx.b449b2e8.js")
    );
  })().catch(console.error);

})();
