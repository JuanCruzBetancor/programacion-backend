import mongoose from 'mongoose';

const msgSchema = new mongoose.Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
});

export const MessagesModel = mongoose.model(
    'messages',
    msgSchema 
);