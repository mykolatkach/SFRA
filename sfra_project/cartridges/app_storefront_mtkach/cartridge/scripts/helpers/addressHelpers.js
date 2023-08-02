/* eslint-disable valid-jsdoc */
/* eslint-disable no-param-reassign */
'use strict';

var base = module.superModule;

var CustomerMgr = require('dw/customer/CustomerMgr');
var AddressModel = require('*/cartridge/models/address');
var collections = require('*/cartridge/scripts/util/collections');

/**
 * Creates a list of address model for the logged in user
 * @param {string} customerNo - customer number of the current customer
 * @returns {List} a plain list of objects of the current customer's addresses
 */
function getList(customerNo) {
    var user = CustomerMgr.getCustomerByCustomerNumber(customerNo);
    var addressBook = {};

    if (!user) {
        return addressBook;
    }

    var rawAddressBook = user.addressBook.getAddresses();
    addressBook = collections.map(rawAddressBook, function (rawAddress) {
        var addressModel = new AddressModel(rawAddress);
        addressModel.address.UUID = rawAddress.UUID;
        return addressModel;
    });
    return addressBook;
}

/**
 * Copy dwscript address object into JavaScript object
 * @param {dw.order.OrderAddress} address - Address to be copied
 * @returns {Object} - Plain object that represents an address
 */
function updateAddressFields(newAddress, address) {
    newAddress.setAddress1(address.address1 || '');
    newAddress.setAddress2(address.address2 || '');
    newAddress.setCity(address.city || '');
    newAddress.setFirstName(address.firstName || '');
    newAddress.setLastName(address.lastName || '');
    newAddress.setPhone(address.phone || '');
    newAddress.setPostalCode(address.postalCode || '');

    if (address.states && address.states.stateCode) {
        newAddress.setStateCode(address.states.stateCode);
    }

    if (address.country) {
        newAddress.setCountryCode(address.country);
    }

    newAddress.setJobTitle(address.jobTitle || '');
    newAddress.setPostBox(address.postBox || '');
    newAddress.setSalutation(address.salutation || '');
    newAddress.setSecondName(address.secondName || '');
    newAddress.setCompanyName(address.companyName || '');
    newAddress.setSuffix(address.suffix || '');
    newAddress.setSuite(address.suite || '');
    newAddress.setJobTitle(address.title || '');
    newAddress.custom.addressType = address.addressType || '';
}

base.updateAddressFields = updateAddressFields;
base.getList = getList;

module.exports = base;
