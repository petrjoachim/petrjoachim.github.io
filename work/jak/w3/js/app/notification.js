App.Notification = JAK.ClassMaker.makeClass({
	NAME:"App.Notification",
	VERSION:"1.0",
	IMPLEMENT:[JAK.ISignals]
});

App.Notification.prototype.$constructor = function(){
	this._dom = {
        container: JAK.mel("div",{id:"notification", innerHTML:"Zbyva dodelat: 4"})
	};
	this._sc = [this.addListener("record-selection-changed", "_onSelectionChange")];
}

App.Notification.prototype.build = function(){
}

App.Notification.prototype.getContainer = function(){
    return this._dom.container;
}

App.Notification.prototype._onSelectionChange = function(e){
    console.log(e);
    var list = App.getInstance().getList();
    var listCount = list.getRecords().length;

    var sel = App.getInstance().getSelection();
    var selCount = sel.getRecords().length;

    this._dom.container.innerHTML = "Zbyva dodelat: " + (listCount - selCount);
}
