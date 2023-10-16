const userModel = require('../models/User');
const accountModel = require('../models/Account');



const accountTotal = async (req, res) => {
    const account = await accountModel.findById(req.params.id)
};

const accountUpdate = async (req, res) => {
    const accountId = req.params.id;
    const { method, value } = req.body;

    try {
        const account = await accountModel.findById(accountId);

        if (!account) {
            return res.status(404).json({ error: 'Bank account not found' });
        }

        if (method === 'deposit') {
            account.balance += value;
        } else if (method === 'withdraw') {
            if (account.balance < value) {
                return res.status(400).json({ error: 'Insufficient funds' });
            }
            account.balance -= value;
        } else {
            return res.status(400).json({ error: 'Invalid method' });
        }

        await account.save();

        return res.json({
            balance: account.balance,
            message: 'Bank balance has been updated successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const createAccount = async (req, res) => {

};
module.exports = { accountTotal, accountUpdate, createAccount };
