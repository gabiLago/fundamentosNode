'use strict';
/**
 * Config params for i18n module
 */

const i18n = require('i18n');
const path = require('path');
    
i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '..', '/lib/locales'),
    objectNotation: true,
});
