
SET XACT_ABORT ON;

DECLARE @OldUid UNIQUEIDENTIFIER;
DECLARE @NewUid UNIQUEIDENTIFIER;

IF (
    SELECT COUNT(*)
    FROM dbo.SysSchema
    WHERE Name = 'UsrMCITResourceCatalog_ListPage'
) <> 1
BEGIN
    ;THROW 50001, 'Original Resource Catalog schema missing or ambiguous.', 1;
END;

IF (
    SELECT COUNT(*)
    FROM dbo.SysSchema
    WHERE Name = 'UsrMCITResourceCatalogV2Page'
) <> 1
BEGIN
    ;THROW 50002, 'Resource Catalog V2 schema missing or ambiguous.', 1;
END;

SELECT @OldUid = UId
FROM dbo.SysSchema
WHERE Name = 'UsrMCITResourceCatalog_ListPage';

SELECT @NewUid = UId
FROM dbo.SysSchema
WHERE Name = 'UsrMCITResourceCatalogV2Page';

-- The old/new association must identify exactly one section.
IF (
    SELECT COUNT(*)
    FROM dbo.SysModule
    WHERE SectionSchemaUId IN (@OldUid, @NewUid)
) <> 1
BEGIN
    ;THROW 50003, 'Resource Catalog section could not be uniquely identified.', 1;
END;

-- Update only if the section still uses the original page.
UPDATE dbo.SysModule
SET SectionSchemaUId = @NewUid
WHERE SectionSchemaUId = @OldUid;

PRINT 'Resource Catalog V2 section mapping verified.';
