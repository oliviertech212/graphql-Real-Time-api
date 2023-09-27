"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const models_1 = require("../models");
exports.resolvers = {
    Query: {
        users: () => models_1.User.find()
    },
    Mutation: {
        createuser: ({ name, email }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = new models_1.User({ name: name, email: email });
            console.log("user created");
            yield user.save();
            return user;
        })
    }
};
