'use strict';

var base = module.superModule;

/**
 * Extend the current customer info
 * @param {Object} currentCustomer - Current customer
 * @constructor
 */
function account(currentCustomer) {
    base.call(this, currentCustomer);
    this.profile.hobby = currentCustomer.raw.profile.custom.hobby;
}

module.exports = account;
