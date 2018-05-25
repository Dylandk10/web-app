/*connects to mysql and orders by highest rating and by alpha
return array to call function server.js -> loopImage
array contains only picture file names single string
*/
var mysql = require('mysql');

var mySqlConn = () => {
  //returns promise of data
  return new Promise(dataResult);
  //function promise
  function dataResult(resolve, reject) {
    var picArray = []; //array for picture file names
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
      conn.query("SELECT * FROM restaurant ORDER BY rating DESC", function(err, result, fields) {
        if (err) {
          throw err;
        }
        //returns object need to pull picture_name off of each file and push to array
        //return array
        console.log(`results: ${result} arrayLength: ${result.length} typeof ${typeof(result)}`);
        for(var i = 0; i < result.length; i++) {
          picArray.push(result[i].picture_name);
        }
        console.log(`picArray: ${picArray} picArraylength: ${picArray.length}`);
        //resolve promise
        return resolve(picArray);
      });
    });
  }
  //return data to promise -> end function
  dataResult().then((data) => {
  return data;
  }).catch((err) => {
    return err
  });
}
module.exports = {
  mySqlConn
}
