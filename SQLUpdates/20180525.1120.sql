

/******************** Add Table: dbo.secModuleUser ************************/

/* Build Table Structure */
CREATE TABLE dbo.secModuleUser
(
	GuidModuleUser UniqueIdentifier NOT NULL,
	GuidModule UniqueIdentifier NULL,
	GuidUser UniqueIdentifier NULL,
	AppNotificationToken VARCHAR(300) NULL
);

/* Add Primary Key */
ALTER TABLE dbo.secModuleUser ADD CONSTRAINT pksecModuleUser
	PRIMARY KEY (GuidModuleUser);

/* Add Indexes */
CREATE NONCLUSTERED INDEX secModuleUser_GuidModule_GuidUser_Idx ON dbo.secModuleUser (GuidModule, GuidUser);


/******************** Add Table: dbo.secNotification ************************/

/* Build Table Structure */
CREATE TABLE dbo.secNotification
(
	GuidNotification UniqueIdentifier NOT NULL,
	ToUser UniqueIdentifier NULL,
	GuidNotificationPriority UniqueIdentifier NULL,
	Title VARCHAR(255) NULL,
	Body VARCHAR(4000) NULL,
	Priority VARCHAR(30) NULL,
	Sound VARCHAR(30) NULL,
	ToCustom VARCHAR(255) NULL,
	GuidModule UniqueIdentifier NULL
);

/* Add Primary Key */
ALTER TABLE dbo.secNotification ADD CONSTRAINT pksecNotification
	PRIMARY KEY (GuidNotification);


/******************** Add Table: dbo.secNotificationPriority ************************/

/* Build Table Structure */
CREATE TABLE dbo.secNotificationPriority
(
	GuidNotificationPriority UniqueIdentifier NOT NULL,
	Name VARCHAR(255) NOT NULL
);

/* Add Primary Key */
ALTER TABLE dbo.secNotificationPriority ADD CONSTRAINT pksecNotificationPriority
	PRIMARY KEY (GuidNotificationPriority);

/* Add Foreign Key: fk_secModuleUser_secModule */
ALTER TABLE dbo.secModuleUser ADD CONSTRAINT fk_secModuleUser_secModule
	FOREIGN KEY (GuidModule) REFERENCES dbo.secModule (GuidModule)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_secModuleUser_secUsers */
ALTER TABLE dbo.secModuleUser ADD CONSTRAINT fk_secModuleUser_secUsers
	FOREIGN KEY (GuidUser) REFERENCES dbo.secUsers (GuidUser)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_secNotification_secModule */
ALTER TABLE dbo.secNotification ADD CONSTRAINT fk_secNotification_secModule
	FOREIGN KEY (GuidModule) REFERENCES dbo.secModule (GuidModule)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_secNotification_secNotificationPriority */
ALTER TABLE dbo.secNotification ADD CONSTRAINT fk_secNotification_secNotificationPriority
	FOREIGN KEY (GuidNotificationPriority) REFERENCES dbo.secNotificationPriority (GuidNotificationPriority)
	ON UPDATE NO ACTION ON DELETE NO ACTION;


-----------------------------------------------------------------------------------
------------------------------------------------------------------------------------
---------------------------------------------------------------------------------


/* Remove Indexes */
DROP INDEX dbo.secModuleUser.secModuleUser_GuidModule_GuidUser_Idx;

/* Add Indexes */
CREATE NONCLUSTERED INDEX secModuleUser_GuidModule_GuidUser_Idx ON dbo.secModuleUser (GuidModule, GuidUser, GuidModuleUser);


/******************** Add Table: dbo.secModuleUserDevice ************************/

/* Build Table Structure */
CREATE TABLE dbo.secModuleUserDevice
(
	GuidModuleUserDevice UniqueIdentifier NOT NULL,
	GuidModuleUser UniqueIdentifier NULL,
	OS VARCHAR(10) NULL,
	AppFirebaseNotificationToken VARCHAR(300) NULL,
	DeviceID VARCHAR(35) NULL
);

/* Add Primary Key */
ALTER TABLE dbo.secModuleUserDevice ADD CONSTRAINT pksecModuleUserDevice
	PRIMARY KEY (GuidModuleUserDevice);

/* Add Indexes */
CREATE NONCLUSTERED INDEX secModuleUserDevice_GuidModuleUserDevice_GuidModuleUser_DeviceID_Idx ON dbo.secModuleUserDevice (GuidModuleUserDevice, GuidModuleUser, DeviceID);


/* Add Foreign Key: fk_secModuleUserDevice_secModuleUser */
ALTER TABLE dbo.secModuleUserDevice ADD CONSTRAINT fk_secModuleUserDevice_secModuleUser
	FOREIGN KEY (GuidModuleUser) REFERENCES dbo.secModuleUser (GuidModuleUser)
	ON UPDATE NO ACTION ON DELETE NO ACTION;