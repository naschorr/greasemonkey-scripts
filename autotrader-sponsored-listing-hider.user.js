// ==UserScript==
// @name         Autotrader Sponsored Listing Hider
// @namespace    https://github.com/naschorr/userscripts
// @version      0.2
// @description  Hides sponsored listings from Autotrader search results
// @author       naschorr
// @match        https://www.autotrader.com/cars-for-sale/*
// @icon         https://www.google.com/s2/favicons?domain=autotrader.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Keep track of the number of listings that were removed
    let removedListings = 0
  
    const hideSponsoredListings = function() {
        // Reset removedListing count
        removedListings = 0

        // Remove the 'alpha' sponsored listing
        const alphaListing = document.querySelector('[data-cmp*=alphaShowcase]');
        if (!!alphaListing) {
            alphaListing.setAttribute('style', 'display: none !important;');
            removedListings += 1;
        }

        // Remove the My Wallet container
        const myWallet = document.querySelector('[data-cmp*=myWallet]');
        if (!!myWallet) {
            myWallet.setAttribute('style', 'display: none !important;');
        }

        // Remove the sponsored listings
        const sponsoredListings = document.querySelectorAll('[data-cmp*=inventorySpotlightListing]');
        if (sponsoredListings.length == 0) {
            console.warn('Unable to find any sponsored listings. Should the selector be updated?');
        }
        sponsoredListings.forEach((element) => {
            const parentContainer = element.closest('[data-cmp*=delayedImpressionWaypoint]');
            if (!parentContainer) {
                console.warn('Unable to find sponsored listing\'s parent element. Should the selector be updated?');
                return;
            }
            
            parentContainer.previousSibling.setAttribute('style', 'display: none !important;'); // remove the 'Sponsored' text
            element.setAttribute('style', 'display: none !important;'); // remove the listing itself
            removedListings += 1;
        });
    };
  
    const updateListingCount = function(count) {
        // Update the results counter at the top of the page
        const resultsTextContainer = document.querySelector('div.results-text-container');
        if (!!resultsTextContainer && count > 0) {
            const resultMatch = resultsTextContainer.textContent.match(/^\d+\S?(\d+)[\D]+(\d+)/);

            if (!!resultMatch && resultMatch.length == 3) {
                const resultsOnPage = (parseInt(resultMatch[1]) || 25) - count;
                const totalResults = (parseInt(resultMatch[2]) - count) || resultMatch[2];

                resultsTextContainer.innerText = `Showing ${resultsOnPage} results out of approximately ${totalResults}`;
            }
        }
    }

    // Hide listings after the page has been loaded
    window.addEventListener('load', () => {
        // Keep track of the listings on page, and rehide them when new ones are loaded in
        let lastListingIds = new Set()
        setInterval(() => {
            const listingIds = Array.from(document.querySelectorAll('[data-cmp=inventoryListing]')).map((element) => element.id);
            const listingIdSet = new Set(listingIds);

            if (!!listingIds && (lastListingIds.size != listingIds.length) || (listingIds.some((id) => !lastListingIds.has(id)))) {
                hideSponsoredListings();
                lastListingIds = listingIdSet;
            }
          
            updateListingCount(removedListings);
        }, 250);
    });
})();
