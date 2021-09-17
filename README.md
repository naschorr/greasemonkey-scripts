# userscripts
All of the greasemonkey/violentmonkey/tampermonkey compatible userscripts that I've worked on

## Ally Automatic Account Selector
Ally bank doesn't remember that I use their banking service, and not their auto financing service. It's annoying to have to manually select the banking service each time I want to log in, so this script will do that automatically. It can also be configured to select the financing service if desired.

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

## PNC Login Sign On Button Enabler
PNC bank has this outdated login page that doesn't place nice with password managers, and seems to require user interaction in either the username or password fields to enable the sign on button. This script just forces that button to be enabled, and lessens the amount of time spent looking at that 2010 era web design.

## StackOverflow Career Banner Hider
Hides the massive "Imagine yourself at..." recruitment banner in the middle of the screen of certain StackOverflow results.
