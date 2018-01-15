
/******************** Update Table: secModule ************************/

ALTER TABLE dbo.secModule ADD RecaptchaPublicKey VARCHAR(255) NULL;

ALTER TABLE dbo.secModule ADD RecaptchaPrivateKey VARCHAR(255) NULL;
