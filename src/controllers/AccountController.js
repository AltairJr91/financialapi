const userModel = require('../models/User');
const accountModel = require('../models/Account');



const accountTotal = async (req, res) => {
    const accountId = req.params.id;
    try {
        const account = await accountModel.findById(accountId);

        if (!account) {
            return res.status(404).json({ error: 'Bank account not found' });
        }
        return res.status(200).json({
            balance: account.balance
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const accountUpdate = async (req, res) => {
    const accountId = req.params.id;
    const { method, value } = req.body;

    try {
        const account = await accountModel.findById(accountId);

        if (!account) {
            return res.status(404).json({ error: 'Bank account not found' });
        }

        async function updateAccount(account) {
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
        }
 
        return res.json({
            balance: updateAccount(account),
            message: 'Bank balance has been updated successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const createAccount = async (req, res) => {
    try {
        const id = req.params.id;
        let user = await userModel.findOne({ id });
        if (!user) {
            res.status(400).json({ message: "User not found!" })
        }

        const newAccountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

        const existingAccount = await accountModel.findOne({ newAccountNumber });
        if (existingAccount) {
            res.status(400).json({ message: "Error while create account try again!" })
        }

        const newBankAccount = await accountModel.create({
            accountNumber: newAccountNumber,
            user: user._id
        })

        return res.status(201).json({
            message: "Account created with success",
            Account: newBankAccount
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
module.exports = { accountTotal, accountUpdate, createAccount };
