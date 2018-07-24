
/******************** Add Table: dbo.secTutorial ************************/

/* Build Table Structure */
CREATE TABLE dbo.secTutorial
(
	GuidTutorial UniqueIdentifier NOT NULL,
	Name VARCHAR(255) NULL,
	NameKey VARCHAR(20) NULL,
	GuidModule UniqueIdentifier NULL,
	CreatedBy UniqueIdentifier NULL,
	UpdatedBy UniqueIdentifier NULL,
	CreatedDate DATETIME NULL,
	UpdatedDate DATETIME NULL,
	IsDeleted BIT NULL
);

/* Add Primary Key */
ALTER TABLE dbo.secTutorial ADD CONSTRAINT pksecTutorial
	PRIMARY KEY (GuidTutorial);


/******************** Add Table: dbo.secTutorialItem ************************/

/* Build Table Structure */
CREATE TABLE dbo.secTutorialItem
(
	GuidTutorialItem UniqueIdentifier NOT NULL,
	OrderItem INTEGER NULL,
	GuidTutorial UniqueIdentifier NULL,
	ImageUrl VARCHAR(500) NULL,
	OrderContentHtml VARCHAR(8000) NULL,
	CreatedBy UniqueIdentifier NULL,
	UpdatedBy UniqueIdentifier NULL,
	CreatedDate DATETIME NULL,
	UpdatedDate DATETIME NULL,
	IsDeleted BIT NULL
);

/* Add Primary Key */
ALTER TABLE dbo.secTutorialItem ADD CONSTRAINT pksecTutorialItem
	PRIMARY KEY (GuidTutorialItem);



/* Add Foreign Key: fk_secTutorial_secModule */
ALTER TABLE dbo.secTutorial ADD CONSTRAINT fk_secTutorial_secModule
	FOREIGN KEY (GuidModule) REFERENCES dbo.secModule (GuidModule)
	ON UPDATE NO ACTION ON DELETE NO ACTION;

/* Add Foreign Key: fk_secTutorialItem_secTutorial */
ALTER TABLE dbo.secTutorialItem ADD CONSTRAINT fk_secTutorialItem_secTutorial
	FOREIGN KEY (GuidTutorial) REFERENCES dbo.secTutorial (GuidTutorial)
	ON UPDATE NO ACTION ON DELETE NO ACTION;