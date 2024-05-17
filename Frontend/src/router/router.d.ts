/* eslint-disable @typescript-eslint/naming-convention */
import * as ReactRouterDom from "react-router-dom";

import { protectedRoutePath, publicRoutePath } from "@/router/routes";

declare module "react-router-dom" {
    export type RouteType = "protected" | "public";

    export interface _RouteObject<Type extends RouteType>
        extends Omit<ReactRouterDom.RouteObject, "path" | "index"> {
        path:
            | ValueOf<
                  Type extends "protected"
                      ? typeof protectedRoutePath
                      : typeof publicRoutePath
              >
            | "*";
    }
}
