'use strict';

/**
 * Return custom attribute
 * @param {Object} object - requeted object
 * @param {string} attribute - custom key attribute
 * @returns {string} the value of a custom attribute
 */
function getCustomAttribute(object, attribute) {
    if (Object.hasOwnProperty.call(object, 'custom')) {
        return object.custom[attribute];
    }
    return null;
}

module.exports = {
    getCustomAttribute: getCustomAttribute
};

