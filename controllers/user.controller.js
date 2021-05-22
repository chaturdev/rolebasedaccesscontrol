const common = require("../lib/common");

exports.createUser = async(req, res) => {

    try {
        let u = await common.createUser({
            username: req.body.username,
            email: req.body.email,
            password:req.body.password,
            roles: req.body.roles
        });
        res.send({ message: "User was registered successfully!" });
        return;
    } catch (ex) {
        res.status(500).send({ message: ex });
        return;
    }
}