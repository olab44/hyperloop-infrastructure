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

    const query = 'SELECT * FROM ROUTE';

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

function addRoute(routeId, name, callback) {
    const db = connect();

    const query = 'INSERT INTO ROUTE (ROUTE_ID, NAME) VALUES (?, ?)';
    db.query(query, [routeId, name], (err, results) => {
        if (err) {
            console.error('Error adding route:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }

        db.end();
    });
}

function deleteRoute(routeId, callback) {
  const db = connect();

  const query = 'DELETE FROM ROUTE WHERE ROUTE_ID = ?';
  db.query(query, [routeId], (err, results) => {
      if (err) {
          console.error('Error deleting route:', err);
          callback(err, null);
      } else {
          callback(null, results);
      }

      db.end();
  });
}

function assignCapsule(routeId, capsuleId, callback) {
    const db = connect();

    const query = 'INSERT INTO ROUTE_CAPSULE (ROUTE_ID, CAPSULE_ID) VALUES (?, ?)';
    db.query(query, [routeId, capsuleId], (err, results) => {
        if (err) {
            console.error('Error assigning capsule:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }

        db.end();
    });
}

function updateInfrastructureState(elementId, newState, callback) {
  const db = connect();

  const query = 'UPDATE INFRASTRUCTURE_ELEMENT SET STATE = ? WHERE ELEMENT_ID = ?';
  db.query(query, [newState, elementId], (err, results) => {
      if (err) {
          console.error('Error updating infrastructure state:', err);
          callback(err, null);
      } else {
          callback(null, results);
      }

      db.end();
  });
}


module.exports = {
    getAllRoutes,
    addRoute,
    deleteRoute,
    assignCapsule,
    updateInfrastructureState
};
