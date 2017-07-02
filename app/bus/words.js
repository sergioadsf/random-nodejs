module.exports = function(application){

	const Word = {};

	Word.save = function(words, req, res){

		let connection = application.app.config.dbConnection();
		let wordsDAO = new application.app.models.WordsDAO(connection);

		wordsDAO.saveList(words, function(error, result){
			if(error){
				res.json("Error");
				return;
			}
			
			res.json(result);
		});
	}

	Word.phrase = function(req, res){
		let Sentencer = require('sentencer');
		let connection = application.app.config.dbConnection();
		let WordsDAO = new application.app.models.WordsDAO(connection);

		WordsDAO.person(function person(eperson, rperson){
			if(eperson){
				errorReturn(eperson);
				return;
			}
			let person = rperson[0] ? rperson[0].word : Sentencer.make("{{ noun }}");

			WordsDAO.verb(function(everb, rverb){
				if(everb){
					errorReturn(everb);
					return;
				}
				let verb = rverb[0] ? rverb[0].word : "live";

				WordsDAO.preposition(function(eprep, rprep){
					if(eprep){
						errorReturn(eprep);
						return;
					}
					let prep = rprep[0] ? rprep[0].word : "in";
					WordsDAO.location(function(error, result){
						if(error){
							errorReturn(error);
							return;
						}

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