App.Footer = JAK.ClassMaker.makeClass({
	NAME:"App.Footer",
	VERSION:"1.0"
});

App.Footer.prototype.$constructor = function() {
	this._dom = {
		container: JAK.mel("div",{id:"footer"})
	};
};

App.Footer.prototype.getContainer = function() {
	return this._dom.container;
};

App.Footer.prototype.build = function() {
	this._clear();
	var domFooter = JAK.mel("strong",{innerHTML:"@2013, Jerry"});
	this._dom.container.appendChild(domFooter);
};

App.Footer.prototype._clear = function() {
	JAK.DOM.clear(this._dom.container);
};
