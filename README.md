# userscripts
All of the greasemonkey/tampermonkey compatible userscripts that I've worked on

## Amazon Smile Redirector
Redirects non-smile URLs to their equivalent `smile.amazon.com` URL

## Autotrader Sponsored Listing Hider
Autotrader is a useful resource during the car buying process, however their listings have steadily gotten more and more cluttered. This script changes that by:
- Removing the big "alpha" sponsored listing at the top of the page
- Removing all of those useless sponsored listings that are found all over the search results
- Removing the "My Wallet" payment calculator from the listings
- Updating the results counter at the top of the page to reflect the new number of non-sponsored listings

## BestBuy Saved Items Scanner
Repeatedly refreshes your BestBuy "Saved Items" page, checking to see if any of them are in stock or not. If any of those items are in stock, then the script will attempt to add them to your cart, then play noises to alert you to this event. The script is also smart enough to not fall into the "Unavailable Nearby" trap, wherein no stock is actually available currently, but BestBuy will still let you attempt to find a nearby store.

Big thanks to [beporter](https://gist.github.com/beporter/ce76204bcba35d9edb66b395bb5e9305), for his initial work.

## Fidelity Landing Page Tweaker
Fidelity's landing page defaults to showing daily data for the DJIA. I'm more interested in the S&P 500 data, so this script will automatically select that data when loading the landing page. It's also configurable, and allows users to select any of the available markets, and any of the available timeframes.

## Old Reddit Redirector
Redirects non-`old.reddit.com` URLs to `old.reddit.com`.