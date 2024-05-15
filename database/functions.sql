DELIMITER //

-- Calculate total length [km] of the route
CREATE FUNCTION IF NOT EXISTS CalculateRouteLength(route_id INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total_length INT DEFAULT 0;

    SELECT SUM(s.LENGTH) INTO total_length
    FROM
        ROUTE_STRETCH rs
        JOIN STRETCH s ON rs.STRETCH_ID = s.STRETCH_ID
    WHERE
        rs.ROUTE_ID = route_id;

    RETURN total_length;
END //

-- Calculate total time [min] of the route
CREATE FUNCTION IF NOT EXISTS CalculateRouteTime(route_id INT)
RETURNS DECIMAL(10, 2)
DETERMINISTIC
BEGIN
    DECLARE total_time DECIMAL(10, 2) DEFAULT 0.0;

    SELECT  SUM(s.LENGTH / s.MAX_SPEED) INTO total_time
    FROM
        ROUTE_STRETCH rs
        JOIN STRETCH s ON rs.STRETCH_ID = s.STRETCH_ID
    WHERE
        rs.ROUTE_ID = route_id;

    RETURN total_time*60;
END //

DELIMITER ;
