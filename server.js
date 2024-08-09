require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { engine } = require('express-handlebars');


const client = require('./config/connection');
const view_routes = require('./routes/view_routes');
const user_routes = require('./routes/user_routes');

//create our server
const app = express();
const PORT = 3001;

//create a git route for every file in public
app.use(express.static('./public'));

//allow urlencoded form data to be attached to req.body
app.use(express.urlencoded({ extended: false }))

//load setup handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs')

//load/setup sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        store: new SequelizeStore({
            db: client,
        }),
        saveUninitialized: false,
        resave: false, // we support the touch method so per the express-session docs this should be set to false
        proxy: true, // if you do SSL outside of node.
        cookie: {
            httpOnly: true //this sends a secure cookie that cannot be access by browser.js
        }
    })
);

//load in the routes
app.use('/', [view_routes, user_routes])

// start the server or make the server listen for server-side requests
client.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server started', PORT)
        })
    });
