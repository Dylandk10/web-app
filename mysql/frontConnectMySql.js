/*
  This is the frontend find file path threw db function
  this returns the picturname that is assign to the resturant 
  returns array...
*/
var mysql = require('mysql');

var mySqlFrontConn = () => {
    return new Promise(findFilePath);
    function findFilePath(resolve, reject) {
	var pathArray = [];
	var conn = mysql.createConnection({
	    host: "localhost",
	    user: "root",
	    password: "",
	    database: "main"
	});
	conn.connect(function(err) {
	    if(err) {
		throw err;
	    }
	    conn.query("SELECT * FROM restaurant ORDER BY rating DESC", function(err, result, feilds) {
		for(var i = 0; i < result.length; i++) {
		    pathArray.push(result[i].picture_name);
		}
		return resolve(pathArray);
	    });
	});
    }
    findFilepath().then((path) => {
	return path;
    }).catch((err) => {
	return err;
    });
};
module.exports = {
  mySqlFrontConn  
};
