module.exports = function(application){

	let word = application.app.controllers.words;

	application.route('/v1/words')
	.post(word.save)
	.get(word.phrase);
}