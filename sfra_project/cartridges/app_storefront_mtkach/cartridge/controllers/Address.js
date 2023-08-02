/* eslint-disable no-undef */
'use strict';

var server = require('server');
var page = module.superModule;
server.extend(page);

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var Resource = require('dw/web/Resource');
var URLUtils = require('dw/web/URLUtils');

/**
 * Address-AddAddress : A link to a page to create a new address
 * @name Base/Address-AddAddress
 * @function
 * @memberof Address
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - userLoggedIn.validateLoggedIn
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.replace(
    'AddAddress',
    csrfProtection.generateToken,
    consentTracking.consent,
    userLoggedIn.validateLoggedIn,
    function (req, res, next) {
        var addressForm = server.forms.getForm('address');
        addressForm.clear();

        var viewData = res.getViewData();
        viewData.navTabValue = req.querystring.action || 'shipping';

        res.render('account/editAddAddress', {
            addressForm: addressForm,
            addressType: 'addressType',
            shippingAddressType: 'shipping',
            billingAddressType: 'billing',
            breadcrumbs: [
                {
                    htmlValue: Resource.msg('global.home', 'common', null),
                    url: URLUtils.home().toString()
                },
                {
                    htmlValue: Resource.msg('page.title.myaccount', 'account', null),
                    url: URLUtils.url('Account-Show').toString()
                },
                {
                    htmlValue: Resource.msg('label.addressbook', 'account', null),
                    url: URLUtils.url('Address-List').toString()
                }
            ]
        });
        next();
    }
);

/**
 * Address-List : Used to show a list of address created by a registered shopper
 * @name Base/Address-List
 * @function
 * @memberof Address
 * @param {middleware} - userLoggedIn.validateLoggedIn
 * @param {middleware} - consentTracking.consent
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.append(
    'List',
    userLoggedIn.validateLoggedIn,
    consentTracking.consent,
    function (req, res, next) {
        var addressHelpers = require('*/cartridge/scripts/helpers/addressHelpers');

        var viewData = res.getViewData();
        viewData.navTabValue = req.querystring.action || 'shipping';
        res.setViewData(viewData);

        var addressBook = addressHelpers.getList(customer.profile.customerNo);

        res.render('account/addressBook', {
            shippingAddressType: 'shipping',
            billingAddressType: 'billing',
            addressBook: addressBook
        });
        next();
    }
);

module.exports = server.exports();
