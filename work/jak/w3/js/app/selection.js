App.Selection = JAK.ClassMaker.makeClass({
	NAME:"App.Selection",
	VERSION:"1.0",
	IMPLEMENT:[JAK.ISignals]
});

App.Selection.prototype.$constructor = function() {
	this._records = [];
};

App.Selection.prototype.toggleRecord = function(record) {
	var index = this._records.indexOf(record);
	var isSelected = false;

	if (index != -1) {
		this._records.splice(index, 1);
	} else {
		this._records.push(record);
		isSelected = true;
	}

	this.makeEvent("record-selection-changed", {record:record, isSelected:isSelected});
};

App.Selection.prototype.getRecords = function() {
	return this._records;
};
