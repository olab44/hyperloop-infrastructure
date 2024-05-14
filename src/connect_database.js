const mysql = require('mysql2');


function connect() {
  const db = mysql.createConnection({
    host: 'sql.freedb.tech',
    port: 3306,
    user: 'freedb_project',
    password: 'k659$?YCTBfCSUn',
    database: 'freedb_Hyperloop'
  });

  db.connect((err) => {
  if (err) console.error('Error connecting to MySQL database:', err); 
  else console.log('Connected to MySQL database'); 
  });
  return db;
}

function getAllRoutes(callback) {
  const db = connect();

  const query = 'SELECT * FROM ROUTE'

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error retrieving data from routes table:', err);
          callback(err, null);
      } else {
          callback(null, results);
      }

      db.end();
  });
}

module.exports = {getAllRoutes};



// getAllRoutes((err, routes) => {
//       console.log('Routes data:', routes);
// });