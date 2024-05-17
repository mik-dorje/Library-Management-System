import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { StyledResult } from "./styles";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div
            className={`flex flex-col items-center justify-center h-[calc(100vh-48px)] space-y-5`}
        >
            <StyledResult
                status="404"
                title="404"
                subTitle="Sorry, the page you have visited does not exist."
            />

            <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
            >
                Go Back
            </Button>
        </div>
    );
};

export default NotFoundPage;
