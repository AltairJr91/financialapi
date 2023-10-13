const UserModel = require('../models/User')

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

const getUsers = async(req,res)=>{
    const getListOfUser = await UserModel.find();
    return res.status(200).json(getListOfUser)
}



module.exports = { newUser,getUsers }