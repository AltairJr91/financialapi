const userModel = require('../models/User');
const accountModel = require('../models/Account');



const accountListFromUser = async (req, res) => {

    try {
        const account = await accountModel.find().populate('user');

        if (!account) {
            res.status(400).json({ message: "Account not found!" })
        }

        return res.status(200).json(account);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const userAccounts = async (req, res) => {

    try {
        const user = await userModel.findById({ _id: req.userId }).populate('bankAccounts');
        if (!user) {
            res.status(400).json({ message: "User not found!" })
        }
        if (!user.bankAccounts || user.bankAccounts.length === 0) {
            return res.status(404).json({ error: 'Bank accounts not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const accountUpdate = async (req, res) => {
    const { method, value, accountId } = req.body;

    try {
        const account = await accountModel.findById(accountId);
        if (!account) {
            return res.status(404).json({ error: 'Bank account not found' });
        };


        if (method === 'deposit') {
            account.balance += value;
        } else if (method === 'withdraw') {
            if (account.balance < value) {
                return res.status(400).json({ error: 'Insufficient funds' });
            }
            account.balance -= value;
        } else {
            return res.status(400).json({ error: 'Invalid method' });
        };

        await account.save();

        return res.status(200).json({
            message: "Account updated with success",
            Account: account
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const createAccount = async (req, res) => {
    try {
        const id = req.userId;
        let user = await userModel.findById({ _id: id });

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
            user: { _id: user.id }
        })

        user.bankAccounts.push(newBankAccount._id);
        await user.save();

        return res.status(201).json({
            message: "Account created with success",
            Account: newBankAccount
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const accountSelected = async (req, res) => {
    const accountId = req.params.id
    try {
        const singleAccount = await accountModel.findById({ _id: accountId }).populate('user');
        if (!singleAccount) {
            res.status(400).json({ message: "Account not found!" })
        }

        return res.status(200).json(singleAccount);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const deleteAccount = async (req, res) => {
    const accountId = req.params.id
    try {
        const account = await accountModel.findById(accountId);
        
        if (!account) {
            res.status(400).json({ message: "Account not found!" });
        } else if (account.balance > 0) {
            res.status(400).json({ message: "Account has a balance. Cannot delete." });
        } else {
            const deleteAccount = await accountModel.findByIdAndRemove(accountId);
            if (deleteAccount) {
                res.json({ message: "Account deleted successfully" });
            } else {
                res.status(400).json({ message: "Failed to delete the account" });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { userAccounts, accountUpdate, createAccount, accountListFromUser, accountSelected, deleteAccount };
