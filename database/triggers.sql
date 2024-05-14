CREATE TRIGGER update_infrastructure_to_broken
AFTER INSERT ON MALFUNCTION
FOR EACH ROW
BEGIN
    UPDATE INFRASTRUCTURE_ELEMENT
    SET STATUS = 'B'
    WHERE ELEMENT_ID = NEW.ELEMENT_FK;
END;

CREATE TRIGGER update_infrastructure_to_working
AFTER UPDATE ON MALFUNCTION
FOR EACH ROW
BEGIN
    IF NEW.REPAIR_DATE IS NOT NULL THEN
        UPDATE INFRASTRUCTURE_ELEMENT
        SET STATUS = 'A'
        WHERE ELEMENT_ID = NEW.ELEMENT_FK;
    END IF;
END;
