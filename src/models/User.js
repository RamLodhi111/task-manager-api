const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey=process.env.JWT_SECRET_KEY;
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        lowercase: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 12) {
                throw new Error('Age must be a positive number, gteater than 12')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required:true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, secretKey, { expiresIn: '1 hours' });
    user.tokens = user.tokens.concat({token:token});
    await user.save();
    return token;
}


//We can give any name here (findByCrendettials) and attach to model whenevr want to execute this
//statics are Model level acceesible , methods(above) are object of model level accessible
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login')
    }
    console.log(password);
    console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        // throw new Error('Unable to login')
    }
    return user;
}

//Hash the plain text password before saving to DB
//Not using arrow function shorthand as it not allow reference to this
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('Users', userSchema);

//
module.exports = User;