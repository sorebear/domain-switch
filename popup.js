// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

let text = document.getElementById('currentUrl');
let switchDomainButton = document.getElementById('changeDomain');

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  const currentUrl = tabs[0].url;
  text.innerText = currentUrl;
  
  chrome.storage.sync.get('sites', function(data) {
    data.sites.forEach(function(site) {
      if (currentUrl.includes(site.dev_domain)) {
        switchDomainButton.innerText = 'Switch To Live';
        switchDomainButton.onclick = function() {
          chrome.tabs.update({url: currentUrl.replace(site.dev_domain, site.live_domain)});
        }
      } else if (currentUrl.includes(site.live_domain)) {
        switchDomainButton.innerText = 'Switch To Dev';
        switchDomainButton.onclick = function() {
          chrome.tabs.update({url: currentUrl.replace(site.live_domain, site.dev_domain)});
        }
      }
    });
  });
});
