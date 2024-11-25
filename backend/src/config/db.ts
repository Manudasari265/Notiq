import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const ContentTypes = ['image', 'video', 'article', 'audio'];

const UserSchema = new Schema({
    _id: ObjectId,
    FirstName: String,
    LastName: String,
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email:  { 
        type: String, 
        required: true, 
        unique: true 
    },
})

const ContentSchema = new Schema({
    _id: ObjectId,
    link: String,
    type:  { 
        type: String, 
        enum: ContentTypes, 
        required: true, 
        unique: true 
    },
    title: String,
    tags: { 
        type: Types.ObjectId, 
        ref: 'Tag' 
    },
    userId: { 
        type: Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
});

const TagSchema = new Schema({
    _id: ObjectId,
    title:  { 
        type: String, 
        required: true, 
        unique: true 
    },
})

const LinkSchema = new Schema({
    hash:  { 
        type: String, 
        required: true 
    },
    userId:  { type: Types.ObjectId, ref: 'User', required: true },
})

export const Tag = mongoose.model('Tag', TagSchema);
export const User = mongoose.model('User', UserSchema);
export const Content = mongoose.model('Content', ContentSchema);
export const Link = mongoose.model('Link', LinkSchema);