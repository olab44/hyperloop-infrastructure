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
        // else console.log('Connected to MySQL database');
    });
    return db;
}

function getAllRoutes(callback) {
    const db = connect();

    const query = 'SELECT r.*,\
                   CalculateRouteLength(r.ROUTE_ID) AS TOTAL_LENGTH,\
                   CalculateRouteTime(r.ROUTE_ID) AS TOTAL_TIME,\
                   IsFunctional(r.ROUTE_ID) AS IS_FUNCTIONAL\
                   FROM ROUTE AS r';

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

function getFilteredRoutes(minLength, maxLength, minTime, maxTime, ieSelectors, callback) {
    const db = connect();

    let query = 'SELECT r.*,\
                 CalculateRouteLength(r.ROUTE_ID) AS TOTAL_LENGTH,\
                 CalculateRouteTime(r.ROUTE_ID) AS TOTAL_TIME,\
                 IsFunctional(r.ROUTE_ID) AS IS_FUNCTIONAL\
                 FROM ROUTE AS r\
                 WHERE CalculateRouteLength(r.ROUTE_ID) BETWEEN ? AND ?\
                 AND CalculateRouteTime(r.ROUTE_ID) BETWEEN ? AND ?';

    if (ieSelectors.length > 0) { query = query.concat('AND EXISTS(SELECT * FROM MalfunctioningRoutes mr\
                                                        WHERE mr.ROUTE_ID = r.ROUTE_ID AND mr.MALFUNCTION_TYPE IN (?))') }

    db.query(query, [minLength, maxLength, minTime, maxTime, ieSelectors], (err, results) => {
        if (err) {
            console.error('Error retrieving data from routes table:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }

        db.end();
    });
}

function getAllMalfunctions(callback) {
    const db = connect();

    const query = 'SELECT m.MALFUNCTION_ID AS mid, s.STRETCH_ID AS sid, ie.ELEMENT_ID AS eid,\
                    m.MALFUNCTION_DATE AS mdate, m.STATUS AS s, m.REPAIR_DATE AS rdate\
                    FROM MALFUNCTION m\
                    JOIN INFRASTRUCTURE_ELEMENT ie ON m.ELEMENT_FK = ie.ELEMENT_ID\
                    JOIN STRETCH s ON s.STRETCH_ID = ie.STRETCH_FK\
                    ORDER BY m.MALFUNCTION_DATE ASC';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving data from malfunction, stretch, or infrastructure element table:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }

        db.end();
    });
}

function getMalfunctionsByRoute(callback){
    const db = connect();

    const query = 'SELECT r.ROUTE_ID, r.NAME, COUNT(m.ELEMENT_FK) AS countedErrors\
                    FROM ROUTE r\
                    JOIN ROUTE_STRETCH rs ON rs.ROUTE_ID = r.ROUTE_ID\
                    JOIN INFRASTRUCTURE_ELEMENT ie ON ie.STRETCH_FK = rs.STRETCH_ID\
                    JOIN MALFUNCTION m ON m.ELEMENT_FK=ie.ELEMENT_ID\
                    WHERE m.STATUS = "B"\
                    GROUP BY r.ROUTE_ID';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving data from malfunction table or fetching malfunctioning routes:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }

        db.end();
    });
}


function getAllStretches(callback) {
    const db = connect();

    const query = 'SELECT STRETCH_ID, START_STATION_FK AS START_STATION, END_STATION_FK AS END_STATION FROM STRETCH';

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

function addRoute(name, stretches, callback) {
    const db = connect();
    const query = 'CALL AddRoute(?,?)';
    db.query(query, [name, stretches], (err, results) => {
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
    const query = 'CALL DeleteRoute(?)';
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
    const query = 'CALL AssignCapsuleToRoute(?, ?)';
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

function updateInfrastructure(elementId, newState, callback) {
    const db = connect();
    const query = 'CALL UpdateInfrastructureState(?, ?)';
    db.query(query, [elementId, newState], (err, results) => {
        if (err) {
            console.error('Error changing status:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
        db.end();
    });
}



module.exports = {
    connect,
    getAllRoutes,
    getFilteredRoutes,
    getAllStretches,
    addRoute,
    getAllMalfunctions,
    getMalfunctionsByRoute,
    deleteRoute,
    assignCapsule,
    updateInfrastructure,
};
