
// ==UserScript==
// @name         BestBuy Saved Items Scanner
// @namespace    https://github.com/naschorr/userscripts
// @version      0.2
// @description  Repeatedly refresh a BetBuy's "saved items" page, look for specific "Add to Cart" buttons, click them if present, and make a lot of noise on success. Derived from the work done here: https://gist.github.com/beporter/ce76204bcba35d9edb66b395bb5e9305
// @author       https://github.com/beporter and https://github.com/naschorr
// @match        https://www.bestbuy.com/site/customer/lists/manage/saveditems
// @grant        none
// @run-at       document-idle
// @require      https://cdnjs.cloudflare.com/ajax/libs/howler/2.1.3/howler.min.js#sha256-/Q4ZPy6sMbk627wHxuaWSIXS1y7D2KnMhsm/+od7ptE=
// @icon         https://www.google.com/s2/favicons?domain=bestbuy.com
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

    const NOTIFICATION_AUTH_TEMPLATE = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: Arial, Helvetica, sans-serif;">
            <div style="font-size: large; margin: 15px;">Want a notification when stock is added to your cart?</div>
            <div style="display: flex; justify-content: center; align-items: center;">
                <button id="request-notification-grant" style="padding: 5px; margin: 15px; padding: 5px 10px; border-radius: 5px;">Yes</button>
                <button id="request-notification-deny" style="padding: 5px; margin: 15px; padding: 5px 10px; border-radius: 5px;">No</button>
            </div>
        </div>
    `;

    function applyRequestNotificationPopupTemplateToPage() {
        // If it's selectable, then it's already been added
        if (!!document.querySelector('#request-notification-popup')) {
            return;
        }

        // Basic div element init
        const parent = document.querySelector('body');
        const popup = document.createElement('div');
        popup.innerHTML = NOTIFICATION_AUTH_TEMPLATE;

        // Some styling so it doesn't look horrendous
        popup.id = 'request-notification-popup';
        popup.style.width = '200px';
        popup.style.zIndex = '9999';
        popup.style.position = 'absolute';
        popup.style.top = '100px';
        popup.style.padding = '15px';
        popup.style.marginTop = '15px';
        popup.style.marginLeft = 'calc(50% - 100px)';
        popup.style.backgroundColor = 'white';
        popup.style.borderRadius = '5px';
        popup.style.boxShadow = '0px 5px 10px 5px rgba(0, 0, 0, 0.25)';

        parent.appendChild(popup);

        return popup;
    }

    function showRequestNotificationPopup() {
        let popup = document.querySelector('#request-notification-popup');

        if (!!popup) {
            popup.style.display = 'block';
        } else {
            popup = applyRequestNotificationPopupTemplateToPage();
            popup.style.display = 'block';
        }
    }

    function hideRequestNotificationPopup() {
        const popup = document.querySelector('#request-notification-popup');
        if (!!popup) {
            popup.style.display = 'none';
        }
    }

    function requestNotificationPermission(callback) {
        console.log(`current notification permission is '${Notification.permission}'`);

        // Don't bother if the user has denied it already
        if (Notification.permission === "default") {
            showRequestNotificationPopup();

            document.querySelector('#request-notification-grant').addEventListener('click', () => {
                Notification.requestPermission();
                hideRequestNotificationPopup();
            });

            document.querySelector('#request-notification-deny').addEventListener('click', () => {
                console.log('User denied notification permission');
                hideRequestNotificationPopup();
            });
        }
    }

    function attemptNotification(string) {
        // Check for notification permission first, requesting if for some reason the user still hasn't granted/denied it
        if (Notification.permission === "granted") {
            const notification = new Notification(string);
        } else if (Notification.permission === 'default') {
            requestNotificationPermission(attemptNotification(string));
        }
    }

    // Scan the page for the provided selector and "click" them if present.
    function triggerClicks(config) {
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

    function main() {
        // Check for notification permissions, so once an item is found a notification can be pushed
        requestNotificationPermission();

        // Perform the saved items check
        waitToClick(CONFIG, (config) => {
            if (triggerClicks(config)) {
                const notificationText = 'Item found!';

                playAlertSound();
                attemptNotification(notificationText);
                document.title = notificationText;
            } else if (config.cooldown) {
                refreshInSecs(config.cooldown);
            }
        });
    }

    main();
})();
