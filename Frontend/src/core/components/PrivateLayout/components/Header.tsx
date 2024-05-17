import { Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";

import { useTitle } from "@/providers/TitleProvider";
import PrimarySearch from "@/core/PrimarySearch";
import { useSidebar } from "@/providers/SidebarProvider";

import HeaderBackButton from "./HeaderBackButton";
import ProfilePreview from "../../ProfilePreview";

const CustomHeader = () => {
	const { title } = useTitle();
	const { isCollapsed } = useSidebar();

	return (
		<Header className="border-gray-10 flex h-[48px] items-center justify-between border-b  bg-[#001529] px-6">
			<div className="flex items-center space-x-3">
				<HeaderBackButton />

				{title && (
					<h5 className="font-semibold capitalize text-white">
						{title}
					</h5>
				)}
			</div>

			<div className="flex items-center space-x-5">
				{isCollapsed && (
					<div className="w-[300px]">
						<PrimarySearch />
					</div>
				)}
				<Button
					icon={<BellOutlined />}
					type="text"
					className="text-white"
				/>

				<ProfilePreview />
			</div>
		</Header>
	);
};

export default CustomHeader;
