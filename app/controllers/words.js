module.exports = function(application){


	const wordsBus = application.app.bus.words;
	const Word = {};

	Word.save = function(req, res){

		let words = req.body;

		wordsBus.save(words, req, res);
	}

	Word.phrase = function(req, res){
		wordsBus.phrase(req, res);
	}

	function errorReturn(error){
		res.json({error: error});
		connection.end()
	}

	return Word;
}