// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let availableSitesContainer = document.getElementById('availableSitesContainer');
function constructAvailableSites() {
  while (availableSitesContainer.hasChildNodes()) {
    availableSitesContainer.removeChild(availableSitesContainer.lastChild);
  }

  chrome.storage.sync.get('sites', function(data, indexInDataArr) {
    data.sites.forEach(function(site) {
      let div = document.createElement('div');
      div.classList.add('available-site');

      let title = document.createElement('h3');
      title.innerText = site.site_name;

      let devDomain = document.createElement('p');
      devDomain.innerText = 'Dev: ' + site.dev_domain;

      let liveDomain = document.createElement('p');
      liveDomain.innerText = 'Live: ' + site.live_domain;

      let removeButton = document.createElement('button');
      removeButton.innerText = 'remove';
      removeButton.onclick = function() {
        chrome.storage.sync.get('sites', function(data) {
          const sitesArr = Array.from(data.sites);
      
          sitesArr.splice(indexInDataArr, 1);
      
          chrome.storage.sync.set({sites: sitesArr});
          constructAvailableSites();
        });
      }

      div.appendChild(title);
      div.appendChild(devDomain);
      div.appendChild(liveDomain);
      div.appendChild(removeButton);
      availableSitesContainer.appendChild(div);
    });
  });
}
constructAvailableSites();

let addSiteForm = document.getElementById('addSiteForm');
addSiteForm.onsubmit = function(e) {
  e.preventDefault();

  chrome.storage.sync.get('sites', function(data) {
    const sitesArr = data.sites || [];
    const siteData = {};
  
    for (let i = 0; i < e.target.length - 1; i++) {
      siteData[e.target[i]['id']] = e.target[i]['value'];
    }

    sitesArr.unshift(siteData);

    chrome.storage.sync.set({sites: sitesArr});
    constructAvailableSites();
  });  
}
