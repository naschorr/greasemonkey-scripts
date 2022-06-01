// ==UserScript==
// @name        IKEA Gift Card Balance Checker Improvement
// @namespace   https://github.com/naschorr/userscripts
// @match       https://www.ikea.com/us/en/customer-service/gift-cards-*
// @grant       none
// @version     1.0
// @author      naschorr
// @description Quality of life improvements when using IKEA's gift card balance checker service
// ==/UserScript==

(function() {
  'use strict';

  const GIFT_CARD_BALANCE_INPUT_ID = 'cfsBalanceInput';
  const GIFT_CARD_PIN_INPUT_ID = 'cfsPinInput';
  const DEFAULT_TIMEOUT_MS = 250;

  const setNodeValueWithEvent = (node, value) => {
    // Inspired by: https://stackoverflow.com/a/72014541/1724602
    const valueSetter = Object.getOwnPropertyDescriptor(node.__proto__, 'value').set;
    valueSetter.call(node, value);
    // React needs a helping hand to know that something's changed about the input, so give it an event to trigger change detection (or whatever they call it in React)
    node.dispatchEvent(new Event('input', { bubbles: true }));
  }

  const handlePastedPin = (event) => {
    setTimeout(() => {
      event.target.parentNode.querySelectorAll('button')[1].click();
    }, DEFAULT_TIMEOUT_MS);
  }

  const initializeElementOnPasteFunction = (selector, onpaste) => {
    // Get the gift card input element
    const element = document.querySelector(selector);
    if (!element) {
      throw `Unable to select element (${selector})`;
    }

    // Apply the custom paste handler if it doesn't already exist
    if (!element.onpaste) {
      element.onpaste = onpaste;
    }
  }

  const getLastNCharactersFromData = (data, size) => {
    return data.slice(-size);
  }

  const handlePastedGiftCard = (event) => {
    /*
      It might be possible to build a brand new ClipboardEvent with a custom `clipboardData` member (since it's
      immutable). However I'm not too familiar with the nuances of event propagation, and it's much easier just to
      intercept paste events and make the appropriate DOM changes.
    */

    // Kill the event
    event.stopPropagation();
    event.preventDefault();

    // Process the data
    const rawContent = event.clipboardData.getData('text');
    const trimmedContent = getLastNCharactersFromData(rawContent, 13);

    // Update the input
    setNodeValueWithEvent(event.target, trimmedContent);

    // As a bonus, simulate a click on the arrow next to the input to submit the card number, and allow the PIN to be pasted too
    setTimeout(() => {
      event.target.parentNode.querySelector('button').click();

      // We can also update the PIN input element to allow the user to paste the PIN
      setTimeout(() => {
        initializeElementOnPasteFunction(`#${GIFT_CARD_PIN_INPUT_ID}`, handlePastedPin);
      }, DEFAULT_TIMEOUT_MS);
    }, DEFAULT_TIMEOUT_MS);
  }

  const main = () => {
    const documentReadyIntervalId = setInterval(
      () => {
        // Verify that the page has loaded, and thus is should be safe to start querying for elements
        if (document.readyState == 'ready' || document.readyState == 'complete') {
          clearInterval(documentReadyIntervalId);

          initializeElementOnPasteFunction(`#${GIFT_CARD_BALANCE_INPUT_ID}`, handlePastedGiftCard);
        }
      },
      DEFAULT_TIMEOUT_MS
    )
  }

  main();
})();
