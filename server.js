var express = require('express');  //express module
var app = express(); //instantiating express 
var apiRouter = express.Router();
var bodyParser = require('body-parser'); 
var Article = require('./article'); 
var mongoose = require('mongoose'); 
var articlesController = require('./articlesController'); 
var config = require('./app/config/config');
var environmentSettings = config(); 


mongoose.connect(environmentSettings.db);  

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());


apiRouter.route('/article') 
	.post(function(request, response) {
		console.log(request.body); 
		var article = new Article(request.body); 

		article.save(function(error) {
			if (error) console.error('Could not create because of', error);

			response.json({message: 'Article successfully created'}); 
		}); 
	})
	.get(function(request, response) {
		Article.find(function(err, articles) {
			if (error) console.error('could not get articles');

			response.json(articles);
		});  
	});

apiRouter.route('/article/:article_id')
	.get(articlesController.index)

	.patch(articlesController.update) 

app.use('/api', apiRouter); 
app.listen(7000); 


// we can use get because it comes with the server exstablished by request, also it goes .get(/path, function(request, response))
console.log('Server is running on port 7000');  