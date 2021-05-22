const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var bcrypt = require("bcryptjs");

/**
 * common method used for creating new user and signup
 * @param {*} req 
 * @returns 
 */
exports.createUser = (req) => {
    return new Promise((reslove, reject) => {
        try {
            const user = new User({
                username: req.username,
                email: req.email,
                password: bcrypt.hashSync(req.password, 8)
            });
            user.save((err, user) => {
                if (err) {
                    return reject(err);
                }

                if (req.roles) {
                    Role.find(
                        {
                            name: { $in: req.roles }
                        },
                        (err, roles) => {
                            if (err) {
                                return reject(err);
                            }

                            user.roles = roles.map(role => role._id);
                            user.save(err => {
                                if (err) {
                                    return reject(err);
                                }
                                return reslove();
                            });
                        }
                    );
                } else {
                    Role.findOne({ name: "user" }, (err, role) => {
                        if (err) {
                            return reject(err);
                        }

                        user.roles = [role._id];
                        user.save(err => {
                            if (err) {
                                return reject(err);
                            }
                            return reslove();
                        });
                    });
                }
            });
        } catch (ex) {
            console.log(ex);
            return reject(ex);
        }

    })

}