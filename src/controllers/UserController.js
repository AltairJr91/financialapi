const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()


const newUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (await UserModel.findOne({ email })) {
        return res.status(400).json("User Already Created")
    }

    const storeUser = await UserModel.create({ name, email, password })
    if (!storeUser) {
        return res.status(404).json("Fail to create user")
    }
    return res.status(201).json({ message: "User Created with success" })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })

    try {
        if (!user) {
            res.status(400).json({
                message: "User not found!"
            })
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                message: "Invalid Password"
            })
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400
          })
        return res.status(201).json({
            name: user.name,
            token:token
        })
    } catch (error) {
        console.log(error);
    }


}


module.exports = { newUser, login }