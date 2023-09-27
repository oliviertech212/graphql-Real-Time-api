"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema_1 = require("@graphql-tools/schema");
const typeDef_1 = require("./typeDef");
const resolvers_1 = require("./resolvers");
exports.schema = (0, schema_1.makeExecutableSchema)({
    resolvers: [resolvers_1.resolvers],
    typeDefs: [typeDef_1.typeDefs]
});
