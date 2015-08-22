var Article = require('./article.js'); 

function index(request, response) {
		var id = request.params.article_id

		Article.findById(id, function(error, article){
			if (error) console.error('could not get article');

			response.json(article);
		})
	}

function update(request, response) {
		var data = request.body; 
		Article.findById(request.params.article_id, function(error, article) {
			if (error) console.error('could not update');

			Object.keys(data).forEach(function(key) {
				article.set(key, data[key]); // set method replaces value of a field with the newly specifified value
			}); 

			article.save(function(error) {
				if (error) console.error('could not patch');

				response.json({message: 'article successfully updated'});
			});
			response.json({message: 'article updated'});
		})
	}

module.exports = {
	index: index
	update: update
}