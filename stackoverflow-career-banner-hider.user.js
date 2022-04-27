// ==UserScript==
// @name         StackOverflow Career Banner Hider
// @namespace    https://github.com/naschorr/userscripts
// @version      0.2
// @description  Hides the "Imagine yourself at..." career banner at the top of some StackOverflow questions
// @author       https://github.com/naschorr
// @match        https://*.stackoverflow.com/questions/*
// @icon         https://www.google.com/s2/favicons?domain=stackoverflow.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const CAREER_BANNER_ELEMENT_SELECTOR = '#clc-mlb';

    const careerBannerElement = document.querySelector(CAREER_BANNER_ELEMENT_SELECTOR);
    if (!!careerBannerElement) {
        /*
            Note that (currently), there's a higher level <div> that wraps the banner. However it's got a more
            generic id and class arrangement, so I'm hesitant to potentially break future StackOverflow
            functionality. Plus removing this child still accomplishes the goal just fine.
        */
        careerBannerElement.remove();
        console.log('Removed StackOverflow career banner');
    }
})();
