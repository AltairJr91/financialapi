const userModel = require('../models/User');
const accountModel = require('../models/Account');



const accountTotal = async(req, res) => {
    const account = await accountModel.findById(req.params.id)
};

const accountUpdate = async(req, res) => {

};

const createAccount = async(req, res) => {

};
module.exports = {accountTotal, accountUpdate,createAccount};
