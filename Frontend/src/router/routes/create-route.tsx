import React from "react";

import type { RouteType, _RouteObject } from "@/router";
import ErrorBoundary from "@/core/components/ErrorBoundary";
import RouteProvider from "@/providers/RouteProvider";

export interface CreateRoute<Type extends RouteType>
    extends Omit<_RouteObject<Type>, "element"> {
    element: React.LazyExoticComponent<React.FC>;
    type?: RouteType;
}

export function createRoute<Type extends RouteType = "protected">(
    args: CreateRoute<Type>
): _RouteObject<Type> {
    return {
        ...args,
        element: (
            <RouteProvider>
                <args.element />
            </RouteProvider>
        ),
        errorElement: <ErrorBoundary />,
    } as const;
}
