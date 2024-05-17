import styled from "styled-components";
import { GlobalToken, Menu } from "antd";

export const MenuWrapper = styled.div`
	.ant-menu-submenu-title {
		color: #a62a22 !important;
	}

	.ant-menu-item-selected {
		color: #a62a22 !important;
	}

	.ant-menu-item:hover {
		color: #a62a22 !important;
	}
`;

interface IStyledMenuProps {
	token: GlobalToken;
}

export const StyledMenu = styled(Menu)<IStyledMenuProps>`
	.ant-menu-item {
		padding-left: 18px !important;
		padding-right: 18px !important;
		color: white !important;

		&:hover {
			color: white !important;
			background-color: ${({ token }) => token.colorPrimary} !important;
		}
	}

	.ant-menu-submenu-title {
		padding-left: 18px !important;
		padding-right: 18px !important;
	}

	.ant-menu-item-selected {
		color: white !important;
		background-color: ${({ token }) => token.colorPrimary} !important;
	}
`;
