/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import {
	ControlOutlined,
	LoadingOutlined,
	MenuOutlined,
	PlusCircleFilled,
	PlusOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import {
	Button,
	Card,
	Col,
	Empty,
	Flex,
	Form,
	Image,
	Input,
	Row,
	Slider,
	SliderSingleProps,
	Spin,
	Tag,
	Typography,
	theme,
} from "antd";
import { useAuth } from "@/providers/AuthProvider";

import { useInView } from "react-intersection-observer";
import SpinnerIcon from "@/assets/images/spinner.svg";
import styled from "styled-components";
import useServerSidePagination from "@/core/components/GenericTable/hooks/useServerSidePagination";
import { useTitle } from "@/providers/TitleProvider";
import { protectedRoutePaths, useNavigate } from "@/router";
import { useGetMemberPaginated } from "../Member/api/queries";
import BookCard from "./components/BookCard";
import { useGetBookPaginated } from "./api/queries";

const { useToken } = theme;

const StyledDiv = styled.div`
	::-webkit-scrollbar {
		display: none;
		-ms-overflow-style: none;
	}
`;

const Book = () => {
	const { token } = useToken();
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	const { setTitle } = useTitle();

	const [assetDetails, setAssetDetails] = useState<any>(null);

	const { initialFilterList, handleServerSideTableChange } =
		useServerSidePagination();

	const { ref: inviewRef, inView } = useInView({
		// rootMargin: '50px',
	});

	const { data: bookData, isFetching: isFetchingBook } = useGetBookPaginated({
		...initialFilterList,
	});

	console.log({ bookData });

	useEffect(() => {
		setTitle("Book Management");
	}, [setTitle]);

	useEffect(() => {
		if (bookData?.content && !isFetchingBook) {
			setAssetDetails((prevDetails: any) => ({
				...prevDetails,
				content: [
					...(assetDetails?.content || []),
					...(bookData?.content || []),
				],
				totalPages: bookData?.totalPages || 0,
				totalElements: bookData?.totalElements || 0,
				numberOfElements: bookData?.numberOfElements || 0,
				currentPageIndex: bookData?.currentPageIndex || 0,
			}));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bookData, isFetchingBook]);

	const fetchData = async () => {
		handleServerSideTableChange?.({
			...initialFilterList,
			page: initialFilterList.page + 1,
		});
	};

	useEffect(() => {
		if (inView && bookData) {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	const finishHandler = (values: any) => {
		setAssetDetails(null);
	};

	return (
		<Flex vertical className="single-book">
			<Row justify="space-between" align="middle" className="px-4 pt-4">
				<Tag
					style={{
						fontSize: 24,
						fontWeight: 600,
						padding: "6px 8px",
						color: "white",
						background: "transparent",
						border: "none",
					}}
				>
					Browse books
				</Tag>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() =>
						navigate(protectedRoutePaths.book.createBookForm)
					}
				>
					Add Book
				</Button>
			</Row>
			{assetDetails?.content?.length ? (
				<Row
					justify="start"
					align="top"
					className="p-2"
					style={{ flex: 1 }}
				>
					{(assetDetails?.content || [])?.map(
						(asset: any, index: number) => {
							return (
								<>
									<Col
										key={index}
										lg={{ span: 6 }}
										md={{ span: 8 }}
										sm={{ span: 12 }}
										xs={{ span: 24 }}
										style={{
											// border: "2px solid red",
											padding: 8,
										}}
									>
										<BookCard asset={asset} />
									</Col>
								</>
							);
						},
					)}
				</Row>
			) : (
				<Card
					style={{
						background: "transparent",
						border: "none",
						flex: 0.7,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Empty
						image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
						imageStyle={{
							height: 170,
							display: "flex",
							justifyContent: "center",
						}}
						description={
							isFetchingBook ? (
								<Flex gap={12} justify="center">
									<LoadingOutlined
										style={{
											fontSize: 18,
											fontWeight: 500,
											color: "white",
										}}
									/>
									<span
										style={{
											fontSize: 18,
											fontWeight: 500,
											color: "white",
										}}
									>
										Loading books
									</span>
								</Flex>
							) : (
								<span
									style={{
										fontSize: 18,
										fontWeight: 500,
										color: "white",
									}}
								>
									No book found
								</span>
							)
						}
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<Button
							type="primary"
							icon={<PlusCircleFilled />}
							onClick={() =>
								navigate(
									protectedRoutePaths.book.createBookForm,
								)
							}
						>
							Create Now
						</Button>
					</Empty>
				</Card>
			)}

			{assetDetails?.currentPageIndex < assetDetails?.totalPages && (
				<Row
					ref={inviewRef}
					style={{
						display: "flex",
						justifyContent: "center",
						background: "red",
					}}
				>
					<Image
						src={SpinnerIcon}
						alt="spinner"
						width={36}
						height={36}
						preview={false}
						style={{
							objectFit: "contain",
						}}
					/>
				</Row>
			)}
		</Flex>
	);
};

export default Book;
