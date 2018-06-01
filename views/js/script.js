//returns png -> creates arraybuffer -> creates Unit8Array ->
//creates blob -> renders blob/png to screen...

//       THIS IS FOR BACK-END RENDERING PICTURES       //


var oReq = new XMLHttpRequest();
oReq.open("GET", 'http://127.0.0.1:3000/pics', true);
oReq.responseType = "arraybuffer";
oReq.onload = function(oEvent) {
    oReq = new IncomingImage(oReq.response);
    oReq.createNewImage();
};

//storing all RBG png colors in one uintArray need to break up into "i" parts
var images = [];
class IncomingImage { 
    constructor(eResponse) {
	this.arrayBuffer = eResponse;
	console.log(`${this.arrayBuffer.byteLength}`);
	this.byteArray = new Uint8Array(this.arrayBuffer);
	console.log(`byteArray ${this.byteArray.length}`);
	this.blob = new Blob([this.byteArray], {type: "image/png"});
	this.url = URL.createObjectURL(this.blob);
	this.img = new Image();
	this.img.src = this.url;
	images.push(this.url);
    }
    createNewImage() {
      var list = document.getElementById("mainList");
      for(var i = 0; i < images.length; i++) {
        list.append('<li><img src="' + images[i] + '"/></li>');
        console.log(`image length: ${images.length}`);
      }
    }
    //for testing images...
    createImageFromImage() {
	var picLocation = document.getElementById("mainImage");
	picLocation.appendChild(this.img);
    }
 }

 oReq.send();

// // !!!!!!!!!!!OPTION 2!!!!!!!!!!!!!
// // This works fine but not for multiple png returns...


// oReq.responseType = "arraybuffer";

// oReq.onload = function (oEvent) {
//   console.log(oEvent);
//   console.log('Running decoder');
//   var arrayBuffer = oReq.response; // Note: not oReq.responseText
//   console.log(arrayBuffer);
//    if (arrayBuffer) {
//      var byteArray = new Uint8Array(arrayBuffer);
//      console.log('byteArray', byteArray);
//      var blob = new Blob([byteArray], {type: "image/png"});
//      var url = URL.createObjectURL(blob);
//      var img = new Image();
//      img.src = url;
//      console.log('byteArray length', byteArray.length);
//      console.log('url', url);
//      document.body.appendChild(img);
//    }
// };

// oReq.send();


//       THIS IS FOR FRONT-END RENDERING PICTURE        //

var oReqFront = new XMLHttpRequest();
oReqFront.open("GET", 'http://127.0.0.1:3000/picsFrontend', true);

oReqFront.onload = function(oEvent) {
    var sJson = oReqFront.responseText;
    console.log(sJson);
};
oReqFront.send();
 
// function loadDoc() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
// 	console.log(this.responseText);
//     }
//   };
//   xhttp.open("GET", 'http://127.0.0.1:3000/picsFrontend', true);
//   xhttp.send();
// }
// loadDoc();

