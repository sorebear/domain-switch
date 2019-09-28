// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function checkForValidUrl(tabId, changeInfo, tab) {
  chrome.storage.sync.get('sites', function(data) {
    console.log('DATA', data);
    chrome.pageAction.setPopup({ tabId: tab.id, popup: 'popup.html' });
  });
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({sites: [
    {
      site_name: 'Paradise Valley',
      dev_domain: 'pvusd.360-biz.com',
      live_domain: 'www.pvschools.net',
    }
  ]});
  
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.storage.sync.get('sites', function(data) {
  //     chrome.declarativeContent.onPageChanged.addRules([{
  //       conditions: data.sites.map(function(site) {
  //         return new chrome.declarativeContent.PageStateMatcher({
  //           pageUrl: {hostEquals: site.live_domain}
  //         });
  //       }).concat(data.sites.map(function(site) {
  //         return new chrome.declarativeContent.PageStateMatcher({
  //           pageUrl: {hostEquals: site.dev_domain}
  //         });
  //       })),
  //       actions: [new chrome.declarativeContent.ShowPageAction()]
  //     }]);
  //   });
  // });
});
