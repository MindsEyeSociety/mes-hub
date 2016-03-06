'use strict';

/**
 * Module to set up navigation for system.
 */

// NOTE: Should deprecate this functionality.

const _        = require( 'lodash' );
const rootPath = process.env.domain || 'http://portal.mindseyesociety.org';
const navMap   = i => {
	if ( i.url && 0 === i.url.indexOf( '/' ) ) {
		i.url = rootPath + i.url;
	}
	if ( i.children ) {
		i.children.map( navMap );
	}
	return i;
};

module.exports = ( req, res, next ) => {

	// Run nav object through a map to prepend root.
	let nav = GLOBAL.config.get( 'nav' );
	res.locals.nav      = nav.map( navMap );
	res.locals.rootPath = rootPath;

	if ( req.user && req.user.firstName ) {
		res.locals.name = req.user.firstName;
	}
	next();
};