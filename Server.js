//modules for app
const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
//connecting files
var {mySqlConn} = require('./mysql/connectMySql.js');
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

//loop image helper -> mysql -> returns picturenames for restruants in DB -> calls sendDataToHTML function;
var loopImage = () => {
  return new Promise(function (resolveMain, rejectMain) {
    var promise1 = new Promise((resolve, reject) => {
    result = mySqlConn();
    return resolve(result);
  });
  //wait for resolve from promise one then take image and loop it
  promise1.then((pictureName) => {
    var folder = './pictures/';
    var obj = [];
    var promise2 = new Promise((resolve2, reject2) => {
      //loop threw read files
      for(var k = 0; k < pictureName.length; k++) {
        fs.readFile(folder + pictureName[k], "utf8", function(err, fileName) {
          if(err) {
            throw err;
          }
          console.log('reading file...');
          //only resolves once...
          resolve2(fileName);
        });
      }
    });
    //resolves main promise...
    promise2.then((fileName) => {
      console.log('resolving file...');
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

//homepage render
app.get('/', (req, res)=> {
  res.render('index.hbs');
});
//calls loopimage -> gets data from DB -> returns image -> returns ajax call
app.get('/pics', (req, res) => {
  return new Promise((resolve, reject) => {
      var result = loopImage();
      return resolve(result);
    }).then((image) => {
    console.log(image.length);
    res.writeHead(200, {'Content-type': 'image/png'});
    res.end(image, 'binary');
  }).catch((err) => {
      return console.log(`/pic Error: ${err}`);
  });
});
//set port to listen...
app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
