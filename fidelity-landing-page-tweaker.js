// ==UserScript==
// @name         Fidelity Landing Page Tweaker
// @namespace    https://github.com/naschorr/userscripts
// @version      0.1
// @description  Tweaks the "Today's Markets" graph to show your desired fund & date range
// @author       naschorr
// @match        https://www.fidelity.com/
// @icon         https://www.google.com/s2/favicons?domain=fidelity.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Uncomment the index that you'd like to be plotted:
    // const INDEX_NAME = 'dji';    // DJIA (Default)
    // const INDEX_NAME = 'nasdaq'; // NASDAQ
    const INDEX_NAME = 'spx';       // S&P 500
    // const INDEX_NAME = 'ftse';   // FTSE 100
    // const INDEX_NAME = 'nikkei'; // NIKKEI 225

    // Uncomment the date range that you'd like to be plotted:
    const DATE_RANGE = '1D'; // One day (Default)
    // const DATE_RANGE = '5D'; // Five days
    // const DATE_RANGE = '1M'; // One month
    // const DATE_RANGE = '6M'; // Six months
    // const DATE_RANGE = '1Y'; // One year

    window.addEventListener('load', () => {
        // Force into next render cycle, because sometimes the graph still isn't ready after it's fully loaded
        setTimeout(() => {
            // Select the index
            document.querySelector(`div.market-chart--container div[id*='${INDEX_NAME}']`).click();

            // Select the date range
            document.querySelector(`ul.market-chart--period li a[class*='${DATE_RANGE}']`).click();
        }, 0);
    });
}());