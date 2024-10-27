// ==UserScript==
// @name        Google Photos Slide Animation Remover
// @namespace   https://github.com/naschorr/userscripts
// @description Removes the slide animation when navigating between photos in Google Photos
// @version     1.0
// @author      https://github.com/naschorr
// @match       https://photos.google.com/*
// @grant       GM_addStyle
// @run-at      document-start
// ==/UserScript==

// Adapted from: https://greasyfork.org/en/scripts/453192-google-photos-without-slide-transition/code
(function() {
    GM_addStyle(`
      .TTxCae {
        transform: matrix(1, 0, 0, 1, 0, 0) !important;
        opacity: 1 !important;
      }
    `);
  })();
