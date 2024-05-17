import { PropsWithChildren } from "react";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { QueryClientProvider } from "@tanstack/react-query";

import { customTheme } from "../config/theme.config";
import queryClient from "../config/react-query.config";

import SidebarProvider from "./SidebarProvider";
import TitleProvider from "./TitleProvider";
import AuthProvider from "./AuthProvider";

const AppProvider = ({ children }: PropsWithChildren) => {
	return (
		<ConfigProvider theme={customTheme}>
			<StyleProvider hashPriority="high">
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<TitleProvider>
							<SidebarProvider>{children}</SidebarProvider>
						</TitleProvider>
					</AuthProvider>
				</QueryClientProvider>
			</StyleProvider>
		</ConfigProvider>
	);
};

export default AppProvider;
