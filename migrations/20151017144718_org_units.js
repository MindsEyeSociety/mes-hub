'use strict';

exports.up = ( knex, Promise ) => {
	return knex.schema.createTable( 'org_units', ( table ) => {
		var unitTypes = [ 'Venue', 'Domain', 'Region', 'Nation' ];

		table.increments().primary();
		table.string( 'name' ).notNullable();
		table.string( 'code' ).index();
		table.string( 'venueType' );
		table.string( 'location' );
		table.string( 'website' );
		table.enum( 'type', unitTypes ).notNullable().index();
		table.text( 'defDoc' );
		table.string( 'parentPath' ).notNullable().index();
	});
};

exports.down = ( knex, Promise ) => {
	return knex.schema.dropTable( 'org_units' );
};
