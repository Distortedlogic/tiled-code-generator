import * as fs from "fs";
import { JSONSchema4 } from "json-schema";
import { compile } from "json-schema-to-typescript";

import * as tiledPropTypes from "./propertytypes.json";

export interface ITiledEnumFormat {
  id: number;
  name: string;
  storageType: string;
  type: "enum";
  values: number[] | string[];
  valuesAsFlags: boolean;
}

interface ITiledClassFormat {
  color: string;
  id: number;
  members: {
    name: string;
    type: string;
    value: any;
  }[];
  name: string;
  type: "class";
  useAs: string[];
}

const enums = tiledPropTypes.filter((prop) => prop.type === "enum") as ITiledEnumFormat[];
const enumSchemaProperties = enums.reduce(
  (prev, { name, type, values }) => ({
    ...prev,
    [name]: { type, enum: values, tsEnumNames: values.map((value) => value.toString().toUpperCase()) },
  }),
  {}
);
const requiredEnums = enums.map((item) => item.name);
const classes = tiledPropTypes.filter((prop) => prop.type === "class") as ITiledClassFormat[];
const classSchemaProperties = classes.reduce(
  (prev, { name, members }) => ({
    ...prev,
    [name]: {
      type: "object",
      properties: members.reduce((prev, member) => ({ ...prev, [member.name]: { type: member.type.replace("int", "integer") } }), {}),
      additionalProperties: false,
    } as JSONSchema4,
  }),
  {}
);
const requiredClasses = classes.map((item) => item.name);
const title = "TiledCustomTypes";
const schema: JSONSchema4 = {
  title,
  type: "object",
  properties: { ...enumSchemaProperties, ...classSchemaProperties },
  required: [...requiredEnums, ...requiredClasses],
  additionalProperties: false,
};
compile(schema, title).then((ts) => fs.writeFileSync(`${title}.d.ts`, ts));
