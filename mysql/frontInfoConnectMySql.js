var mysql = require('mysql');

var mySqlFrontInfoConn = () => {
    return new Promise(findFilePath);
    function findFilePath(resolve, reject) {
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
		return resolve(result);
	    });
	});
    }
    findFilepath().then((data) => {
	return data;
    }).catch((err) => {
	return err;
    });
};
module.exports = {
  mySqlFrontInfoConn  
};
