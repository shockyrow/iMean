// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	email    : String,
	fullname : String,
	username : String,
	password : String,
	usertype : String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

// define our users model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('users', userSchema);
