import { Primitive } from "./http.schema";

export type PrimitiveTypeLiteral = "string" | "number" | "boolean";

export enum PaginatedDataFilterFieldTypeEnum {
    INPUT = "INPUT",
    SELECT = "SELECT",
    DATE = "DATE",
    RANGE = "RANGE",
}

export interface IPaginatedDataFilterField {
    type: PaginatedDataFilterFieldTypeEnum;
    name?: string;
    label?: string;
    mode?: "multiple" | "tags" | undefined;
    options?: { label: string; value: Primitive }[];
}
