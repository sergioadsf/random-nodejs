module.exports = function(application){


	const Word = {};

	Word.save = function(req, res){

		let words = req.body;
		let connection = application.app.config.dbConnection();
		let wordsDAO = new application.app.models.WordsDAO(connection);

		wordsDAO.saveList(words, function(error, result){
			if(error){
				res.json(error);
			} else {
				res.json(result);
			}

			connection.end();
		});
	}

	Word.list = function(req, res){
		
		let connection = application.app.config.dbConnection();
		let WordsDAO = new application.app.models.WordsDAO(connection);

		WordsDAO.list(function(error, result){
			res.json({words: result});
			connection.end();
		})
	}

	Word.lists = function(req, res){
		let natural = require('natural');
		let verbInflector = new natural.PresentVerbInflector();
		//var Sentencer = require('sentencer');
		let timev = req.query.timev;
		let connection = application.app.config.dbConnection();
		let WordsDAO = new application.app.models.WordsDAO(connection);

		WordsDAO.person(function(eperson, rperson){
			WordsDAO.verb(function(everb, rverb){
				WordsDAO.preposition(function(eprep, rprep){
					WordsDAO.location(function(error, result){
						if(eperson){
							errorReturn(eperson);
							return;
						}
						if(everb){
							errorReturn(everb);
							return;
						}
						if(eprep){
							errorReturn(eprep);
							return;
						}
						if(error){
							errorReturn(error);
							return;
						}

						let person = rperson[0] ? rperson[0].word : Sentencer.make("{{ noun }}");
						let verb = rverb[0] ? rverb[0].word : "live";
						let prep = rprep[0] ? rprep[0].word : "in";
						let location = result[0] ? result[0].word : Sentencer.make("{{ noun }}");
						let phrase = `${person} ${verb} ${prep} ${location}`;
						res.json({words: phrase});
						connection.end()
					})
				});
			});
		});
	}

	function errorReturn(error){
		res.json({error: error});
		connection.end()
	}

	return Word;
}