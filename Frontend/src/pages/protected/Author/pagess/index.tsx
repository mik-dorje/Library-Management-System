import { useState, useEffect } from "react";
import { ColumnsType } from "antd/es/table";

import { useTitle } from "@/providers/TitleProvider";
import GenericTable from "@/core/components/GenericTable";
import { IServiceProvider } from "@/schema/service-provider.schema";
import SearchBar from "@/core/components/SearchBar";
import useServerSidePagination from "@/core/components/GenericTable/hooks/useServerSidePagination";

import { Avatar, Button, Flex, Image, Space, Tooltip, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AuthorDrawer from "@/pages/protected/Author/pagess/AuthorDrawer";
import DeleteAuthorConfirm from "@/pages/protected/Author/pagess/DeleteAuthorConfirm";
import ContentWrapper from "@/core/components/ContentWrapper";
import { useGetAuthorPaginated } from "../api/queries";

const Author = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [authorDrawerOpen, setAuthorDrawerOpen] = useState<boolean | string>(
		false,
	);
	const [toBeDeletedAuthor, setToBeDeletedAuthor] = useState(null);

	const { setTitle } = useTitle();

	const { initialFilterList, handleServerSideTableChange } =
		useServerSidePagination();

	const { data: categoryPageData, isFetching: isFetchingCategory } =
		useGetAuthorPaginated({ ...initialFilterList });

	useEffect(() => {
		setTitle("Author");
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
									setAuthorDrawerOpen(record._id);
								}}
							/>
						</Tooltip>
						<Tooltip title="Delete">
							<Button
								type="text"
								shape="circle"
								icon={<DeleteOutlined />}
								onClick={() => {
									setToBeDeletedAuthor(record);
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
				{authorDrawerOpen && (
					<AuthorDrawer
						open={authorDrawerOpen}
						setOpen={setAuthorDrawerOpen}
					/>
				)}
				<DeleteAuthorConfirm
					selectedCategory={toBeDeletedAuthor}
					setSelectedCategory={setToBeDeletedAuthor}
				/>
				<GenericTable
					dataSource={(categoryPageData?.content || [])?.map(
						(provider: any) => {
							return {
								...provider,
								key: provider.createdAt,
							};
						},
					)}
					columns={columns}
					hasAddBtn
					addBtnText="Add Author"
					addBtnAction={() => setAuthorDrawerOpen(true)}
					isLoading={isFetchingCategory}
					searchBar={<SearchBar onInputChange={setSearchQuery} />}
					initialFilterList={initialFilterList}
					handleServerSideTableChange={handleServerSideTableChange}
					serverSideDataParams={{
						currentPageIndex: categoryPageData?.currentPageIndex,
						numberOfElements: categoryPageData?.numberOfElements,
						totalElements: categoryPageData?.totalElements,
						totalPages: categoryPageData?.totalPages,
					}}
				/>
			</Flex>
		</>
	);
};

export default Author;
