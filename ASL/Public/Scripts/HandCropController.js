// -----JS CODE-----
//@input Component.ScreenTransform sourceST {"hint" : "Anchors of this screen transform are used for the crop rectangle of a crop texture"}
//@input Asset.Texture cropTexture {"hint" : "Screen Crop Texture Asset"}
//@input vec2 size = {1.0, 1.0} {"hint" : "Size multiplier"}
//@input bool forceSquare
//@input bool rotate
//@ui {"widget" : "separator"}
//@input bool setRectangle {"hint" : "Set this to place screen transform to the place where it was cropped from, works like RectangleSetter"}
//@input Component.ScreenTransform targetST {"showIf" : "setRectangle", "hint" : "Screen transform Rectangle has to ne applied to"}

var cropProvider = script.cropTexture.control;
var aspect; //aspect of device camera texture 

script.createEvent("TurnOnEvent").bind(onTurnOn);

function onTurnOn() {
aspect = cropProvider.inputTexture.control.getAspect()// aspect of device camera texture - available on turn on
script.createEvent("UpdateEvent").bind(updateCrop);
}

function updateCrop() { 
//update crop region
var size = script.sourceST.anchors.getSize();
var center = script.sourceST.anchors.getCenter();

// if we want a square image - take aspect into account
if (script.forceSquare) {
size.x = size.y / aspect;
}
size.x *= script.size.x;
size.y *= script.size.y;

//set crop rect size and center
cropProvider.cropRect.setSize(size);
cropProvider.cropRect.setCenter(center);

//set rotation if needed
if (script.rotate) {
cropProvider.rotation = -script.sourceST.rotation.toEulerAngles().z;
}
//apply same rectangle position and rotation to a screen transform 
if(script.setRectangle) {
script.targetST.anchors.setSize(size);
script.targetST.anchors.setCenter(center);
if (script.rotate) {
script.targetST.rotation = script.sourceST.rotation;
}
}
}