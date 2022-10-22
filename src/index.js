"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var fs = require("fs");
var json_schema_to_typescript_1 = require("json-schema-to-typescript");
var tiledPropTypes = require("./propertytypes.json");
var enums = tiledPropTypes.filter(function (prop) { return prop.type === "enum"; });
var enumSchemaProperties = enums.reduce(function (prev, _a) {
    var _b;
    var name = _a.name, type = _a.type, values = _a.values;
    return (__assign(__assign({}, prev), (_b = {}, _b[name] = { type: type, "enum": values, tsEnumNames: values.map(function (value) { return value.toString().toUpperCase(); }) }, _b)));
}, {});
var requiredEnums = enums.map(function (item) { return item.name; });
var classes = tiledPropTypes.filter(function (prop) { return prop.type === "class"; });
var classSchemaProperties = classes.reduce(function (prev, _a) {
    var _b;
    var name = _a.name, members = _a.members;
    return (__assign(__assign({}, prev), (_b = {}, _b[name] = {
        type: "object",
        properties: members.reduce(function (prev, member) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[member.name] = { type: member.type.replace("int", "integer") }, _a)));
        }, {}),
        additionalProperties: false
    }, _b)));
}, {});
var requiredClasses = classes.map(function (item) { return item.name; });
var title = "TiledCustomTypes";
var schema = {
    title: title,
    type: "object",
    properties: __assign(__assign({}, enumSchemaProperties), classSchemaProperties),
    required: __spreadArray(__spreadArray([], requiredEnums, true), requiredClasses, true),
    additionalProperties: false
};
(0, json_schema_to_typescript_1.compile)(schema, title).then(function (ts) { return fs.writeFileSync("".concat(title, ".d.ts"), ts); });
