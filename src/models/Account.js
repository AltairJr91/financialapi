const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
const Account = mongoose.model("Account", bankAccountSchema);

module.exports =  Account ;