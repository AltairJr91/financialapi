const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User')

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })

    try {
        if (!user) {
            res.status(400).json({
                message: "User not found!"
            })
        }
const matchPassword = await bcrypt.compare(password, user.password)

        if (!matchPassword) {
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

module.exports = {login} 