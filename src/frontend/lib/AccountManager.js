/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
let currentUser = null;

const AccountManager = {
  init() {
    const accountData = document.getElementById('accountData');
    if (!accountData) {
      return;
    }
    currentUser = JSON.parse(unescape(accountData.innerHTML));
  },

  currentUser() {
    if (!currentUser) {
      AccountManager.init();
    }
    return currentUser || {};
  },
};

module.exports = AccountManager;
