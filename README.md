## Overview
This project was created using create-react-app and Express.js. Create-react-app set up the general front-end and installed all of the packages we need to run the website statically. It set up all the stuff we need behind the scenes to make a website run off of just JavaScript. You can find more info on create-react-app and React.js in general here: https://facebook.github.io/react/ Express.js sets up our API backend that allows for our app to make requests and get data from the MySQL database. More info on Express.js can be found here: https://expressjs.com 

## Installation and Setup
The only program *needed* for this project is Node.js which you can find here: https://nodejs.org/en/ I would also recommend downloading CMDER from here https://cmder.net if you are on Windows. Cmder is a command line interface that is much easier to use on Windows because you can use UNIX commands.
  1. Download and install Node.js
  2. Clone the repository into a directory of your choice
  3. Navigate to the directory where you just cloned the repo, with Cmder this will be `cd C:\your\repo\dir`
  4. Run the command `npm install` and node will install all the packages needed
  5. Now that the packages are all installed run the command `npm run dev-api` this starts a local development Express.js "Server" on your machine that mimics the way the actual server handles API requests so we can run the website locally. It will also automatically reload when server files change
  6. Open a new tab in Cmder (or a new command prompt window) and run `npm start` in the same directory. This starts up the actual react app and loads the front end. It should automatically open a window for you and reload on changes.
  7. To stop, all you need to do is press CTRL+C and type `y` to the prompt. 
After the first ime run steps 5 - 7 to startup the app to view your changes.

## Project Structure
  ### Back End
  As above, Express.js handles our backend, it will be what is connecting up with MySQL to load information from the database. The way it works is that at any point in our app we can run the ```fetch(\name\of\request)``` function and it will make a request to Express. Express then reads the parameter and routes the request to the proper function. In most cases the request will be made to ```/database/something``` all of these requests are handled in the "server/routes/database.js" file. If you need to make a call to the database for *any* information it has to go through this file and you have to make a fetch request. There is currently an example in "server/routes/users.js" but it will be changed soon.
  ### Front End
    All of the UI and the actual display of the webpage is in the "/src" directory and more specifically the "/src/components" directory. This stores all of the UI components in our project that we will use to interact with users and display data. If you start with the "App.js" file you should be able to follow the component hierarchy down by looking at what is returned in the ```render()``` function.
  Pretty much every other folder in the project will never need to be changed.
