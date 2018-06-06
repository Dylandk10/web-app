//modules for app
const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
var bodyParser = require('body-parser');
//connecting files
var {mySqlConn} = require('./mysql/connectMySql.js');
//front-end find file
var {mySqlFrontConn} = require('./mysql/frontConnectMySql.js');
//frontend find all info
var {mySqlFrontInfoConn} = require('./mysql/frontInfoConnectMySql.js');
//variables for app
const port = 3000;
var app = express();
var http = require('http');

//register partials
hbs.registerPartials(__dirname + '/../views/partials');
app.set('view engine', 'hbs');
//connect to front-end
app.use(express.static(__dirname + '/views'));
//local dev setup
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//loop image helper -> mysql -> returns picturenames for restruants in DB -> calls sendDataToHTML function;
var loopImage = (newPictureNumber) => {
  //newPictureNumber = the picture to be returned
  return new Promise(function (resolveMain, rejectMain) {
    var promise1 = new Promise((resolve, reject) => {
    result = mySqlConn();
    return resolve(result);
  });
  //wait for resolve from promise one then take image and loop it
  promise1.then((pictureName) => {
    var folder = './pictures/';
    var promise2 = new Promise((resolve2, reject2) => {
      fs.readFile(folder + pictureName[newPictureNumber], "utf8", function(err, fileName) {
        if(err) {
          throw err;
        }
        console.log('reading file...');
        //only resolves once...
        resolve2(fileName);
      });
    });
    //resolves main promise...
    promise2.then((fileName) => {
      console.log('resolving file...');
      //increment image number
      newPictureNumber += 1;
	//if pciture from bd are not resoled call fucntion again
      if(pictureName.length > newPictureNumber) {
          console.log(`newPictureNumber ${newPictureNumber}`);
	  loopImage(newPictureNumber);
      }
      resolveMain(fileName);
    //catch promise2
    }).catch((error2) => {
      return console.log(`promse2 error2L ${error2}`);
    });
    //catch promise1
    }).catch((error) => {
      console.log(`Promise1 Error: ${error}`);
    });
    //main promise return images
  }).then((image) => {
    console.log(`returning data...`);
    return image;
  }).catch((err) => {
    return err;
  });
};

//       This is gettig data from db for front-end path      //
//calls db function returns file path
var getFrontendPath = () => {
    return new Promise(function(resolve, reject) {
	var fileResult = mySqlFrontConn();
	resolve(fileResult);
    }).then((fileName) => {
	return fileName;
    }).catch((err) => {
	return err;
    });
};
var getFrontInfoPath = () => {
    return new Promise((resolve, reject) => {
	var allResults = mySqlFrontInfoConn();
	return resolve(allResults);
    }).then((data)=> {
	return data;
    }).catch((err) => {
	console.log(err);
	
    });
};
//homepage render
app.get('/', (req, res)=> {
  res.render('index.hbs');
});
//This is for back-end rendering images
//calls loopimage -> gets data from DB -> returns image -> returns ajax call
app.get('/pics', (req, res) => {
  return new Promise((resolve, reject) => {
      var result = loopImage(0);
      return resolve(result);
    }).then((image) => {
    res.writeHead(200, {'Content-type': 'image/png'});
    res.end(image, 'binary');
  }).catch((err) => {
      return console.log(`/pic Error: ${err}`);
  });
});

//this is for front-end rendering pictures
//returns picturename/filepath for frontend picture
app.get('/picsFrontend', (req, res) => {
    console.log("Runnign front-end search");
    return new Promise((resolve, reject) => {
	var frontPath = getFrontendPath();
	resolve(frontPath);
    }).then((path) => {
	path = JSON.stringify(path);
	res.writeHead(200, {'Content-type' : 'text/plain'});
	res.end(path, 'binary');
    }).catch((err) => {
	console.log(`frontend error ${err}`);
    });
});
//get and send dbinformation to frontend for main page
app.get('/restFrontInformation', (req, res) => {
    console.log("Runnign froenend info search");
    return new Promise ((resolve, reject) => {
	var frontInfoPath = getFrontInfoPath();
	resolve(frontInfoPath);
    }).then((data) => {
	data = JSON.stringify(data);
	res.writeHead(200, {'Content-type': 'text/plain'});
	res.end(data, 'binary');
    }).catch((error) => {
	console.log(`frontend info error ${error}`);
    });
});
app.post('/loadRestaurantPage', (req, res) => {
    console.log(req.query.name); 
});

//set port to listen...
app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
