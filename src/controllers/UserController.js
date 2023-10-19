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

const getUsers = async (req, res) => {
    const getListOfUser = await UserModel.find();
    return res.status(200).json(getListOfUser)
}

const updateUser = async (req, res) => {
    const { id } = req.userId;
    const { name, email, password } = req.body;
    const updateUser = await UserModel.findByIdAndUpdate({ _id: id }, { name, email, password });
    if (!updateUser) {
        return res.status(404).json("Fail to update user")
    }
    return res.status(201).json({ message: "User Updated with success" })

}

const deleteUser = async (req, res) => {
    const { id } = req.userId;
    const deleteUser = await UserModel.findByIdAndDelete({ _id: id });
    if (!deleteUser) {
        return res.status(404).json("Fail to delete user")
    }
    return res.status(201).json({ message: "User Deleted with success" })
}



module.exports = { newUser, getUsers, updateUser, deleteUser }