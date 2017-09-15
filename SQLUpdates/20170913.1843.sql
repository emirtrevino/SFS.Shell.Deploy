
ALTER TABLE dbo.secBusinessObject ADD GuidReusableStorageForGet UniqueIdentifier NULL;


/* Add Foreign Key: fk_Reusable_StorafgeForGet */
ALTER TABLE dbo.secBusinessObject ADD CONSTRAINT fk_Reusable_StorafgeForGet
	FOREIGN KEY (GuidReusableStorageForGet) REFERENCES dbo.secReusableCatalogValues (GuidReusableCatalogValue)
	ON UPDATE NO ACTION ON DELETE NO ACTION;