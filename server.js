const express = require("express");
const bodyParser = require("body-parser");
//const cors = require("cors");
const app = express();

// var corsOptions = {
//     origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const dbConfig=require("./config/db.config")
const db = require("./models");
const Role = db.role;
const User = db.user;
const common = require('./lib/common');
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
                User.estimatedDocumentCount((e, count) => {
                    if (!e && count == 0) {

                        common.createUser({
                            username: "adminUser",
                            email: "admin@chaturdev.com",
                            password: "admin@123",
                            roles: ["admin"]
                        }).then((r) => {
                            console.log("sample admin is created");
                        }, (er) => {
                            console.log("error", er);
                        })

                    }
                })
            });
        }
    });


}
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});


// routes
require('./routes/auth.route')(app);
require('./routes/user.route')(app);
// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});