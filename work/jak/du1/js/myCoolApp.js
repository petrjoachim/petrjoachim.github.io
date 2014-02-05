console.DEBUG = 1;
DIRECTION = {
    UP: -4,
    DOWN: 4,
    LEFT: -1,
    RIGHT: 1
};
PadGame = JAK.ClassMaker.makeClass({
    NAME:		"PadGame",
    VERSION:	"0.1"
});
PadGame.prototype.$constructor = function(elmId) {
    console.log("contructor [" + elmId + "]");
    this._element = JAK.gel(elmId);
    this._initPads(this._element);
    JAK.Events.addListener(document.body, "keyup", this, "_keyup");
};

PadGame.prototype._initPads = function(element){
    console.log("init pads [" + element + "]");
    for(var _ = 1; _ <= 15; _++){
        var __ = JAK.cel("div", "pad");
        __.textContent = _;
        element.appendChild(__);
    }
    var __ = JAK.cel("div", "pad empty");
    __.textContent = ".";
    element.appendChild(__);
    this._position = 15;
};

PadGame.prototype._keyup = function(event){
    switch(event.keyCode){
        case 38:
            this.move(DIRECTION.UP);
            break;
        case 40:
            this.move(DIRECTION.DOWN);
            break;
        case 37:
            this.move(DIRECTION.LEFT);
            break;
        case 39:
            this.move(DIRECTION.RIGHT);
            break;
    }
}

PadGame.prototype.move = function(direction){
    console.log("move [" + direction + "]");
    var desired_position = direction + this._position;
    console.log("desired_position = " + desired_position);

    if(desired_position < 0 || desired_position > 15)
        return;
    if(direction == DIRECTION.RIGHT && ((this._position + 1) % 4) == 0)
        return;
    if(direction == DIRECTION.LEFT && ((this._position + 1) % 4) == 1)
        return;

    //swap positions
    var node1 = this._element.childNodes[this._position];
    var node2 = this._element.childNodes[desired_position];

    var new_node1 = node1.cloneNode(true);
    var new_node2 = node2.cloneNode(true);
    this._element.replaceChild(new_node1, node2);
    this._element.replaceChild(new_node2, node1);

    this._position = desired_position;
}

PadGame.prototype.shuffle = function(steps){
    console.log("shuffle [" + steps + "]");
    //TODO shuffle it somewhat;
}

ShuffleButton = JAK.ClassMaker.makeClass({
    NAME: "ShuffleButton",
    VERSION: "0.1"
});

ShuffleButton.prototype.$constructor = function(elmId) {
    console.log("contructor [" + elmId + "]");
    var element = JAK.gel(elmId);
    JAK.Events.addListener(element, 'click', this, "_click");
};

ShuffleButton.prototype._click = function(event){
    padGame.shuffle(100);
}

JAK.Events.onDomReady(window, function(event){
    padGame = new PadGame('game');
    shuffleButton = new ShuffleButton('shuffle');
});

