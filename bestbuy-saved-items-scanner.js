// ==UserScript==
// @name         BestBuy Saved Items Scanner
// @namespace    https://github.com/naschorr/userscripts
// @version      0.1
// @description  Repeatedly refresh a BetBuy's "saved items" page, look for specific "Add to Cart" buttons, click them if present, and make a lot of noise on success. Derived from the work done by https://github.com/beporter
// @author       https://github.com/beporter and https://github.com/naschorr
// @match        https://www.bestbuy.com/site/customer/lists/manage/saveditems
// @grant        none
// @run-at       document-idle
// @require      https://cdnjs.cloudflare.com/ajax/libs/howler/2.1.3/howler.min.js#sha256-/Q4ZPy6sMbk627wHxuaWSIXS1y7D2KnMhsm/+od7ptE=
// @downloadURL  https://gist.githubusercontent.com/beporter/ce76204bcba35d9edb66b395bb5e9305/raw/add_to_cart.user.js
// ==/UserScript==

(function() {
    'use strict';

    const CONFIG = {
            site: 'BestBuy',
            urls: ['https://www.bestbuy.com/site/customer/lists/manage/saveditems'],
            rootSelector: '.card-actions',
            buttonSelector: 'button.add-to-cart-button:not([disabled])', // relative to the element found by the rootSelector
            summarySelector: 'div.fulfillment-fulfillment-summary', //relative to the element found by the rootSelector
            selector: '.card-actions button.add-to-cart-button:not([disabled])',
            loadWait: 5,
            cooldown: 5,
            active: true,
    };

    // Scan the page for the provided selector and "click" them if present.
    function triggerClicks(config) {``
        var anyClicked = false;
        const itemNodes = document.querySelectorAll(config.rootSelector);

        const buttons = [];
        itemNodes.forEach(item => {
            const button = item.querySelector(config.buttonSelector);
            const summary = item.querySelector(config.summarySelector);

            /*
              Ensure the button exists, and that the summary doesn't say that the item is unavailable. Often an item won't be in stock near you
              (within 250 miles), but BestBuy will allow for you to attempt to find another store. This won't return any results, but it will
              trigger the alert and stop the scanner process, so the below check helps to avoid that.
            */
            if (!!button && !summary.textContent.toLowerCase().includes('unavailable')) {
                buttons.push(button);
            }
        });

        // No available "Add to Cart" buttons. Cool down and refresh.
        if (!buttons.length) {
            console.log(`${config.site}: No active "Add to Cart" buttons.`);
            return anyClicked;
        }

        buttons.forEach((b) => {
            var clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('click', true, true);
            b.dispatchEvent(clickEvent);
            console.log(`${config.site}: Clicked "Add to Cart" button.`);
            anyClicked = true;
        });

        return anyClicked;
    }

    function refreshInSecs(secs) {
        console.log(`Scheduling page refresh in ${secs} secs.`);
        window.setTimeout(() => {
            window.location.reload(true);
        }, secs * 1000);
    }

    function waitToClick(config, callback) {
        console.log(`Scheduling clicks for ${config.site}.`);
        window.setTimeout(() => {
            callback(config);
        }, config.loadWait * 1000);
    }

    function locationStartsWithAnyOfUrls(urls) {
        return urls.reduce((acc, url) => {
            return acc || window.location.href.startsWith(url);
        }, false);
    }

    function playAlertSound() {
        new window.Howl({
            src: ['//freesound.org/data/previews/187/187404_635158-lq.mp3'],
            autoplay: false,
            loop: true,
            volume: 1.0,
        }).play();
    }

    // function main()
    waitToClick(CONFIG, (config) => {
        if (triggerClicks(config)) {
            playAlertSound();
        } else if (config.cooldown) {
            refreshInSecs(config.cooldown);
        }
    });
})();
