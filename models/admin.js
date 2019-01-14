const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                let nameFormat = /^[a-zA-Z]*$/;
                return nameFormat.test(value);
            },
            message: function(props) {
                return `invalid ${props.path} format`
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                let emailFormat = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/
                return emailFormat.test(value);
            },
            message: function(props) {
                return 'Invalid email format'
            }
        }
    },
    salary: {
        type: Number,
        required: true
    },
    ageWhileJoining: {
        type: Number,
        min: 18,
        max: 65,
        required: true,
        validate: {
            validator: function(value) {
                return (value >= 30 && this.salary <= 20000) ? false : true;
            },
            message: function(props) {
                return 'salary cannot be less than 20000 for employee age > 30';
            }
        }
    },
    skills: [String],
    education:[{
        eduType: {
            type: String,
            enum:['UG', 'PG'],
            required: true
        },
        yearOfPassing: {
            type: Number,
            required: true
        }
    }],
    address: [{
        street: {
            type: String
        },
        state: {
            type: String
        }
    }]
});

adminSchema.methods.shortInfo = function() {
    return {
        _id: this._id,
        name: this.name,
        email: this.email
    }
}

const Admin = mongoose.model('admin', adminSchema);

module.exports = {
    Admin
}
