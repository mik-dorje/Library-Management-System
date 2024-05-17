import { Button, Image } from "antd";

import errorVector from "@/assets/vectors/error.svg";

const ErrorBoundary = () => {
    return (
        <div className="flex h-[500px] flex-col items-center justify-center space-y-3">
            <div className="flex flex-col items-center space-y-1">
                <Image
                    src={errorVector}
                    alt="error"
                    height={200}
                    width={200}
                    preview={false}
                />

                <h3 className="text-3xl font-semibold text-primary">
                    Something went wrong !
                </h3>

                <p className="text-gray-700">
                    Oops, looks like we are facing some problems. Please check
                    in later.
                </p>
            </div>

            <Button
                type="primary"
                className="w-fit"
                onClick={() => window.location.reload()}
            >
                Refresh Page
            </Button>
        </div>
    );
};

export default ErrorBoundary;
