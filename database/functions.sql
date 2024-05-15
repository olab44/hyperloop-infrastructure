-- Calculate total length and total time of the route
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


CREATE PROCEDURE DeleteRoute(IN routeId INT)
BEGIN
    DELETE FROM ROUTE WHERE ROUTE_ID = routeId;
END //


CREATE PROCEDURE AssignCapsuleToRoute(
    IN p_route_id INT,
    IN p_capsule_id INT
)
BEGIN
    INSERT INTO ROUTE_CAPSULE (ROUTE_ID, CAPSULE_ID)
    VALUES (p_route_id, p_capsule_id);
END //

CREATE PROCEDURE UpdateInfrastructureState(IN elementId INT, IN newState VARCHAR(1))
BEGIN
    UPDATE INFRASTRUCTURE_ELEMENT
    SET STATUS = newState
    WHERE ELEMENT_ID = elementId;
END //



DELIMITER ;