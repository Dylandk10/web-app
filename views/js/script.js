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
	var picLocation = document.createElement("img");
	picLocation.src = this.img.src;
	document.body.appendChild(picLocation);
    }
 }
//DONT NEED TO CALL BACKEND PICTURE RENDERING (UNCOMMENT NEXT LINE IF WANT TO USE BACKEND PICTURES...)
// oReq.send();


//       THIS IS FOR FRONT-END RENDERING PICTURE        //

var oReqFront = new XMLHttpRequest();
oReqFront.open("GET", 'http://127.0.0.1:3000/picsFrontend', true);

//global scope for picture
var globalPicture = [];
var globalPicturePath = "../pictures/";
oReqFront.onload = function(oEvent) {
    var sJson = oReqFront.responseText.split(",");
    var secondList = document.getElementById("minorList");
    //slices off extra " at begining and end of object
    for(var i = 0; i < sJson.length; i++) {
	sJson[i] = sJson[i].slice(1, sJson[i].length -1);
	var lastChar = sJson[i].substr(sJson[i].length -1);
	for(var k = 0; k < sJson[i].length; k++) {
            if(sJson[i][k] == lastChar && lastChar == '"') {
		sJson[i] = sJson[i].slice(0, -1);
	    } else if(sJson[i][0] == '"') {
		sJson[i] = sJson[i].slice(1, sJson[i].length);
	    }
	}
	//secondList.append('<li><img src="../pictures/' + sJson[i] + '"/></li>');
	//push picture sourses to global scope variable
	globalPicture.push(sJson[i]);
	console.log(sJson[i]);
    }
    return globalPicture;;
};
oReqFront.send();


//ajax to call DB for all other information name, address etc
var oReqFrontInformation = new XMLHttpRequest();
oReqFrontInformation.open("get", 'http://127.0.0.1:3000/restFrontInformation', true);

//global object
var globalInformation = null;
oReqFrontInformation.onload = function(oEvent) {
    //convert JSON to object
    var dbInformation = JSON.parse(oReqFrontInformation.responseText);
    for(var i = 0; i < dbInformation.length; i++) {
	console.log(dbInformation[i].name);
    }
    globalInformation = dbInformation;
    return renderPageInformation();
};

oReqFrontInformation.send();
//selects img classea dn reneders their sources
function renderPageInformation() {
 // var imageClasses = document.getElementsByClassName("imgLoop");
    var imageNumber = 0;
    var imageClasses = null;
    var restaurantName = null;
    var restaurantAddress = null;
    //global picture and global information array same length and order... one loop needed
    for(var i = 0; i < globalPicture.length; i++) {
	imageClasses = document.createElement("img");
	restaurantName = document.createElement("h3");
	restaurantName.innerHTML = globalInformation[i].name;
	//id must be set to render restaurants own page
  	restaurantName.id = globalInformation[i].name;
	restaurantName.style.cursor = "pointer";
	restaurantAddress = document.createElement("p");
	restaurantAddress.innerHTML = globalInformation[i].address;
	imageClasses.src = globalPicturePath + globalPicture[imageNumber];
	imageClasses.style.display = "block";
	imageNumber++;
	document.body.appendChild(restaurantName);
	document.body.appendChild(restaurantAddress);
	document.body.appendChild(imageClasses);

	//event handler to render restaurnats page
	restaurantName.addEventListener("click", function() {
	    var data = new FormData();
	    var xhttp = new XMLHttpRequest();
	    var dataName = this.id;
	    data.append('name', dataName); //send restraunt name && restaurant name is stored as id
	    for(var key of data.entries()) {
		console.log(key[0] + ' ' + key[1]);
	     }
	    xhttp.open("POST", "http://127.0.0.1:3000/loadRestaurantPage", true);
	  //  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;"); //charset=UTF-8");
	    xhttp.send(data);
	});
    }
}




// // !!!!!!!!!!!OPTION 2 backend picutre rendering!!!!!!!!!!!!!
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
