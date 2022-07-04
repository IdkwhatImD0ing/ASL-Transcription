//ProgressBar.js
//Version 0.1.1
//Event - OnAwake
//Controls image and text labels that represent progress bar
//@input Component.Text labelTextComp
//@input Component.Text valueTextComp
//@input Component.Image progressBarImage

script.coef = 0.2;
script.precision = 2;

var so = script.getSceneObject();
var st = so.getComponent("Component.ScreenTransform");

script.progressBarImage.mainMaterial = script.progressBarImage.mainMaterial.clone();
script.pass = script.progressBarImage.mainMaterial.mainPass;


var _value = 0.5;
var _label = "";

script._prevValue = undefined;

Object.defineProperty(script, "value", {
    get: function() {
        return _value; 
    },
    set: function(v) {
        _value = this.prevValue == undefined ? v : this.prevValue * (1 - this.coef) + v * this.coef;
        this.prevValue = _value;
        this.pass.percentage = _value;
        this.valueTextComp.text = _value.toFixed(script.precision).toString();
    }
});


Object.defineProperty(script, "label", {
    get: function() {
        return _label; 
    },
    set: function(l) {
        _label = l;
        this.labelTextComp.text = _label;
    }
});

var delayedEvent = script.createEvent("DelayedCallbackEvent");
delayedEvent.bind(setAspect);
delayedEvent.reset(0.1);

function setAspect() {
    var size = st.localPointToWorldPoint(new vec2(1, 1)).sub(st.localPointToWorldPoint(new vec2(-1, -1)));
    script.pass.aspect = new vec2(size.x, size.y);
}

//api
//script.value = 0.5
//script.label = "probability"
