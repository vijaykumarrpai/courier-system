const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String, required: true},
    emailId: {type: String, required: true},
    mobNumber: {type: Number, required: true},
    password: {type: String, required: true},
    confpassword: {type: String, required: true},
    Address: {type: String, required: true},
    location0: {type: Number, required: true}, // [Lat, Long]
    location1: {type: Number, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
UserSchema.index({location: '2dsphere'});

module.exports = User = mongoose.model("users", UserSchema);