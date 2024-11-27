import mongoose, { Schema, Types } from "mongoose";
import { ITag, IUser, IContent, ILink } from "../types/ModelTypes/ModelTypes";
import dotenv from 'dotenv';

const ObjectId = mongoose.Types.ObjectId;

const CONTENT_TYPES = ['image', 'video', 'article', 'audio'];

const dbUrl = process.env.DATABASE_URL;

dotenv.config();
mongoose.connect(dbUrl as string);

export const UserSchema: Schema<IUser> = new Schema({
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

export const ContentSchema: Schema<IContent> = new Schema({
    link: { type: String, required: true },
    type:  { 
        type: String, 
        enum: CONTENT_TYPES, 
        required: true, 
    },
    title: String,
    tags: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Tag' 
    }],
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
});

export const TagSchema: Schema<ITag> = new Schema({
    // _id: ObjectId,
    title:  { 
        type: String, 
        required: true, 
        unique: true 
    },
})

export const LinkSchema: Schema<ILink> = new Schema({
    hash:  { 
        type: String, 
        required: true, 
    },
    userId:  { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
})

export const TagModel = mongoose.model<ITag>("Tag", TagSchema);
export const UserModel = mongoose.model<IUser>("User", UserSchema);
export const ContentModel = mongoose.model<IContent>("Content", ContentSchema);
export const LinkModel = mongoose.model<ILink>("Links", LinkSchema);
