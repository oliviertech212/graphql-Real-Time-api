"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require('mongoose');
const { Schema } = require("mongoose");
exports.User = new mongoose.model('User', {
    name: {
        required: true,
        type: "string",
    },
    email: {
        required: true,
        type: "string",
        unique: true
    }
});
const message = new Schema({
    message: "string",
    senderEmail: "string",
    receiverEmail: "string",
    timestamps: "number"
});
module.exports = mongoose.model('Message', message);
