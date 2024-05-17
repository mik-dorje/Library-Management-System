import { Empty } from "antd";
import { twMerge } from "tailwind-merge";

interface DataUnavailableProps {
    title?: string;
    className?: string;
}

function DataUnavailable(props: DataUnavailableProps): JSX.Element {
    const { title = "No data found", className } = props;

    return (
        <div
            className={twMerge(
                "flex flex-col items-center justify-center",
                className
            )}
        >
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 100 }}
                description=""
            />

            <span className="mt-6 text-sm text-gray-700">{title}</span>
        </div>
    );
}

export default DataUnavailable;
