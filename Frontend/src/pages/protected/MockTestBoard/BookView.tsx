import {
	Avatar,
	Button,
	Card,
	Col,
	Divider,
	Flex,
	Rate,
	Row,
	Tag,
	Typography,
} from "antd";
import React, { useEffect, useState } from "react";

import { useParams } from "@/router";
import ReactHtmlParser from "react-html-parser";
import defaultBookCover from "@/assets/images/default-book-cover.png";
import backBookCover from "@/assets/images/back.jpg";
import dayjs from "dayjs";

import { useGetBookById } from "./api/queries";

export interface SingleBookDataType {
	bookId: number | null;
	bookName: string;
	noOfPages: number | null;
	isbn: string;
	rating: number | undefined;
	stockCount: number | null;
	imagePath: string;
	publishedDate: string;
	author: any[];
	category: any;
}

const BookView = () => {
	const { id } = useParams();
	const [pos, setPos] = useState({ x: -45, y: 15, z: 20 });

	const { data: oneBook, isFetching: isFetchingBook } = useGetBookById(
		id || "",
	);

	// useEffect(() => {
	// 	const autoRotate = () => {
	// 		setPos((prevPost: any) => {
	// 			return {
	// 				...prevPost,
	// 				x: prevPost.x * 0.18 * 1.25,
	// 			};
	// 		});
	// 	};
	// 	const timeoutFunction = setInterval(autoRotate, 1000);
	// 	return () => {
	// 		clearInterval(timeoutFunction);
	// 	};
	// }, []);

	const moveBook = (e: any) => {
		const x = e.clientX - window.innerWidth / 2;
		const y = e.clientY - window.innerHeight / 2;
		const z = e.clientY - window.innerHeight / 2;
		const q = 0.1;
		setPos({ x: x * q * 2.5, y: -y * q * 1.25, z: z * q * 1.25 });
	};

	const mouseLeave = () => {
		setPos({ x: -45, y: 15, z: 20 });
	};

	return (
		<>
			{oneBook ? (
				<Row className="single-book p-6" gutter={[0, 16]}>
					<Col
						xs={{ span: 24 }}
						md={{ span: 9 }}
						style={{
							background: "rgba(255, 255, 255, 0.25)",
							boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
							border: "1px solid rgb(219, 214, 214)",
							position: "relative",
							minHeight: 410,
							borderRadius: 12,
							flex: 1,
						}}
					>
						<div className="container" onMouseMove={moveBook}>
							<div
								style={{
									transform: `rotateY(${pos.x}deg) rotateX(${pos.y}deg) rotateZ(${pos.y}deg)`,
								}}
								className="box"
							>
								<div className="left" />
								<div className="right" />
								<div className="top" />
								<div className="bottom" />

								<img
									className="back"
									alt="back"
									src={
										oneBook?.backCoverDetails?.url ||
										backBookCover
									}
								/>

								<img
									className="front"
									alt="bookimage"
									src={
										oneBook?.frontCoverDetails?.url ||
										defaultBookCover
									}
									// src={`data:image/png;base64,${oneBook?.imagePath}`}
								/>
							</div>
						</div>
					</Col>

					<Col
						xs={{ span: 24 }}
						md={{ span: 15 }}
						className="book-details"
						style={{
							border: "1px solid white",
							marginLeft: 12,
							borderRadius: 12,
							padding: 18,
						}}
					>
						<Typography.Title
							level={1}
							style={{
								color: "rgb(219, 214, 214)",
								fontSize: "40px",
								marginBottom: 0,
								textAlign: "center",
							}}
						>
							{oneBook?.name}
						</Typography.Title>

						<Divider className="m-2 bg-white" />
						<Flex vertical gap={14}>
							<Typography.Text
								style={{
									// color: "#272c32",
									fontSize: 22,
									fontWeight: 600,
									fontFamily: "poppins",
									color: "whitesmoke",
								}}
							>
								Stock :{" "}
								<span
									style={{
										color: "rgb(219, 214, 214)",
									}}
								>
									{oneBook?.stock}
								</span>
							</Typography.Text>
							<Typography.Text
								style={{
									// color: "#272c32",
									fontSize: 22,
									fontWeight: 600,
									fontFamily: "poppins",
									color: "whitesmoke",
								}}
							>
								Total Pages :{" "}
								<span
									style={{
										color: "rgb(219, 214, 214)",
									}}
								>
									{oneBook?.totalPage || "NA"}
								</span>
							</Typography.Text>
							<Typography.Text
								style={{
									// color: "#272c32",
									fontSize: 22,
									fontWeight: 600,
									fontFamily: "poppins",
									color: "whitesmoke",
								}}
							>
								Published Date :{" "}
								<span
									style={{
										color: "rgb(219, 214, 214)",
									}}
								>
									{dayjs(
										oneBook?.publishedDate,
										"YYYY-MM-DD",
									).isValid()
										? dayjs(
												oneBook?.publishedDate,
												"YYYY-MM-DD",
											).format("DD MMM YYYY")
										: "NA"}
								</span>
							</Typography.Text>
							<Typography.Text
								style={{
									// color: "#272c32",
									fontSize: 22,
									fontWeight: 600,
									fontFamily: "poppins",
									color: "whitesmoke",
								}}
							>
								Category :{" "}
								<Tag
									style={{
										padding: "4px 8px",
										fontSize: 22,
									}}
								>
									{oneBook?.categoryDetails?.name}
								</Tag>
							</Typography.Text>
							<Flex gap={8}>
								<span
									style={{
										// color: "#272c32",
										fontSize: 22,
										fontWeight: 600,
										fontFamily: "poppins",
										color: "whitesmoke",
									}}
								>
									{`Authors:`}
								</span>

								<Flex gap={6} style={{ flexWrap: "wrap" }}>
									{(oneBook?.authorDetails || []).map(
										(oneAuthor: any, index: number) => {
											return (
												<Tag
													key={index}
													style={{
														padding: "4px 8px",
													}}
												>
													<Flex
														gap={4}
														align="center"
													>
														<Avatar
															src={
																oneAuthor
																	?.profilePicture
																	?.url
															}
															style={{
																border: "1px solid #dfdfdf",
															}}
														>
															{(
																oneAuthor?.name ||
																""
															).charAt(0)}
														</Avatar>
														<span
															style={{
																fontSize: 20,
																fontWeight: 600,
															}}
														>
															{oneAuthor?.name}
														</span>
													</Flex>
												</Tag>
											);
										},
									)}
								</Flex>
							</Flex>
							<Flex justify="center">
								<Rate
									style={{ fontSize: 36 }}
									disabled
									value={oneBook?.rating}
								/>
							</Flex>
						</Flex>
					</Col>
					<Col span={24}>
						<Card
							size="small"
							style={{
								whiteSpace: "pre-line",
								padding: 24,
								width: "100%",
							}}
							title={"Description"}
							headStyle={{
								textAlign: "center",
								fontSize: 22,
								fontWeight: 600,
								color: "GrayText",
							}}
							className="ck-content"
						>
							{ReactHtmlParser(oneBook?.description)}
						</Card>
					</Col>
				</Row>
			) : (
				<Row className="single-book" justify="center" align="middle">
					<span className="loader" />
				</Row>
			)}
		</>
	);
};

export default BookView;
