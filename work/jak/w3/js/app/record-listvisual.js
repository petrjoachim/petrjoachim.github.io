App.Record.ListVisual = JAK.ClassMaker.makeClass({
	NAME:"App.Record.ListVisual",
	VERSION:"1.0",
	IMPLEMENT:[JAK.ISignals]
});

/* record = instance of App.Record */
App.Record.ListVisual.prototype.$constructor = function(record) {
	this._record = record;

	this._dom = {
		container: JAK.mel("div",{className:"record"})
	};

	this._sc = [this.addListener("record-selection-changed", "_onSelectionChange")];
	this._ec = [];
};

App.Record.ListVisual.prototype.getContainer = function() {
	return this._dom.container;
};

App.Record.ListVisual.prototype.build = function() {
	var docFrag = document.createDocumentFragment();

	/* vytvarime checkbox */
	this._dom.checkbox = JAK.mel("input", {type:"checkbox", checked:""});

	/* vytvarime klikatelnou areu */
	this._dom.clickArea = JAK.mel("div",{className:"click-area"});
	this._dom.clickArea.appendChild(this._dom.checkbox);
	this._ec.push(JAK.Events.addListener(this._dom.clickArea, "click", this, "_sendSelectionChanged"));
	docFrag.appendChild(this._dom.clickArea);

	/* vytvarime popisek */
	this._dom.subscription = JAK.mel("div",{className:"subscription clear-fix"});
	this._dom.title = JAK.mel("span",{className:"title", innerHTML:this._record.getTitle()});
	this._dom.text = JAK.mel("div",{className:"text", innerHTML:this._record.getText()});
	this._dom.subscription.appendChild(this._dom.title);
	this._dom.subscription.appendChild(this._dom.text);
	docFrag.appendChild(this._dom.subscription);

	this._dom.container.appendChild(docFrag);
};

App.Record.ListVisual.prototype._onSelectionChange = function(e) {
	if (e.data.record != this._record) { return; }

	if (e.data.isSelected) {
		this._dom.container.classList.add("selected");
		this._dom.checkbox.checked = "checked";
	} else {
		this._dom.container.classList.remove("selected");
		this._dom.checkbox.checked = "";
	}
};

App.Record.ListVisual.prototype._sendSelectionChanged = function(e) {
	App.getInstance().getSelection().toggleRecord(this._record);
};
