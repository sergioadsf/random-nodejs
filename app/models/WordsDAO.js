function WordsDAO(connection){
	this._connection = connection;
}

WordsDAO.prototype.getNoun = function(callback, entity){
	let sql = `SELECT *
		FROM random.words rw
		WHERE rw.type = 'NNP' 
		AND rw.entity = '${entity}'
		order by rand() limit 1  `; 
	this._connection.query(sql, callback);
}

WordsDAO.prototype.get = function(callback, type){
	let sql = `SELECT *
		FROM random.words rw
		WHERE rw.type like '${type}' 
        order by rand() limit 1 `; 
	this._connection.query(sql, callback);
}

WordsDAO.prototype.list = function(callback){
	this._connection.query("select * from words", callback);
}

WordsDAO.prototype.person = function(callback){
	this.getNoun(callback, "PERSON");
}

WordsDAO.prototype.location = function(callback){
	this.getNoun(callback, "LOCATION");
}

WordsDAO.prototype.verb = function(callback){
	this.get(callback, "VB%");
}

WordsDAO.prototype.modal = function(callback){
	this.get(callback, "MD");
}

WordsDAO.prototype.subject = function(callback){
	this.get(callback, "PRP");
}

WordsDAO.prototype.adjective = function(callback){
	this.get(callback, "JJ%");
}

WordsDAO.prototype.preposition = function(callback){
	this.get(callback, "IN");
}

WordsDAO.prototype.question = function(callback){
	this.get(callback, "W%");
}

WordsDAO.prototype.adverb = function(callback){
	this.get(callback, "RB%");
}

WordsDAO.prototype.save = function(word, callback){
	this._connection.query("insert into words set ? ", word, callback);
}

WordsDAO.prototype.saveList = function(words, callback){
	let values = '';
	let i = 0;

	words.items.forEach(function(obj) { 
		if(i++){
			values+=","
		} 
		let entity = obj.entity ? "'"+obj.entity+"'" : null;
		values+=`('${obj.word}','${obj.type}',${entity})`; 
	});

	let sql = "insert into words (word, type, entity) VALUES "+values;
	this._connection.query(sql, callback);
}

module.exports = function(){
	return WordsDAO;
}