const mongoose = require('../mongoose/index');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
mongoose.model('user', UserSchema);

const User = mongoose.model('user', UserSchema);

module.exports = User;