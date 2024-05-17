import { useTitle } from "@/providers/TitleProvider";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Flex, Row, Space, Spin, Typography, theme } from "antd";
import { useEffect } from "react";
import PerformanceLineGraph from "./PerformanceLineGraph";
import SalesPipelinesPieChart from "./SalesPipelinesPieChart";

const SalesPerformance = ({ bookOverview, isFetchingData }: any) => {
	const { setTitle } = useTitle();
	const { useToken } = theme;
	const { token } = useToken();

	useEffect(() => {
		setTitle("Test Dashboard");
		return () => {
			setTitle("");
		};
	}, [setTitle]);

	console.log({ bookOverview });

	const salesPerformance = [
		{
			id: 1,
			value: (bookOverview || []).reduce(
				(sum: number, item: any) => sum + (item.stock || 0),
				0,
			),
			title: "Total Book Stock",
			percentage: "+2.55%",
			percentageStatus: "positive",
		},
	];
	return (
		<Flex vertical gap={12}>
			<Typography.Title level={5} className="text-white">
				Stock Overview
			</Typography.Title>
			<Spin spinning={isFetchingData}>
				<Row>
					{salesPerformance?.map((item: any, index: number) => (
						<Col span={24} key={index}>
							<Card
								hoverable
								style={{
									background: token.colorBgLayout,
								}}
							>
								<Flex
									justify="space-between"
									style={{ alignItems: "center" }}
								>
									<Space direction="vertical">
										<Typography.Text
											style={{
												fontWeight: 600,
											}}
										>
											{item?.title}
										</Typography.Text>
										<Typography.Title
											style={{
												margin: "0",
												color: token.colorPrimary,
											}}
											level={5}
										>
											{item?.value}
										</Typography.Title>
										<Space>
											<Typography.Text
												style={{
													color:
														item?.percentageStatus ===
														"positive"
															? "#14532D"
															: "#A62A22",
												}}
											>
												{item?.percentage}
											</Typography.Text>
											{item?.percentageStatus ===
											"positive" ? (
												<ArrowUpOutlined
													style={{
														color: "#14532D",
													}}
												/>
											) : (
												<ArrowDownOutlined
													style={{
														color: "#A62A22",
													}}
												/>
											)}
											<Typography.Text
												style={{
													color: "#8F8F8F",
												}}
											>
												than last month
											</Typography.Text>
										</Space>
									</Space>
									<PerformanceLineGraph />
								</Flex>
							</Card>
						</Col>
					))}
				</Row>
			</Spin>

			<Card>
				<Typography.Title
					style={{
						margin: "0",
					}}
					level={5}
				>
					Book Stock
				</Typography.Title>
				<SalesPipelinesPieChart
					bookOverview={bookOverview}
					isFetchingData={isFetchingData}
				/>
			</Card>
		</Flex>
	);
};

export default SalesPerformance;
