import { FC, PropsWithChildren, Suspense } from "react";

import FallbackLoader from "@/core/components/FallbackLoader";

const RouteProvider: FC<PropsWithChildren> = ({ children }) => {
    return <Suspense fallback={<FallbackLoader />}>{children}</Suspense>;
};

export default RouteProvider;
