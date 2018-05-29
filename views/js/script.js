//returns png -> creates arraybuffer -> creates Unit8Array ->
//creates blob -> renders blob/png to screen...
var oReq = new XMLHttpRequest();
oReq.open("GET", 'http://127.0.0.1:3000/pics', true);

oReq.onload = function(oEvent) {
  makeNewImage(this);
  console.log('request length', this.response.length);
}
// returning one array of images need to break images into seperate classes
//render images seperatly
function makeNewImage(oEvent) {
  var images = [];
  console.log('Running decoder');
  class IncomingImage {
    constructor() {
      this.arrayBuffer = oReq.response.split('|');
      this.byteArray = new Uint8Array(this.arrayBuffer);
      console.log(this.byteArray.length)
      console.log(this.byteArray);
      this.blob = new Blob([this.byteArray], {type: "image/png"});
      this.url = URL.createObjectURL(this.blob);
      // this.img = new Image();
      // this.img.src = this.url;
      images.push(this.url);
    }
    createNewImage() {
      var list = document.getElementById("mainList");
      for(var i = 0; i < images.length; i++) {
        list.append('<li><img src="' + images[i] + '"/></li>');
        console.log(`image length: ${images.length}`);
      }
    }
 }
 //need to make seperate classes...
 oReq = new IncomingImage();
 oReq.createNewImage();
};

oReq.send();

// !!!!!!!!!!!OPTION 2!!!!!!!!!!!!!
// oReq.responseType = "arraybuffer";
//
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
//
// oReq.send();

//!!!!!!!!!!OPTION 3!!!!!!!!!!!!!
// var oReq = new XMLHttpRequest();
// oReq.open("GET", 'http://127.0.0.1:3000/pics', true);
// oReq.responseType = "blob";
//
// oReq.onload = function(oEvent) {
//   var promise1 = new Promise((resolve, reject) => {
//     resolve(oReq.response);
//   });
//   promise1.then((response) => {
//     var url = URL.createObjectURL(response);
//     var img = new Image();
//     img.src = url;
//     console.log('url', url);
//     document.body.appendChild(img);
//   }).catch((error) => {
//     console.log(`Error ${error}`);
//   });
// };
//
// oReq.send();
