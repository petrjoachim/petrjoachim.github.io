var App = JAK.ClassMaker.makeSingleton({
	NAME:"App",
	VERSION:"1.0"
});

App.prototype.$constructor = function() {
	this._dom = {
		container: JAK.mel("div",{id:"main-container"})
	};

	this._selection = new App.Selection();
	this._header = new App.Header();
	this._list = new App.List();
	this._footer = new App.Footer();
    this._notification = new App.Notification();
	this._mregg = new App.MrEgg();
};

App.prototype.getSelection = function() {
	return this._selection;
};

App.prototype.getList = function(){
    return this._list;
}

App.prototype.start = function() {
	JAK.DOM.clear(document.body);
	document.body.appendChild(this._dom.container);

	this._list.load();

	this._header.build();
	this._list.build();
	this._footer.build();
    this._notification.build();

	this._dom.container.appendChild(this._header.getContainer());
	this._dom.container.appendChild(this._list.getContainer());
	this._dom.container.appendChild(this._footer.getContainer());
    this._dom.container.appendChild(this._notification.getContainer());

	JAK.Promise.when([this._mregg.load()]).then(this._addMrEgg.bind(this));
};

App.prototype._addMrEgg = function() {
	this._dom.container.appendChild(this._mregg.getContainer());
};
