-- MySQL Script generated by MySQL Workbench
-- Sat May 11 18:50:41 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table .`ROUTE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ROUTE` (
  `ROUTE_ID` INT NOT NULL,
  `NAME` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`ROUTE_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table .`CAPSULE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CAPSULE` (
  `CAPSULE_ID` INT NOT NULL,
  `NAME` VARCHAR(20) NOT NULL,
  `TYPE` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`CAPSULE_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table .`COUNTRY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `COUNTRY` (
  `COUNTRY_ID` INT NOT NULL,
  `NAME` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`COUNTRY_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table .`ADDRESS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ADDRESS` (
  `ADDRESS_ID` INT NOT NULL,
  `ADDRESS` VARCHAR(50) NOT NULL,
  `CITY` VARCHAR(50) NOT NULL,
  `POSTCODE` VARCHAR(10) NOT NULL,
  `COUNTRY_FK` INT NOT NULL,
  PRIMARY KEY (`ADDRESS_ID`),
  INDEX `fk_ADDRESS_COUNTRY1_idx` (`COUNTRY_FK` ASC) VISIBLE,
  CONSTRAINT `fk_ADDRESS_COUNTRY1`
    FOREIGN KEY (`COUNTRY_FK`)
    REFERENCES `COUNTRY` (`COUNTRY_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table .`STATION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `STATION` (
  `STATION_ID` INT NOT NULL,
  `ADDRESS_ID` INT NOT NULL,
  PRIMARY KEY (`STATION_ID`),
  INDEX `fk_STATION_ADDRESS1_idx` (`ADDRESS_ID` ASC) VISIBLE,
  CONSTRAINT `fk_STATION_ADDRESS1`
    FOREIGN KEY (`ADDRESS_ID`)
    REFERENCES `ADDRESS` (`ADDRESS_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table .`STRETCH`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `STRETCH` (
  `STRETCH_ID` INT NOT NULL,
  `LENGTH` INT NOT NULL,
  `MAX_SPEED` INT NOT NULL,
  `START_STATION_FK` INT NOT NULL,
  `END_STATION_FK` INT NOT NULL,
  PRIMARY KEY (`STRETCH_ID`),
  INDEX `fk_STRETCH_STATION1_idx` (`END_STATION_FK` ASC) VISIBLE,
  INDEX `fk_STRETCH_STATION2_idx` (`START_STATION_FK` ASC) VISIBLE,
  CONSTRAINT `fk_STRETCH_STATION1`
    FOREIGN KEY (`END_STATION_FK`)
    REFERENCES `STATION` (`STATION_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_STRETCH_STATION2`
    FOREIGN KEY (`START_STATION_FK`)
    REFERENCES `STATION` (`STATION_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table .`ROUTE_STRETCH`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ROUTE_STRETCH` (
  `ROUTE_ID` INT NOT NULL,
  `STRETCH_ID` INT NOT NULL,
  `ORDER` INT NOT NULL,
  PRIMARY KEY (`ROUTE_ID`, `ORDER`, `STRETCH_ID`),
  INDEX `fk_STRETCH_ID_has_ROUTE_ROUTE1_idx` (`ROUTE_ID` ASC) VISIBLE,
  INDEX `fk_STRETCH_ID_has_ROUTE_STRETCH_ID1_idx` (`STRETCH_ID` ASC) VISIBLE,
  CONSTRAINT `fk_STRETCH_ID_has_ROUTE_STRETCH_ID1`
    FOREIGN KEY (`STRETCH_ID`)
    REFERENCES `STRETCH` (`STRETCH_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_STRETCH_ID_has_ROUTE_ROUTE1`
    FOREIGN KEY (`ROUTE_ID`)
    REFERENCES `ROUTE` (`ROUTE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table .`PLATFORM`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PLATFORM` (
  `PLATFORM_ID` INT NOT NULL,
  `NUMBER` INT NOT NULL,
  `AVAILABILITY` VARCHAR(1) NOT NULL,
  `LENGTH` INT NOT NULL,
  `STATION_FK` INT NOT NULL,
  INDEX `fk_table1_STATION1_idx` (`STATION_FK` ASC) INVISIBLE,
  PRIMARY KEY (`PLATFORM_ID`),
  CONSTRAINT `fk_table1_STATION1`
    FOREIGN KEY (`STATION_FK`)
    REFERENCES `STATION` (`STATION_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table .`INFRASTRUCTURE_ELEMENT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `INFRASTRUCTURE_ELEMENT` (
  `ELEMENT_ID` INT NOT NULL,
  `SELECTOR` VARCHAR(15) NOT NULL,
  `NAME` VARCHAR(50) NOT NULL,
  `STATUS` VARCHAR(1) NOT NULL,
  `LATITUDE` DECIMAL(8,5) NOT NULL,
  `LONGITUDE` DECIMAL(8,5) NOT NULL,
  `STRETCH_FK` INT NOT NULL,
  `SIGNAL` VARCHAR(1) NULL,
  `LENGTH` INT NULL,
  `HEIGHT` INT NULL,
  `WIDTH` INT NULL,
  PRIMARY KEY (`ELEMENT_ID`),
  INDEX `fk_INFRASTRUCTURE_ELEMENT_STRETCH1_idx` (`STRETCH_FK` ASC) VISIBLE,
  CONSTRAINT `fk_INFRASTRUCTURE_ELEMENT_STRETCH1`
    FOREIGN KEY (`STRETCH_FK`)
    REFERENCES `STRETCH` (`STRETCH_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE `INFRASTRUCTURE_ELEMENT`
	ADD CONSTRAINT Selector_IE
	CHECK (`SELECTOR` IN ('PORT', 'TUNNEL', 'SEMAPHORE', 'EXIT'));

ALTER TABLE `INFRASTRUCTURE_ELEMENT`
	ADD CONSTRAINT Infrastructure_atryb
	CHECK ((`SELECTOR` = 'SEMAPHORE' AND 'SIGNAL' IS NOT NULL
	     OR `SELECTOR` <> 'SEMAPHORE' AND 'SIGNAL' IS NULL)
	   AND (`SELECTOR` = 'TUNNEL' AND 'LENGTH' IS NOT NULL AND `HEIGHT` IS NOT NULL AND `WIDTH` IS NOT NULL
	     OR `SELECTOR` <> 'TUNNEL' AND 'LENGTH' IS NULL AND `HEIGHT` IS NULL AND `WIDTH` IS NULL));


-- -----------------------------------------------------
-- Table .`MALFUNCTION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MALFUNCTION` (
  `MALFUNCTION_ID` INT NOT NULL,
  `ELEMENT_FK` INT NOT NULL,
  `MALFUNCTION_DATE` TIMESTAMP NOT NULL,
  `STATUS` VARCHAR(1) NOT NULL,
  `REPAIR_DATE` TIMESTAMP NULL,
  INDEX `fk_MALFUNCTION_INFRASTRUCTURE_ELEMENT1_idx` (`ELEMENT_FK` ASC) VISIBLE,
  PRIMARY KEY (`MALFUNCTION_ID`),
  CONSTRAINT `fk_MALFUNCTION_INFRASTRUCTURE_ELEMENT1`
    FOREIGN KEY (`ELEMENT_FK`)
    REFERENCES `INFRASTRUCTURE_ELEMENT` (`ELEMENT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table .`SERVICE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SERVICE` (
  `SERVICE_ID` INT NOT NULL,
  `SELECTOR` VARCHAR(15) NOT NULL,
  `NAME` VARCHAR(50) NOT NULL,
  `STATION_FK` INT NOT NULL,
  `MENU` VARCHAR(50) NULL,
  `RATING` DECIMAL(2,1) NULL,
  `PLACES_AVAILABLE` INT NULL,
  `PARKING_FEE` DECIMAL(4,2) NULL,
  `TYPE` VARCHAR(20) NULL,
  `SURFACE` INT NULL,
  PRIMARY KEY (`SERVICE_ID`),
  INDEX `fk_SERVICE_STATION1_idx` (`STATION_FK` ASC) VISIBLE,
  CONSTRAINT `fk_SERVICE_STATION1`
    FOREIGN KEY (`STATION_FK`)
    REFERENCES `STATION` (`STATION_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE `SERVICE`
	ADD CONSTRAINT Selector_S
	CHECK (`SELECTOR` IN ('PARKING', 'MALL', 'RESTAURANT'));

ALTER TABLE `SERVICE`
	ADD CONSTRAINT Service_atryb
	CHECK ((`SELECTOR` <> 'PARKING' AND `PLACES_AVAILABLE` IS NULL AND `PARKING_FEE` IS NULL)
	   AND (`SELECTOR` <> 'MALL' AND `TYPE` IS NULL AND `SURFACE` IS NULL)
	   AND (`SELECTOR` <> 'RESTAURANT' AND `MENU` IS NULL AND `RATING` IS NULL));


-- -----------------------------------------------------
-- Table .`ROUTE_CAPSULE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ROUTE_CAPSULE` (
  `ROUTE_ID` INT NOT NULL,
  `CAPSULE_ID` INT NOT NULL,
  PRIMARY KEY (`CAPSULE_ID`, `ROUTE_ID`),
  INDEX `fk_CAPSULE_has_ROUTE_ROUTE1_idx` (`ROUTE_ID` ASC) VISIBLE,
  INDEX `fk_CAPSULE_has_ROUTE_CAPSULE1_idx` (`CAPSULE_ID` ASC) VISIBLE,
  CONSTRAINT `fk_CAPSULE_has_ROUTE_CAPSULE1`
    FOREIGN KEY (`CAPSULE_ID`)
    REFERENCES `CAPSULE` (`CAPSULE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CAPSULE_has_ROUTE_ROUTE1`
    FOREIGN KEY (`ROUTE_ID`)
    REFERENCES `ROUTE` (`ROUTE_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
