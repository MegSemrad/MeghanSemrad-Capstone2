USE[LingaLearn];
GO
SET IDENTITY_INSERT [Users] ON
INSERT INTO [Users]
  ([Id], [UserName], [Email], [FirebaseUserId])
VALUES 
  (1, 'Adam', 'a@a.com', '5EBZ5E2DlBVVGihkO8fbtW1gsJM2'), 
  (2, 'Beth', 'b@b.com', 'sk7sWYLiRYhYbtHqDJrzywrD8TB2'),
  (3, 'Catherine', 'c@c.com', 'wHQm2juu3NT1jekAyCZIJW1Gwzh2');
SET IDENTITY_INSERT [Users] OFF
SET IDENTITY_INSERT [LanguageProficiencies] ON
INSERT INTO [LanguageProficiencies]
  ([Id], [Proficiency])
VALUES 
  (1, 'Know'), 
  (2, 'Learning'),
  (3, 'Future');
SET IDENTITY_INSERT [LanguageProficiencies] OFF
SET IDENTITY_INSERT [Languages] ON
INSERT INTO [Languages]
  ([Id], [UserId], [Language], [LanguageProficiencyId])
VALUES 
  (1, 2, 'Welsh', 2), 
  (2, 1, 'Afrikaans', 2),
  (3, 2, 'Latin', 3),
  (4, 2, 'English', 1),
  (5, 1, 'English', 1),
  (6, 1, 'Italian', 3),
  (7, 2, 'Spanish', 1),
  (8, 1, 'Swedish', 3),
  (9, 2, 'French', 2);
SET IDENTITY_INSERT [Languages] OFF
SET IDENTITY_INSERT [FlashcardCollections] ON
INSERT INTO [FlashcardCollections]
  ([Id], [UserId], [LanguageId], [Date], [Topic])
VALUES 
  (1, 1, 2, '2020-04-09 17:35:00', 'colors'), 
  (2, 2, 1, '2020-11-01 13:10:00', 'house'),
  (3, 2, 9, '2020-07-22 12:23:00', 'foods');
SET IDENTITY_INSERT [FlashcardCollections] OFF
SET IDENTITY_INSERT [Flashcards] ON
INSERT INTO [Flashcards]
  ([Id], [FlashcardCollectionId], [Word], [TranslatedWord], [IsStudying])
VALUES 
   (1, 2, 'house', 'tŷ, tai (m)', 0), 
   (2, 2, 'window', 'ffenstr, ffenstri (f)', 1),
   (3, 2, 'chair', 'cadair, cadeiriau (f)', 1),
   (4, 2, 'desk', 'desg, desgiau (f)', 1),
   (5, 2, 'bed', 'gwely, gwelyau (m)', 0),
   (6, 2, 'refrigerator', 'oergell, oergelloedd (f)', 1),
   (7, 2, 'door', 'drws, drysau (m)', 0),
   (8, 2, 'roof', 'to, toeau (m)', 0),
   (9, 1, 'red', 'rooi', 0), 
   (10, 1, 'orange', 'oranje', 1),
   (11, 1, 'yellow', 'geel', 1),
   (12, 1, 'green', 'groen', 1),
   (13, 1, 'blue', 'blou', 1),
   (14, 1, 'purple', 'pers', 0),
   (15, 1, 'brown', 'bruin', 0),
   (16, 1, 'black', 'swart', 1),
   (17, 3, 'banana', 'la banane', 1), 
   (18, 3, 'lemon', 'le citron', 1),
   (19, 3, 'strawberry', 'la fraise', 0),
   (20, 3, 'carrot', 'la carotte', 1),
   (21, 3, 'bean', 'le haricot', 0),
   (22, 3, 'potato', 'la pomme de terre', 1),
   (23, 3, 'butter', 'le beurre', 0),
   (24, 3, 'steak', 'le bifteck', 1);
SET IDENTITY_INSERT [Flashcards] OFF
SET IDENTITY_INSERT [JournalEntries] ON
INSERT INTO [JournalEntries]
  ([Id], [UserId], [LanguageId], [Date], [JournalEntry])
VALUES 
  (1, 2, 9, '2020-12-10 17:35:00', 'Bonjour! Je m''appelle Beth. J''ai 26ans. Je viens de Londres. Je suis professeur d''histoire.'),  
  (2, 1, 2, '2020-07-17 11:24:00', 'My naam is Adam. Ek is in Londen gebore. Ek het 6 maande terug Afrikaans begin leer. Ek ken net ''n paar woorde Afrikaans'),
  (3, 2, 1, '2020-04-09 17:44:00', 'Beth dw i! Dw i''n dda heddiw. Nawr, dw i''n dysgu Cymraeg!'),
  (4, 2, 1, '2020-04-10 12:10:00', 'Bwytais i dost a ffrwyth y bore ''ma. Heddiw, dw i''n mynd i''r siopa. '); 
SET IDENTITY_INSERT [JournalEntries] OFF
SET IDENTITY_INSERT [ResourceTypes] ON
INSERT INTO [ResourceTypes]
  ([Id], [ResourceType])
VALUES 
  (1, 'Online'), 
  (2, 'Videos'),
  (3, 'Radio'),
  (4, 'Books'),
  (5, 'Textbooks'),
  (6, 'Other');
SET IDENTITY_INSERT [ResourceTypes] OFF
SET IDENTITY_INSERT [Resources] ON
INSERT INTO [Resources]
  ([Id], [UserId], [LanguageId], [ResourceTypeId], [Resource])
VALUES 
  (1, 2, 1, 6, 'https://www.gweiadur.com/en/Pawb'), 
  (2, 2, 1, 1, 'https://learnwelsh.cymru/'), 
  (3, 1, 2, 1, 'https://www.easyafrikaans.com/'),
  (4, 1, 2, 1, 'https://ielanguages.com/afrikaans.html'),
  (5, 1, 2, 2, 'https://www.youtube.com/watch?v=eH7gaFCKdlA'),
  (6, 1, 2, 3, 'https://www.radio.net/s/kosmos941'),
  (7, 1, 2, 4, 'Triomf by Marlene van Niekerk'),
  (8, 1, 2, 5, 'nothing yet'),
  (9, 1, 2, 6, 'haven''t found anything'),
  (10, 2, 1, 2, 'https://www.youtube.com/watch?v=Aait14QVBGY'),
  (11, 2, 1, 3, 'https://www.bbc.co.uk/sounds/play/live:bbc_radio_cymru'),
  (12, 2, 1, 4, 'Un Nos Olad Leuad by Caradog Prichard'),
  (13, 2, 1, 5, 'Complete Welsh by Christine Jones and Julie Brake');
SET IDENTITY_INSERT [Resources] OFF