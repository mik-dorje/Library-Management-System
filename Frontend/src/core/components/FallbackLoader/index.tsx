import { Spin } from "antd";

import { getComputedClassNames } from "@/utility/tailwind/tailwind-utility";

interface IFallbackLoaderProps {
    className?: string;
}

const FallbackLoader = ({ className }: IFallbackLoaderProps) => {
    return (
        <div
            className={getComputedClassNames(
                "flex items-center justify-center h-screen mx-auto",
                className
            )}
        >
            <Spin size="large" />
        </div>
    );
};

export default FallbackLoader;
