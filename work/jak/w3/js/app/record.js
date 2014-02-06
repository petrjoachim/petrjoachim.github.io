App.Record = JAK.ClassMaker.makeClass({
	NAME: "App.Record",
	VERSION: "1.0"
});

App.Record.prototype.$constructor = function(data) {
	this._data = data;
};

App.Record.prototype.getId = function() {
	return this._data.id;
};

App.Record.prototype.getTitle = function() {
	return this._data.title;
};

App.Record.prototype.getText = function() {
	return this._data.text;
};
