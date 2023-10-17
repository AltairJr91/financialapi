const mongoose = require('../database')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,

    },
    bankAccounts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Account',
        },
      ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


UserSchema.pre("save", async function(next){
    const cryptpassword = await bcrypt.hash(this.password , 8)
    this.password = cryptpassword;
})
const User = mongoose.model("User",UserSchema)

module.exports = User;