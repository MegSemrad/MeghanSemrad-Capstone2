USE [master]
GO
IF db_id('LingaLearn') IS NULL
    CREATE DATABASE LingaLearn
GO
USE [LingaLearn]
GO
DROP TABLE IF EXISTS [Users];
DROP TABLE IF EXISTS [Languages];
DROP TABLE IF EXISTS [LanguageProficiencies];
DROP TABLE IF EXISTS [FlashcardCollections];
DROP TABLE IF EXISTS [Flashcards];
DROP TABLE IF EXISTS [JournalEntries];
DROP TABLE IF EXISTS [ResourceTypes];
DROP TABLE IF EXISTS [Resources];
GO 
CREATE TABLE [Users] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [UserName] NVARCHAR(50) NOT NULL,
  [Email] NVARCHAR(60) NOT NULL,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
CREATE TABLE [LanguageProficiencies] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Proficiency] NVARCHAR(20) NOT NULL 
) 
CREATE TABLE [Languages] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [UserId] INTEGER NOT NULL,
  [Language] NVARCHAR(80) NOT NULL,
  [LanguageProficiencyId] INTEGER NOT NULL,
  CONSTRAINT FK_Languages_Users FOREIGN KEY (UserId) REFERENCES Users(Id),
  CONSTRAINT FK_Languages_LanguageProficiencies FOREIGN KEY (LanguageProficiencyId) REFERENCES LanguageProficiencies(Id)
)
CREATE TABLE [FlashcardCollections] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [UserId] INTEGER NOT NULL,
  [LanguageId] INTEGER NOT NULL,
  [Date] DATETIME NOT NULL,
  [Topic] NVARCHAR(80) NOT NULL,
 CONSTRAINT FK_FlashcardCollections_Users FOREIGN KEY (UserId) REFERENCES Users(Id),
 CONSTRAINT FK_FlashcardCollections_Languages FOREIGN KEY (LanguageId) REFERENCES Languages(Id)
)
CREATE TABLE [Flashcards] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [FlashcardCollectionId] INTEGER NOT NULL,
  [Word] NVARCHAR(100) NOT NULL,
  [TranslatedWord] NVARCHAR(100) NOT NULL,
  [IsStudying] BIT NOT NULL,
 CONSTRAINT FK_FlashcardCollections_Flashcards FOREIGN KEY (FlashcardCollectionId) REFERENCES FlashcardCollections(Id)
)
CREATE TABLE [JournalEntries] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [UserId] INTEGER NOT NULL,
  [LanguageId] INTEGER NOT NULL,
  [Date] DATETIME NOT NULL,
  [JournalEntry] NVARCHAR(4000) NOT NULL,
  CONSTRAINT FK_JournalEntries_Users FOREIGN KEY (UserId) REFERENCES Users(Id),
  CONSTRAINT FK_JournalEntries_Languages FOREIGN KEY (LanguageId) REFERENCES Languages(Id)
)
CREATE TABLE [ResourceTypes] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [ResourceType] NVARCHAR(20) NOT NULL
)
CREATE TABLE [Resources] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [UserId] INTEGER NOT NULL,
  [LanguageId] INTEGER NOT NULL,
  [ResourceTypeId] INTEGER NOT NULL,
  [Resource] NVARCHAR(300) NOT NULL,
  CONSTRAINT FK_Resources_Users FOREIGN KEY (UserId) REFERENCES Users(Id),
  CONSTRAINT FK_Resources_Languages FOREIGN KEY (LanguageId) REFERENCES Languages(Id),
  CONSTRAINT FK_Resources_ResourceTypes FOREIGN KEY (ResourceTypeId) REFERENCES ResourceTypes(Id)
)
GO
