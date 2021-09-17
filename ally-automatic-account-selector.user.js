// ==UserScript==
// @name         Ally Automatic Account Selector
// @namespace    https://github.com/naschorr/userscripts
// @version      0.1
// @description  Auto selects either the "Bank or Invest Login" or "Auto Financing" dropdown option when logging in.
// @author       https://github.com/naschorr
// @match        https://*ally.com/*
// @icon         https://www.google.com/s2/favicons?domain=ally.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Uncomment the appropriate ACCOUNT_TYPE
    const ACCOUNT_TYPE = 'aob';     // Bank or Invest Login
    // const ACCOUNT_TYPE = 'aaos'; // Auto Financing

    // Selectors
    const LOGIN_BUTTON_SELECTOR = '#login-btn';
    const ACCOUNT_SELECTOR = '#drawer-login .allysf-login-v1-select';

    const loginButton = document.querySelector(LOGIN_BUTTON_SELECTOR);
    if (!!loginButton) {
        // Wait for the user to click the login button
        loginButton.addEventListener('click', () => {
            // Select the <select> element, and apply the appropriate ACCOUNT_TYPE
            const accountLoginElement = document.querySelector(ACCOUNT_SELECTOR);
            if (!!accountLoginElement) {
                accountLoginElement.value = ACCOUNT_TYPE;
                console.log(`Updated account type to be ${ACCOUNT_TYPE}`);
            }
        })
    }
})();
