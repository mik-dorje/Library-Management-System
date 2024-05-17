import { Suspense, useContext, useEffect } from "react";
import { Layout, Spin, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { SidebarContext } from "@/providers/SidebarProvider";
import { protectedRoutePaths } from "@/router";

import Sidebar from "./components/Sidebar";
import CustomHeader from "./components/Header";

const { useToken } = theme;

function PrivateLayout() {
	const { showSidebar, showHeader } = useContext(SidebarContext);

	const navigate = useNavigate();
	const location = useLocation();

	const { token } = useToken();

	useEffect(() => {
		if (location.pathname === "/") {
			navigate(protectedRoutePaths.testDashboard);
		}
	}, [navigate, location]);

	return (
		<Layout className="h-full" style={{ fontFamily: token.fontFamily }}>
			{showSidebar && <Sidebar />}

			<Layout>
				{showHeader && <CustomHeader />}

				<Layout>
					<Content
						style={{
							height: "calc(100vh - 48px)",
							overflow: "auto",
							// backgroundColor: "#e9ecef",
						}}
					>
						<Suspense
							fallback={
								<div
									style={{
										display: "grid",
										placeItems: "center",
										minHeight: "calc(100vh - 80px)",
									}}
								>
									<Spin />
								</div>
							}
						>
							<Outlet />
						</Suspense>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}

export default PrivateLayout;
