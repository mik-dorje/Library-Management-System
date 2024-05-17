import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ButtonType } from "antd/es/button";
import { useNavigate } from "react-router-dom";

interface IBackButtonProps {
	type?: ButtonType;
}

const BackButton = ({ type }: IBackButtonProps) => {
	const navigate = useNavigate();

	return (
		<Button
			icon={<ArrowLeftOutlined />}
			type={type || "text"}
			onClick={() => navigate(-1)}
			style={{
				color: "white",
			}}
			size="small"
		>
			Back
		</Button>
	);
};

export default BackButton;
