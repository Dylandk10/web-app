var mysql = require('mysql');

var mySqlFindRestaurant = (restaurantName) => {
  //returns promise of data
  return new Promise(dataResult);
  //function promise
    function dataResult(resolve, reject) {
	var conn = mysql.createConnection({
	    host: "localhost",
	    user: "root",
	    password: "",
	    database: "main"
	});
    conn.connect(function(err) {
      if (err) {
        throw err;
      }
	var sql = 'SELECT * FROM restaurant WHERE name = ?';
	conn.query(sql, [restaurantName], function(err, result, fields) {
        if (err) {
          throw err;
        }
	console.log(result);
        return resolve(result);
      });
    });
  }
  //return data to promise -> end function
  dataResult().then((data) => {
  return data;
  }).catch((err) => {
      return err;
  });
};
module.exports = {
  mySqlFindRestaurant
};
