import mongoose, { Model } from 'mongoose';
import { UserData } from '../common/types';

const UserSchema = new mongoose.Schema<UserData, Model<UserData>>({
    firstName: {
        type: String,
        required: [true, 'Please, provide users first name!'],
        match: [
            /^[a-zA-ZЁёА-я]{2,20}$/,
            "First name should contain only letters, and be between 2 and 20 letters long",
        ],
    },
    lastName: {
        type: String,
        required: [true, 'Please, provide users last name!'],
        match: [
            /^[a-zA-ZЁёА-я]{2,20}$/,
            "Last name should contain only letters, and be between 2 and 20 letters long",
        ],
    },
    age: {
        type: Number,
        required: [true, 'Please, provide users age!'],
        min: [0, `Age can't be less than 14!`],
        max: [100, `Are you sure you are more than 100 yers old?`],
    },
    position: {
        type: String,
        required: [true, 'Please, provide users position!'],
    },
    email: {
        type: String,
        required: [true, 'Please, provide users email!'],
        unique: true,
        // unique: [
        //     true,
        //     "Email is already in use! Please, use the different email!",
        // ],
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Invalid email format! Please check user email!",
        ],
    },
    phone: {
        type: String,
        required: [true, 'Please, provide users phone!'],
        unique: true,
        // unique: [
        //     true,
        //     "Phone number is already in use! Please, use the different phone number!",
        // ],
        match: [
            /^\d{11}$/,
            "Phone number should consist of 11 numbers!",
        ],
    },
    bio: {
        type: String,
        required: [true, 'Please, provide information about the user!'],
    },
    photoUrl: {
        type: String,
        default: 'https://placehold.co/300x300'
    }
},
    {
        timestamps: true,
    }
)

export const UserModel = mongoose.model('User', UserSchema);