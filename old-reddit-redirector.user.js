// ==UserScript==
// @name         Old Reddit Redirector
// @namespace    https://github.com/naschorr/userscripts
// @version      0.2
// @description  try to take over the world!
// @author       You
// @include      https://*reddit.com/*
// @exclude      https://*old*reddit.com/*
// @exclude      https://*reddit.com/poll/*
// @icon         https://www.google.com/s2/favicons?domain=reddit.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Get a useful URL object, versus the USVString returned by location.href
    const url = new URL(location.href);

    // Update the hostname
    url.hostname = 'old.reddit.com';

    // Perform a redirection, but without updating the history tree
    location.replace(url);
})();
