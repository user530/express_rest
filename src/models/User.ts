import mongoose, { Model } from 'mongoose';
import { UserData } from '../common/types';

const UserSchema = new mongoose.Schema<UserData, Model<UserData>>({
    firstName: {
        type: String,
        required: [true, 'Please, provide users first name!'],
    },
    lastName: {
        type: String,
        required: [true, 'Please, provide users last name!'],
    },
    age: {
        type: Number,
        required: [true, 'Please, provide users age!'],
    },
    position: {
        type: String,
        required: [true, 'Please, provide users position!'],
    },
    contacts: {
        type: {
            email: {
                type: String,
                required: [true, 'Please, provide users email!'],
            },
            phone: {
                type: String,
                required: [true, 'Please, provide users phone!'],
            }
        }
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