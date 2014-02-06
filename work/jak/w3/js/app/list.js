App.List = JAK.ClassMaker.makeClass({
	NAME:"App.List",
	VERSION:"1.0"
});

App.List.prototype.$constructor = function() {
	this._records = [];
	this._recordVisuals = [];

	this._dom = {
		container: JAK.mel("div",{id:"list"})
	};
};

App.List.prototype.getRecords = function() {
	return this._records;
};

App.List.prototype.getContainer = function() {
	return this._dom.container;
};

App.List.prototype.build = function() {
	this._clear();

	for (var i=0, len=this._records.length; i<len; i++) {
		var record = this._records[i];
		var recordVisual = new App.Record.ListVisual(record);
		recordVisual.build();
		this._dom.container.appendChild(recordVisual.getContainer());
		this._recordVisuals.push(recordVisual);
	}
};

App.List.prototype.load = function() {
	this._records = [];

	if (window.DATA) {
		for (var i=0, len = window.DATA.length; i<len; i++) {
			var data = window.DATA[i];
			var record = new App.Record(data);
			this._records.push(record);
			
		}
	}
};

App.List.prototype._clear = function() {
	this._recordVisuals = [];
	JAK.DOM.clear(this._dom.container);
};
