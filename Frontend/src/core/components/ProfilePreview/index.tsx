import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown, MenuProps, Space, theme } from "antd";
import { twMerge } from "tailwind-merge";
import { CgChevronDown } from "react-icons/cg";

import { useAuth } from "@/providers/AuthProvider";

const ProfilePreview = () => {
	const navigate = useNavigate();

	const { authUser, signUserOut } = useAuth();

	const { useToken } = theme;
	const { token } = useToken();

	//   const { data: myProfileData, isLoading: isFetchingProfile } =
	//     useGetMyProfile(isAuthenticated)

	const profileItems: MenuProps["items"] = [
		{
			key: "1",
			label: "My profile",
			onClick: () => {
				navigate("/profile/edit-profile");
			},
		},
		{
			key: "2",
			label: "Sign out",
			onClick: signUserOut,
		},
	];

	return (
		<Dropdown
			className="cursor-pointer"
			menu={{ items: profileItems }}
			trigger={["click"]}
		>
			<Space
				size={10}
				style={{
					display: "flex",
					alignItems: "center",
					padding: "8px 0px",
				}}
			>
				<Avatar
					style={{
						background: token.colorPrimary,
						height: 32,
						width: 32,
					}}
				>
					<span>
						{/* {(myProfileData?.data?.fullName || '')?.charAt(0)?.toUpperCase()} */}
						{authUser?.email?.charAt(0)?.toUpperCase()}
					</span>
				</Avatar>

				<CgChevronDown size={18} className={"text-white"} />
			</Space>
		</Dropdown>
	);
};

export default ProfilePreview;
