var environment = require('./env.json'); 

exports.config = function() {
	var node_env = process.env.NODE_ENV || 'development'; 

	return envrironment[node_env]
} 