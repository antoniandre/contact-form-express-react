# WHAT IS IT?
___________

I have built this application with react-redux, redux form and Material UI for the frontend, and node express server for the backend.
The call from the contact form to the server is done with react fetch and the answer from the server is shown in a thank you message.

This application is architectured in a backend folder named `contact-form-express-react` which contains a folder named client for all the frontend with react redux.


# HOW TO INSTALL?
_______________

Download from github or git clone

    $ cd [localhost]
    $ git clone git@github.com:antoniandre/contact-form-express-react.git

Install backend dependencies with npm:

    $ cd contact-form-express-react
    $ npm install

Install frontend dependencies with npm:

    $ cd client
    $ npm install


# HOW TO RUN IT?
______________

To fully test the application on localhost, the server must be running (set on port :3001)
with the command:

    $ PORT=3001 node bin/www

Then the react application needs to be started (by default on port :3000) with the command:

    $ cd client
    $ npm start


# HOW DID I BUILD IT?
___________________

With VS code and the built-in terminal.

## SERVER SIDE:
1. I installed Express for the backend:

    $ npm install -g express-generator
    $ express contact-form-express-react

2. I installed the dependencies on server:

    $ cd contact-form-express-react
    $ npm install

3. I set the server route in `routes/contact.js` & `app.js`

## CLIENT SIDE:
1. I installed the react app using `create-react-app` to get a starter kit in the `client/` dir.

    $ npm install -g create-react-app
    $ create-react-app client

2. I installed the react redux app and all the dependencies I have decided to use in the `client/` dir.

    $ cd client
    $ npm install --save react-redux react-router-dom react-router-redux@next redux-thunk redux-form material-ui react-tap-event-plugin

3. I added a proxy in `client/package.json` so a call from app on port 3000 can contact server on port 3001.

    "proxy": "http://localhost:3001"

4. Using redux, I created the store.js file at the root of `client/src/` dir,
    I moved the main App in `app/index.js` and added the `components/` and `reducers/` dirs.
    And I added a few import in files to work with redux.
5. I have set 2 routes in `app.js` (using react-router-dom) for home and contact us.
6. I implemented the `contact/index.js` form and I wrapped the entire app with Material UI in `app/index.js`
7. I added a minimum of styles in css even if in real world I would use sass and heavier styling.
