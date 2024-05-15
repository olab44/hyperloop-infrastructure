DELIMITER

DROP TRIGGER IF EXISTS update_infrastructure_to_broken;
CREATE TRIGGER update_infrastructure_to_broken
AFTER UPDATE ON INFRASTRUCTURE_ELEMENT
FOR EACH ROW
BEGIN
    IF NEW.STATUS = 'B' AND OLD.STATUS != 'B' THEN
        UPDATE INFRASTRUCTURE_ELEMENT
        SET STATUS = 'B'
        WHERE ELEMENT_ID = NEW.ELEMENT_ID;

        INSERT INTO MALFUNCTION (`ELEMENT_FK`, `MALFUNCTION_DATE`, `STATUS`)
        VALUES (NEW.ELEMENT_ID, CURDATE(), NEW.STATUS);
    END IF;
END;


DROP TRIGGER IF EXISTS update_infrastructure_to_working;
CREATE TRIGGER update_infrastructure_to_working
AFTER UPDATE ON INFRASTRUCTURE_ELEMENT
FOR EACH ROW
BEGIN
    IF NEW.STATUS = 'A' AND OLD.STATUS != 'A' THEN
        UPDATE MALFUNCTION
        SET REPAIR_DATE = CURDATE()
        WHERE ELEMENT_FK = NEW.ELEMENT_ID AND REPAIR_DATE IS NULL;
    END IF;
END//

DELIMITER ;