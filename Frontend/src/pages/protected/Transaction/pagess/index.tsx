import { useState, useEffect } from "react";
import { ColumnsType } from "antd/es/table";

import { useTitle } from "@/providers/TitleProvider";
import GenericTable from "@/core/components/GenericTable";
import { IServiceProvider } from "@/schema/service-provider.schema";
import SearchBar from "@/core/components/SearchBar";
import useServerSidePagination from "@/core/components/GenericTable/hooks/useServerSidePagination";
import { Avatar, Button, Flex, Space, Tag, Tooltip, Typography } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	EyeFilled,
	RetweetOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { getComputedPath, protectedRoutePaths, useNavigate } from "@/router";
import DeleteTransactionConfirm from "./DeleteTransactionConfirm";
import TransactionDrawer from "./TransactionDrawer";
import { useGetTransactionPaginated } from "../api/queries";
import ToggleTransactionConfirm from "./ToggleTransactionConfirm";

const Transaction = () => {
	const navigate = useNavigate();

	const [searchQuery, setSearchQuery] = useState("");
	const [categoryDrawerOpen, setCategoryDrawerOpen] = useState<
		boolean | string
	>(false);
	const [toBeDeletedCategory, setToBeDeletedCategory] = useState(null);
	const [toBeToggledTransaction, setToBeToggledTransaction] = useState(null);

	const { setTitle } = useTitle();

	const { initialFilterList, handleServerSideTableChange } =
		useServerSidePagination();

	const { data: categoryPageData, isFetching: isFetchingCategory } =
		useGetTransactionPaginated({ ...initialFilterList });

	useEffect(() => {
		setTitle("Book Category");
		return () => {
			setTitle("");
		};
	}, [setTitle]);

	const columns: ColumnsType<IServiceProvider> = [
		{
			title: "Book Name",
			key: "bookDetails",
			dataIndex: "bookDetails",
			fixed: "left",
			render: (bookDetails) => {
				const shortenedAbout =
					(bookDetails?.name || "")
						?.split(" ")
						.slice(0, 20)
						.join(" ") || "";
				const isAboutShortened =
					shortenedAbout.length < bookDetails?.name?.length;

				return (
					<Flex gap={6} align="center">
						<span>
							{`${shortenedAbout}${isAboutShortened ? "..." : ""}` ||
								"-"}
						</span>
						<Tooltip title="View details">
							<Button
								size="small"
								type="dashed"
								shape="circle"
								icon={<EyeFilled />}
								onClick={() => {
									navigate(
										getComputedPath({
											path: protectedRoutePaths.book
												.viewBook,
											params: { id: bookDetails?._id },
										}),
									);
								}}
							/>
						</Tooltip>
					</Flex>
				);
			},
		},
		{
			title: "Member",
			key: "memberDetails",
			dataIndex: "memberDetails",
			// render: (memberDetails) => {
			// 	return <span className="capitalize">{memberDetails.name}</span>;
			// },
			render: (memberDetails) => {
				const profileAvatar = memberDetails?.profilePicture?.url;
				return (
					<Flex align="center" gap={4}>
						<Avatar
							src={profileAvatar}
							style={{ border: "1px solid #dfdfdf" }}
							size="small"
						>
							{(memberDetails?.name || "").charAt(0)}
						</Avatar>
						<Typography.Text>{memberDetails?.name}</Typography.Text>
					</Flex>
				);
				// return <span className="capitalize">{name}</span>;
			},
		},
		{
			title: "Type",
			key: "transactionType",
			dataIndex: "transactionType",
			render: (transactionType) => {
				return <span className="capitalize">{transactionType}</span>;
			},
		},
		{
			title: "Rent Date",
			key: "rentDate",
			dataIndex: "rentDate",
			render: (rentDate) => {
				return (
					<span>
						{dayjs(rentDate, "YYYY-MM-DD").format("DD MMM YYYY")}
					</span>
				);
			},
		},
		{
			title: "Assigned Return Date",
			key: "returnDate",
			dataIndex: "returnDate",
			render: (returnDate) => {
				return (
					<span>
						{dayjs(returnDate, "YYYY-MM-DD").format("DD MMM YYYY")}
					</span>
				);
			},
		},

		{
			title: "Acutal Return Date",
			key: "clientReturnDate",
			dataIndex: "clientReturnDate",
			align: "center",
			render: (clientReturnDate) => {
				return (
					<span>
						{dayjs(clientReturnDate, "YYYY-MM-DD").isValid()
							? dayjs(clientReturnDate, "YYYY-MM-DD").format(
									"DD MMM YYYY",
								)
							: "NA"}
					</span>
				);
			},
		},
		{
			title: "Fine Amount",
			key: "fine",
			dataIndex: "fine",
			render: (fine) => {
				return <span>{`Rs.${fine}`}</span>;
			},
		},
		{
			title: "Status",
			key: "status",
			dataIndex: "status",
			render: (status) => {
				return status === "Complete" ? (
					<Tag color="green-inverse">{status}</Tag>
				) : status === "Progress" ? (
					<Tag color="blue-inverse">{status}</Tag>
				) : status === "Overdue" ? (
					<Tag color="red-inverse">{status}</Tag>
				) : (
					<></>
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
									setCategoryDrawerOpen(record._id);
								}}
							/>
						</Tooltip>
						{/* <Tooltip title="Delete">
							<Button
								type="text"
								shape="circle"
								icon={<DeleteOutlined />}
								onClick={() => {
									setToBeDeletedCategory(record);
								}}
							/>
						</Tooltip> */}
						<Tooltip title="Toggle Transaction Type">
							<Button
								type="text"
								shape="circle"
								icon={<RetweetOutlined />}
								onClick={() => {
									setToBeToggledTransaction(record);
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
				<TransactionDrawer
					open={categoryDrawerOpen}
					setOpen={setCategoryDrawerOpen}
				/>
			)}
			<DeleteTransactionConfirm
				selectedCategory={toBeDeletedCategory}
				setSelectedCategory={setToBeDeletedCategory}
			/>
			<ToggleTransactionConfirm
				selectedTransaction={toBeToggledTransaction}
				setSelectedTransaction={setToBeToggledTransaction}
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
					addBtnText="Add Transaction"
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

export default Transaction;
