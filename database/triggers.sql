DELIMITER //

CREATE TRIGGER update_infrastructure_to_broken
AFTER INSERT ON MALFUNCTION
FOR EACH ROW
BEGIN
    UPDATE INFRASTRUCTURE_ELEMENT
    SET STATUS = 'B'
    WHERE ELEMENT_ID = NEW.ELEMENT_FK;
END //

CREATE TRIGGER update_infrastructure_to_working
AFTER UPDATE ON INFRASTRUCTURE_ELEMENT
FOR EACH ROW
BEGIN
    IF NEW.STATUS = 'A' THEN
        UPDATE MALFUNCTION
        SET REPAIR_DATE = CURDATE()
        WHERE ELEMENT_FK = NEW.ELEMENT_ID AND REPAIR_DATE IS NULL;
    END IF;
END //

DELIMITER ;
