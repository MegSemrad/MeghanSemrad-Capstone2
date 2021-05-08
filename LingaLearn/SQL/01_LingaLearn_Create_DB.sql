USE [master]
GO
IF db_id('LingaLearn') IS NULL
    CREATE DATABASE LingaLearn
GO
USE [LingaLearn]
GO
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Language];
DROP TABLE IF EXISTS [LanguageProficiency];
DROP TABLE IF EXISTS [FlashcardCollection];
DROP TABLE IF EXISTS [Flashcard];
DROP TABLE IF EXISTS [JournalEntry];
DROP TABLE IF EXISTS [ResourceType];
DROP TABLE IF EXISTS [Resource];
GO 
CREATE TABLE [User] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [UserName] NVARCHAR(50) NOT NULL,
  [Email] NVARCHAR(60) NOT NULL,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
CREATE TABLE [LanguageProficiency] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Proficiency] NVARCHAR(20) NOT NULL 
) 
CREATE TABLE [Language] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [UserId] INTEGER NOT NULL,
  [LanguageName] NVARCHAR(80) NOT NULL,
  [LanguageProficiencyId] INTEGER NOT NULL,
  CONSTRAINT FK_Languages_User FOREIGN KEY (UserId) REFERENCES User(Id),
  CONSTRAINT FK_Language_LanguageProficiency FOREIGN KEY (LanguageProficiencyId) REFERENCES LanguageProficiency(Id)
)
CREATE TABLE [FlashcardCollection] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [UserId] INTEGER NOT NULL,
  [LanguageId] INTEGER NOT NULL,
  [Date] DATETIME NOT NULL,
  [Topic] NVARCHAR(80) NOT NULL,
 CONSTRAINT FK_FlashcardCollection_User FOREIGN KEY (UserId) REFERENCES User(Id),
 CONSTRAINT FK_FlashcardCollection_Language FOREIGN KEY (LanguageId) REFERENCES Language(Id)
)
CREATE TABLE [Flashcard] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [FlashcardCollectionId] INTEGER NOT NULL,
  [Word] NVARCHAR(100) NOT NULL,
  [TranslatedWord] NVARCHAR(100) NOT NULL,
  [IsStudying] BIT NOT NULL,
 CONSTRAINT FK_FlashcardCollection_Flashcard FOREIGN KEY (FlashcardCollectionId) REFERENCES FlashcardCollection(Id)
)
CREATE TABLE [JournalEntry] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [UserId] INTEGER NOT NULL,
  [LanguageId] INTEGER NOT NULL,
  [Date] DATETIME NOT NULL,
  [Entry] NVARCHAR(4000) NOT NULL,
  CONSTRAINT FK_JournalEntry_User FOREIGN KEY (UserId) REFERENCES User(Id),
  CONSTRAINT FK_JournalEntry_Language FOREIGN KEY (LanguageId) REFERENCES Language(Id)
)
CREATE TABLE [ResourceType] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Type] NVARCHAR(20) NOT NULL
)
CREATE TABLE [Resource] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [UserId] INTEGER NOT NULL,
  [LanguageId] INTEGER NOT NULL,
  [ResourceTypeId] INTEGER NOT NULL,
  [Source] NVARCHAR(300) NOT NULL,
  CONSTRAINT FK_Resources_User FOREIGN KEY (UserId) REFERENCES User(Id),
  CONSTRAINT FK_Resources_Language FOREIGN KEY (LanguageId) REFERENCES Language(Id),
  CONSTRAINT FK_Resources_ResourceType FOREIGN KEY (ResourceTypeId) REFERENCES ResourceType(Id)
)
GO
