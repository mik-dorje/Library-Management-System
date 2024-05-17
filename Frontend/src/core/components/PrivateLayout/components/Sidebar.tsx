import { useContext, useMemo } from "react";
import Sider from "antd/es/layout/Sider";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Flex, theme } from "antd";
import { twMerge } from "tailwind-merge";

import { SidebarContext } from "@/providers/SidebarProvider";
import { getComputedPath, protectedRoutePaths } from "@/router";
import { getSidebarItems } from "@/utils/sidebar.utils";
import PrimarySearch from "@/core/PrimarySearch";

import { activeRoutesInfo } from "../utils/sidebar.utils";
import { StyledMenu } from "../styles";

import Logo from "../../Logo";
import SidebarToggler from "./SidebarToggler";

const Sidebar = () => {
	const { isCollapsed, toggleIsCollapsed } = useContext(SidebarContext);

	const navigate = useNavigate();
	const params = useParams();
	const location = useLocation();

	const { useToken } = theme;
	const { token } = useToken();

	const activeMenuKey = useMemo(() => {
		let activeRoutePath = "";

		// eslint-disable-next-line no-restricted-syntax
		for (const routeInfo of activeRoutesInfo) {
			if (activeRoutePath) {
				break;
			}

			const activePath = routeInfo.activeRoutePaths.find(
				(path: string) => {
					return (
						getComputedPath({ path, params }) === location.pathname
					);
				},
			);

			if (activePath) {
				activeRoutePath = routeInfo.base;
			}
		}

		return activeRoutePath;
	}, [params, location]);

	return (
		<Sider
			trigger={null}
			collapsible
			collapsed={isCollapsed}
			// bg-gray-200
			className="relative h-[100vh]  py-3 shadow"
			theme="dark"
			width={`clamp(220px, 13.36%, 256px)`}
		>
			<div className="absolute -right-3 top-3">
				<SidebarToggler />
			</div>
			<Flex
				className="mx-auto mb-2 cursor-pointer  px-4"
				justify="center"
			>
				<Logo />
			</Flex>

			{/* <div
				className={twMerge(
					"mb-2 w-fit cursor-pointer px-3 bg-white",
					isCollapsed && "mx-auto",
				)}
				onClick={() => navigate(protectedRoutePaths.base)}
			>
				<Logo />
			</div> */}

			<div className="space-y-2 px-1">
				{!isCollapsed && (
					<div className="px-1">
						<PrimarySearch />
					</div>
				)}

				<StyledMenu
					mode="inline"
					className="border-none bg-transparent"
					onClick={({ key }) => {
						navigate(key);
					}}
					items={getSidebarItems()}
					selectedKeys={[activeMenuKey]}
					token={token}
					inlineCollapsed={isCollapsed}
				/>
			</div>
		</Sider>
	);
};

export default Sidebar;
