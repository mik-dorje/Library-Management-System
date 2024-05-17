import { PrimitiveTypeLiteral } from "./shared.schema";

export interface IRevalidationPath {
    pathname: string;
    title: string;
    description?: string;
    pathVariables?: {
        name: string;
        label: string;
        dataType: PrimitiveTypeLiteral;
        isSlug: boolean;
    }[];
}
