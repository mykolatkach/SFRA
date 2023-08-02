/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
'use strict';

var base = require('base/addressBook/addressBook');

/**
 * Set an address type
 * shipping address type
 * billing address type
 */
base.setAddressType = function () {
    var $navTabsWrapper = $('.js-address-nav-tabs-wrapper');
    var $addressTypeHiddenInput = $('.js-address-type-input');
    var $activeNavTab = $navTabsWrapper.find('.js-add-address-nav-tab.active');

    if ($activeNavTab.length) {
        $addressTypeHiddenInput.val($($activeNavTab).data('id'));
    }

    $($navTabsWrapper).on('click', '.js-add-address-nav-tab', function (event) {
        $addressTypeHiddenInput.val($(event.currentTarget).data('id'));
    });
};

module.exports = base;
