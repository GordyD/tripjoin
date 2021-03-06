var db = require('../db.js');

/*
 * TriJoin /location API
 */
function success(result) {
	return result;
};

function error(err) {
	console.log(err);
	return false;
}

exports.collection = function (canonical, offset, limit) {
	offset = offset | 0;
	limit + limit | 10;
	var query = 'SELECT * FROM location';
	if(typeof canonical !== 'undefined') {
		query += ' WHERE canonical = "' + canonical + '"'
	}
	query += ' LIMIT ' + limit + 'OFFSET ' + offset; 
	return db.query(query).then(success,error);
};

exports.get = function (id) {
	return db.query('SELECT * FROM location WHERE id = ' + id).then(success,error);
};

exports.create = function(geoinfo) {
	var params = [geoinfo.canonical,geoinfo.formatted,geoinfo.locality,geoinfo.city,geoinfo.county,geoinfo.region,geoinfo.country,geoinfo.coords];
	var insert = 'INSERT INTO location (canonical, formatted, locality, city, county, region, country, coordinates) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id';
	return db.query(insert,params).then(success,error);
};

exports.delete = function(id) {
	var insert = 'DELETE FROM locations WHERE id = $1',
	params = [id];
	return db.query(insert,params).then(success,error);
};