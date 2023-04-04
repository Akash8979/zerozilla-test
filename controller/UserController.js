const user = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userService = require("../services/UserService")
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}
exports.createUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const data = {
            name,
            email,
            password
        }
        /**
          * Here we are validating Fuel Dispences  data
          */
        const ValidateData = await userService.validateUserData({
            data,
        });

        if (!ValidateData.status)
            return res.send({
                status: 0,
                message: ValidateData.message,
            });

        const hashedPassword = await hashPassword(password);
        const userData = await user.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        return res.send({
            status: 1,
            message: "success",
            data: userData
        });
    } catch (error) {
        return res.send({
            status: 0,
            message: error.message,

        });
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await user.findOne({
            email: email
        });
        // check email exist
        if (!userData) {
            let obj = {
                username: "Email id does not exist",
                password: null,
            };

            return res.json({
                status: 0,
                message: obj,
            });
        };
        // validate password
        const validPassword = await validatePassword(password, userData.password);
        if (!validPassword) {
            let obj = {
                username: null,
                password: "Please enter valid details",
            };
            return res.json({
                status: 0,
                message: obj,
            });
        };
        const id = userData.email;
        let JWT_SECRET = "bfnvjfcsdkbsdkjcv";
        const accessToken = jwt.sign({ id }, process.env.JWT_SECRET || JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: "1d",
        });
        await user.findOneAndUpdate({ email: email }, {
            accessToken: accessToken,
        });
        const resultData = await user.findOne({
            email: email
        });
        return res.json({
            status: 1,
            data: {
                email: resultData.email,
                name: resultData.name,
                accessToken: resultData.accessToken
            },
        });
    } catch (error) {
        return res.send({
            status: 0,
            message: error.message
        });
    }
};