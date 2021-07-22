const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, minlength: 5, maxlength: 20, unique: true, required: true },
  department: { type: String, minlength: 10, maxlength: 255, required: true },
  faculty: { type: String, minlength: 10, maxlength: 255, required: true },
  level: { type: Number, enum: [100, 200, 300, 400, 500, 600], required: true },
  uploadedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  salt: { type: String, minlength: 10, maxlength: 255, required: true },
  hash: { type: String, minlength: 10, maxlength: 255, required: true },
});


module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const validator = require('validator');
// const Schema = mongoose.Schema;
// const userSchema = new Schema({
//    username: {
//        type: String,
//        required: [true, 'Enter a username.'],
//        unique: [true, 'That username is taken.'],
//        lowercase: true,
//        validate: [validator.isAlphanumeric, 'Usernames may only have letters and numbers.']
// },
//     email: {
//           type: String,
//           require: [true, 'Enter an email address.'],
//           unique: [true, 'That email address is taken.'],
//           lowercase: true,
//           validate: [validator.isEmail, 'Enter a valid email address.']
// },
//      password: {
//         type: String,
//         required: [true, 'Enter a password.'],
//         minLength: [4, 'Password should be at least four characters']
// },
//     passwordConfirm: {
//         type: String,
//         required: [true, 'Retype your password.'],
//         validate: {
//             validator: function(el) {
//             return el === this.password;
//         }, message: 'Passwords don\'t match.'
//     }
//   }
// });
// //schema middleware to apply before saving
// userSchema.pre('save', async function(next) {
//     this.password = await bcrypt.hash(this.password, 12);
//     this.passwordConfirm = undefined;
//       next();
// });
// const User = mongoose.model('User', userSchema);
// module.exports = User;