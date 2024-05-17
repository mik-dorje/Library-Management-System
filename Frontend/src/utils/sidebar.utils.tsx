import { MenuProps } from "antd";
import { protectedRoutePaths, routePaths } from "@/router";
import { LuBookMarked, LuGroup, LuLayoutDashboard } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiExchangeFundsFill } from "react-icons/ri";
import { SiCkeditor4 } from "react-icons/si";

type MenuItem = Required<MenuProps>["items"][number];

function getSidebarItem(
	label: React.ReactNode,
	key: ValueOf<typeof routePaths>,
	icon?: any,
	children?: MenuItem[] | null,
	type?: "group",
): MenuItem | null {
	return {
		label,
		key,
		icon,
		children,
		type,
	} as MenuItem;
}

export const getSidebarItems = (): MenuProps["items"] => {
	return [
		getSidebarItem(
			"Dashboard",
			protectedRoutePaths.testDashboard,
			<LuLayoutDashboard size={18} />,
		),
		getSidebarItem(
			"Book",
			routePaths.book.bookList,
			<LuBookMarked size={17} />,
		),
		getSidebarItem(
			"Category",
			routePaths.bookCategory,
			<LuGroup size={15} />,
		),
		getSidebarItem(
			"Author",
			routePaths.author,
			<LiaUserEditSolid size={17} />,
		),
		getSidebarItem(
			"Member",
			routePaths.member,
			<FaRegCircleUser size={18} />,
		),
		getSidebarItem(
			"Book Transaction",
			protectedRoutePaths.transaction.transactionList,
			<RiExchangeFundsFill size={18} />,
		),
		getSidebarItem(
			"Editor Playground",
			protectedRoutePaths.editorPlayground,
			<SiCkeditor4 size={18} />,
		),
	];
};
