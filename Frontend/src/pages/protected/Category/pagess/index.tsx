import { useState, useEffect } from "react";
import { ColumnsType } from "antd/es/table";

import { useTitle } from "@/providers/TitleProvider";
import GenericTable from "@/core/components/GenericTable";
import { IServiceProvider } from "@/schema/service-provider.schema";
import SearchBar from "@/core/components/SearchBar";
import useServerSidePagination from "@/core/components/GenericTable/hooks/useServerSidePagination";

import CategoryDrawer from "@/pages/protected/Category/pagess/CategoryDrawer";
import { Button, Flex, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ContentWrapper from "@/core/components/ContentWrapper";
import { useGetCategoryPaginated } from "../api/queries";
import DeleteCategoryConfirm from "./DeleteCategoryConfirm";

const Category = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [categoryDrawerOpen, setCategoryDrawerOpen] = useState<
		boolean | string
	>(false);
	const [toBeDeletedCategory, setToBeDeletedCategory] = useState(null);

	const { setTitle } = useTitle();

	const { initialFilterList, handleServerSideTableChange } =
		useServerSidePagination();

	const { data: categoryPageData, isFetching: isFetchingCategory } =
		useGetCategoryPaginated({ ...initialFilterList });

	useEffect(() => {
		setTitle("Book Category");
		return () => {
			setTitle("");
		};
	}, [setTitle]);

	const columns: ColumnsType<IServiceProvider> = [
		{
			title: "Category Name",
			key: "name",
			dataIndex: "name",
			fixed: "left",
			render: (name) => {
				return <span className="capitalize">{name}</span>;
			},
		},
		{
			title: "Category Description",
			key: "description",
			dataIndex: "description",
			render: (about) => {
				const shortenedAbout =
					about?.split(" ").slice(0, 20).join(" ") || "";
				const isAboutShortened = shortenedAbout.length < about?.length;

				return (
					<p>
						{`${shortenedAbout}${isAboutShortened ? "..." : ""}` ||
							"-"}
					</p>
				);
			},
		},
		{
			title: "Action",
			key: "action",
			render: (record) => {
				return (
					<Space>
						<Tooltip title="Edit">
							<Button
								type="text"
								shape="circle"
								icon={<EditOutlined />}
								onClick={() => {
									setCategoryDrawerOpen(record._id);
								}}
							/>
						</Tooltip>
						<Tooltip title="Delete">
							<Button
								type="text"
								shape="circle"
								icon={<DeleteOutlined />}
								onClick={() => {
									setToBeDeletedCategory(record);
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
			{categoryDrawerOpen && (
				<CategoryDrawer
					open={categoryDrawerOpen}
					setOpen={setCategoryDrawerOpen}
				/>
			)}
			<DeleteCategoryConfirm
				selectedCategory={toBeDeletedCategory}
				setSelectedCategory={setToBeDeletedCategory}
			/>
			<Flex className="single-book p-6">
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
					addBtnText="Add Category"
					addBtnAction={() => setCategoryDrawerOpen(true)}
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

export default Category;
