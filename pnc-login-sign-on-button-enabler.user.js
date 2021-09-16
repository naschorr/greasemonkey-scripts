// ==UserScript==
// @name        PNC Login Sign On Button Enabler
// @description Forces the "Sign On" button to be enabled, which will allow for quickler logins when using a credential manager.
// @version     1.0
// @namespace   https://github.com/naschorr/userscripts
// @match       https://*pnc.com/*/PNCOnlineBankingServletLogin
// @grant       none
// @author      naschorr
// @icon        https://www.google.com/s2/favicons?domain=pnc.com
// ==/UserScript==

(function() {
    'use strict';

    function enableSignOnButton(root) {
      const button = root.querySelector('#Signon');
      
      if (!!button) {
          button.classList = ['formButton'];
          button.removeAttribute('disabled');
        
          return true;
      }
      
      return false;
    }

    window.addEventListener('load', () => {
        // todo: Is the iframe always present?
        if (enableSignOnButton(document)) {
            return
        }
      
        // Otherwise dig into the frame and then force enable the button.
        const frameDocument = document.querySelector('frame')?.contentWindow.document.body;
        if (!!frameDocument) {
            enableSignOnButton(frameDocument);
        }
    });
})();
