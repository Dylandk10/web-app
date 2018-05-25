//returns png -> creates arraybuffer -> creates Unit8Array ->
//creates blob -> renders blob/png to screen...
//not laoding...
var oReq = new XMLHttpRequest();
oReq.open("GET", 'http://127.0.0.1:3000/pics', true);
oReq.responseType = "arraybuffer";

oReq.onload = function (oEvent) {
  console.log('Running decoder');
  var arrayBuffer = oReq.response; // Note: not oReq.responseText
  console.log(arrayBuffer);
   if (arrayBuffer) {
     var byteArray = new Uint8Array(arrayBuffer);
     console.log('byteArray', byteArray);
     var blob = new Blob([byteArray], {type: "image/png"});
     var url = URL.createObjectURL(blob);
     var img = new Image();
     img.src = url;
     console.log('byteArray length', byteArray.length);
     console.log('url', url);
     document.body.appendChild(img);
   }
};

oReq.send();

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
