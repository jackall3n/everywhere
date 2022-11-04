(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/content.tsx.191b0d0e.js")
    );
  })().catch(console.error);

})();
