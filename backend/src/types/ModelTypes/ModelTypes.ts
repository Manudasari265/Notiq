import { Types, Document } from 'mongoose';

const CONTENT_TYPES = ['image', 'video', 'article', 'audio'] as const;

export interface IUser extends Document {
    _id: Types.ObjectId;
    FirstName?: string;
    LastName?: string;
    username: string;
    password: string;
    email: string;
}

export interface IContent extends Document {
    _id: Types.ObjectId;
    link: string;
    type: typeof CONTENT_TYPES[number]; // Enum restriction
    title?: string;
    tags: Types.ObjectId[];
    userId: Types.ObjectId;
}

export interface ITag extends Document {
    _id: Types.ObjectId;
    title: string;
}

export interface ILink extends Document {
    _id: Types.ObjectId;
    hash: string;
    userId: Types.ObjectId;
}