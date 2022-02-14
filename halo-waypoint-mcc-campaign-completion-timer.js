// ==UserScript==
// @name         Halo Waypoint MCC Campaign Completion Time Tracker
// @namespace    https://github.com/naschorr/userscripts
// @version      0.1
// @description  Adds up and displays the campaign completion times in Halo Waypoint's MCC Service Record
// @author       https://github.com/naschorr
// @match        https://*halowaypoint.com/halo-the-master-chief-collection/*
// @icon         https://www.google.com/s2/favicons?domain=halowaypoint.com
// @grant        none
// ==/UserScript==

function calculateCompletionDateString(nodelist) {
    const seconds = Array.from(nodelist).reduce(
        (previousValue, element) => {
          const time = parseFloat(element.textContent) || 0;
          return previousValue + time;
        },
        0
    );
  
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}

function updateCompletionTimes() {
    const singlePlayerCompletionNodes = document.querySelectorAll('.campaign-tables table[aria-label*="Single Player"] .labels+tbody tr td:last-child');
    const coopCompletionNodes = document.querySelectorAll('.campaign-tables table[aria-label*="Co-Op"] .labels+tbody tr td:last-child');

    const singlePlayerCompletionDateString = calculateCompletionDateString(singlePlayerCompletionNodes);
    const coopCompletionDateString = calculateCompletionDateString(coopCompletionNodes);
    
    const tables = document.querySelectorAll('.campaign-tables .title')
    tables[0].textContent = `Single Player (${singlePlayerCompletionDateString})`
    tables[1].textContent = `Co-Op (${coopCompletionDateString})`
}

(function() {
    'use strict';

    const checkInterval = setInterval(() => {
        if (document.querySelector('.campaign-tables table[aria-label*="Single Player"] .labels+tbody') != null) {
            updateCompletionTimes();
            clearInterval(checkInterval);
        }
    }, 250);
})();
