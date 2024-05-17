import { useState, useEffect } from "react";
import { ColumnsType } from "antd/es/table";

import { useTitle } from "@/providers/TitleProvider";
import GenericTable from "@/core/components/GenericTable";
import SearchBar from "@/core/components/SearchBar";
import useServerSidePagination from "@/core/components/GenericTable/hooks/useServerSidePagination";

import { Avatar, Button, Flex, Image, Space, Tooltip, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteMemberConfirm from "@/pages/protected/Member/pagess/DeleteMemberConfirm";
import MemberDrawer from "@/pages/protected/Member/pagess/MemberDrawer";
import ContentWrapper from "@/core/components/ContentWrapper";
import { useGetMemberPaginated } from "../api/queries";

const Member = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [memberDrawerOpen, setMemberDrawerOpen] = useState<boolean | string>(
		false,
	);
	const [toBeDeletedMember, setToBeDeletedMember] = useState(null);

	const { setTitle } = useTitle();

	const { initialFilterList, handleServerSideTableChange } =
		useServerSidePagination();

	const { data: memberAuthorData, isFetching: isFetchingMember } =
		useGetMemberPaginated({ ...initialFilterList });

	useEffect(() => {
		setTitle("Member");
		return () => {
			setTitle("");
		};
	}, [setTitle]);

	const columns: ColumnsType<any> = [
		{
			title: "Name",
			key: "name",
			dataIndex: "name",
			fixed: "left",
			render: (_, record) => {
				const profileAvatar = record?.profilePicture?.url;
				return (
					<Flex align="center" gap={4}>
						<Avatar
							src={profileAvatar}
							style={{ border: "1px solid #dfdfdf" }}
						>
							{(record.name || "").charAt(0)}
						</Avatar>
						<Typography.Text>{record.name}</Typography.Text>
					</Flex>
				);
				// return <span className="capitalize">{name}</span>;
			},
		},
		// {
		// 	title: "Description",
		// 	key: "description",
		// 	dataIndex: "description",
		// 	render: (about) => {
		// 		const shortenedAbout =
		// 			about?.split(" ").slice(0, 20).join(" ") || "";
		// 		const isAboutShortened = shortenedAbout.length < about?.length;

		// 		return (
		// 			<p>
		// 				{`${shortenedAbout}${isAboutShortened ? "..." : ""}` ||
		// 					"-"}
		// 			</p>
		// 		);
		// 	},
		// },
		{
			title: "Email",
			key: "email",
			dataIndex: "email",
		},
		{
			title: "Contact No.",
			key: "mobile",
			dataIndex: "mobile",
		},
		{
			title: "Address",
			key: "address",
			dataIndex: "address",
		},
		{
			title: "Rent Count",
			key: "rentedBooks",
			dataIndex: "rentedBooks",
			render: (rentedBooks) => {
				const count = (rentedBooks || []).length || 0;
				return (
					<span>{`
					${count} ${count > 1 ? "Books" : "Book"}`}</span>
				);
			},
		},
		{
			title: "Action",
			key: "action",
			fixed: "right",
			render: (record) => {
				return (
					<Space>
						<Tooltip title="Edit">
							<Button
								type="text"
								shape="circle"
								icon={<EditOutlined />}
								onClick={() => {
									setMemberDrawerOpen(record._id);
								}}
							/>
						</Tooltip>
						<Tooltip title="Delete">
							<Button
								type="text"
								shape="circle"
								icon={<DeleteOutlined />}
								onClick={() => {
									setToBeDeletedMember(record);
								}}
							/>
						</Tooltip>
					</Space>
				);
			},
		},
	];

	// const handleRowClick = (record: IServiceProvider) => {
	// 	navigate(`/service-providers/${record.id}/update`);
	// };

	return (
		<>
			<Flex className="single-book p-6">
				{memberDrawerOpen && (
					<MemberDrawer
						open={memberDrawerOpen}
						setOpen={setMemberDrawerOpen}
					/>
				)}
				<DeleteMemberConfirm
					selectedMember={toBeDeletedMember}
					setSelectedMember={setToBeDeletedMember}
				/>
				<GenericTable
					dataSource={(memberAuthorData?.content || [])?.map(
						(provider: any) => {
							return {
								...provider,
								key: provider.createdAt,
							};
						},
					)}
					columns={columns}
					hasAddBtn
					addBtnText="Add Member"
					addBtnAction={() => setMemberDrawerOpen(true)}
					isLoading={isFetchingMember}
					searchBar={<SearchBar onInputChange={setSearchQuery} />}
					initialFilterList={initialFilterList}
					handleServerSideTableChange={handleServerSideTableChange}
					serverSideDataParams={{
						currentPageIndex: memberAuthorData?.currentPageIndex,
						numberOfElements: memberAuthorData?.numberOfElements,
						totalElements: memberAuthorData?.totalElements,
						totalPages: memberAuthorData?.totalPages,
					}}
				/>
			</Flex>
		</>
	);
};

export default Member;
