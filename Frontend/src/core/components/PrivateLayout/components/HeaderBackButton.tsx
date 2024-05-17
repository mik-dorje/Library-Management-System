import { useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";

import { getComputedPath } from "@/router";

import { routePathsWithBackButton } from "../utils/header.utils";

import BackButton from "../../BackButton";

const HeaderBackButton = () => {
    const params = useParams();
    const location = useLocation();

    const showBackButton = useMemo(() => {
        return routePathsWithBackButton.find(
            (route) =>
                getComputedPath({ path: route as string, params }) ===
                location.pathname
        );
    }, [location, params]);

    if (showBackButton) {
        return <BackButton />;
    }

    return null;
};

export default HeaderBackButton;
