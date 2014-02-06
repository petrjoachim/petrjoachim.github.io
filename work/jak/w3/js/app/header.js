App.Header = JAK.ClassMaker.makeClass({
	NAME:"App.Header",
	VERSION:"1.0"
});

App.Header.prototype.$constructor = function() {
	this._dom = {
		container: JAK.mel("div",{id:"header"})
	};
};

App.Header.prototype.getContainer = function() {
	return this._dom.container;
};

App.Header.prototype.build = function() {
	var domHeader = JAK.mel("h1",{innerHTML:"TODO List"});
	this._dom.container.appendChild(domHeader);
};

App.Header.prototype._clear = function() {
	JAK.DOM.clear(this._dom.container);
};
