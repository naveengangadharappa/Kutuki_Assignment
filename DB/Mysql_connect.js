const mysql = require('mysql');
var mysqlconnection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DBNAME || 'kutuki'
});

mysqlconnection.connect((err) => {
    if (!err) console.log("MysqlDb connection successfull");
    else console.log(" sorry Db connection un-successfull" + JSON.stringify(err));
});

module.exports = mysqlconnection;
