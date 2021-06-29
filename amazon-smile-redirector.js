// ==UserScript==
// @name         Amazon Smile Redirector
// @namespace    https://github.com/naschorr/userscripts
// @version      0.2
// @description  Redirects regular Amazon URLs to their equivalent Amazon Smile domain
// @author       You
// @match        https://*.amazon.com/*
// @icon         https://www.google.com/s2/favicons?domain=amazon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Get a useful URL object, versus the USVString returned by location.href
    const url = new URL(location.href);

    /*
        Don't redirect if we're already at the smile subdomain. Similarly don't redirect
        if we're at an AWS subdomain.
    */
    const hostname = url.hostname.toLowerCase();
    if (hostname.includes('smile') || hostname.includes('aws')) {
        return;
    }

    // Update the hostname
    url.hostname = 'smile.amazon.com';

    // Perform a redirection, but without updating the history tree
    location.replace(url);
})();