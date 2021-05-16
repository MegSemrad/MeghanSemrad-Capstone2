---
## About 
***LingaLearn*** is an app which helps a user who seeks to learn a foreign language. In this app, there is a place to categorize languages by those the user knows, is learning, and wishes to learn in the future. Also, there is a section for the user to create flashcard collections by language and topic to facilitate studying vocabulary words. Additionally, a user may keep a record of all resources they are referencing during their learning process for each language.  



## Table of Contents
  * [Features](#features)
  * [Technologies Used](#technologies-used)
  * [Setup](#setup)
  * [Appendix 1: Planning Documentation](#appendix-1-planning-documentation)
    * [ERD](#erd)
    * [Wireframe](#wireframe)



## Features
* List of languages a user knows, is learning, and might wish to learn in the future
* Section to create flashcard collections by language and topic with ability to flip and moved back and forth the flashcards between a 'study it' column and a 'know it' column 
* Place to keep a record of resources used while studying, such as online, videos, textbooks, etc., for each language 



## Technologies Used
  ### Development Languages and Libraries


  ### Development Tools
   <img src="./client/linga-learn/src/images/githublogo.png" width="10%"></img>  
   <img src="./client/linga-learn/src/images/visualstudiocodelogo.png" width="10%"></img>   
   <img src="./client/linga-learn/src/images/visualstudiologo.png" width="13%"></img> 
   <img src="./client/linga-learn/src/images/sketchboard.jpg" width="10%"></img>  
   <img src="./client/linga-learn/src/images/dbdiagram.png" width="7%"></img>     




## Setup
  To run LingaLearn locally, follow the directions below.
  
  1. Create a firebase account <Link>https://firebase.google.com</Link> where you will `Add a project` for LingaLearn.
  
  2. From the `Authentication` page use the `sign-in method` and enable the `email/password`. Once saved create as many users as you wish. 

  3. Clone the repository by running the following command in your terminal.
  ```sh
    git@github.com:MegSemrad/nss-MeghanSemrad-Capstone2.git
  ```
  4. `cd` into the directory it creates

  5. Install the NPM dependencies for this project using the following commands
  ```sh
    npm install
  ```
  
  6. Open Visual Studio and open the LingaLearn project 
  
  7. Run a new query with the seed data provided. Before running the query update the User table to include the created user(s) from firebase and don't forget to include the `User UID`for the column `FirebaseUserID`
  
  8. Update the `appsettings.json` file by changing the value of the `FirebaseProjectId` key to be the Project Id of the Firebase project.
  
  9. Update the `.env` file by changing the value of the `REACT_APP_API_KEY` to the API key from the firebase project.
  
  10. From Visual Studio run the project
  
  11. In terminal, `cd` into the client portion of the app

  11. From there, type
  ```sh
    npm start
  ```
  
  
## Appendix 1: Planning Documentation
 ### ERD

 
  ### Wireframe

 
 _____________________________________
&copy; 2021   | Web app designed by Meghan Semrad
