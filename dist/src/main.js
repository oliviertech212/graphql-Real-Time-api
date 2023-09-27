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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const graphql_yoga_1 = require("graphql-yoga");
const schema_1 = require("./schema");
const mongoose_1 = __importDefault(require("mongoose"));
const context_1 = require("./context");
const dotenv = require('dotenv');
dotenv.config();
const db = process.env.DB || "";
console.log("Creating", db);
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return mongoose_1.default.connect(db);
    }
    catch (error) {
        console.log(`Database connection error: ${error}`);
        process.exit(1);
    }
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const yoga = (0, graphql_yoga_1.createYoga)({ schema: schema_1.schema, context: context_1.createContext });
        const server = (0, http_1.createServer)(yoga);
        connect().then(() => server.listen(4000, () => {
            console.info('Server is running on http://localhost:4000/graphql');
        }));
    });
}
main();
