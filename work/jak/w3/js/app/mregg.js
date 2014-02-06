App.MrEgg = JAK.ClassMaker.makeClass({
	NAME: "MrEgg",
	VERSION:"1.0"
});

App.MrEgg.prototype.$constructor = function() {
	this._enabled = !!window.im;
	this._promise = {
		loadFinished: new JAK.Promise()
	};
	this._dom = {
		container: JAK.mel("div",{id:"mrEgg"})
	};
};

App.MrEgg.prototype.getContainer = function() {
	return this._dom.container;
};

App.MrEgg.prototype.load = function() {
	if (this._enabled) {
		var params = { zoneId:"seznam.email.skyscraper", section:"", collocation:"email", callback:this._response.bind(this) };

		window.im.conf.params = ["zoneId", "collocation"];
		window.im.getAds([params, params], true);
	} else {
		this._promise.loadFinished.reject();
	}

	return this._promise.loadFinished;
};

App.MrEgg.prototype._response = function(data) {
	this._dom.container.innerHTML = data;
	this._promise.loadFinished.fulfill();
};
