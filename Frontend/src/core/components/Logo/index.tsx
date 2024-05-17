import { Image } from "antd";

import logo from "@/assets/images/libraryLogo.png";

interface ILogoProps {
	width?: number;
}

const Logo = ({ width }: ILogoProps) => {
	return (
		<Image
			src={logo}
			alt="logo"
			width={width || 50}
			preview={false}
			className="rounded-[50%] bg-white"
		/>
	);
};

export default Logo;
