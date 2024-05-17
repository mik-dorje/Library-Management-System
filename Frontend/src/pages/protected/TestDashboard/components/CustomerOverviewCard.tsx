import { getComputedPath, protectedRoutePaths, useNavigate } from "@/router";
import { LoadingOutlined } from "@ant-design/icons";
import { Card, Col, Progress, Row, Space, Typography, theme } from "antd";
import { useMemo } from "react";

const CustomerOverviewCard = ({ countOverview, isFetchingDashboard }: any) => {
	const { useToken } = theme;
	const { token } = useToken();
	const navigate = useNavigate();

	const customerData = useMemo(() => {
		return [
			{
				title: "Total Books",
				value: countOverview?.totalBookCount || 0,
			},
			{
				title: "Total Total Members",
				value: countOverview?.totalMemberCount || 0,
			},
			{
				title: "Total Authors",
				value: countOverview?.totalAuthorCount || 0,
			},
			{
				title: "Total Genre",
				value: countOverview?.totalCategoryCount || 0,
			},
		];
	}, [countOverview]);

	// const customerData = [
	// 	{
	// 		id: 1,
	// 		value: 20,
	// 		title: "Total members",
	// 		percentageStatus: "positive",
	// 	},
	// 	{
	// 		id: 2,
	// 		value: 34,
	// 		title: "Total Books",
	// 		percentageStatus: "positive",
	// 	},
	// 	{
	// 		id: 3,
	// 		value: "10",
	// 		title: "Total Category",
	// 		percentageStatus: "positive",
	// 	},
	// 	{
	// 		id: 4,
	// 		value: "10",
	// 		title: "Total Author",
	// 		percentageStatus: "positive",
	// 	},
	// ];
	return (
		<Col span={24}>
			<Typography.Title level={5}>Customer’s overview </Typography.Title>
			<Row gutter={[12, 12]}>
				{customerData?.map((item: any) => (
					<Col
						key={item?.id}
						lg={{ span: 6 }}
						md={{ span: 8 }}
						sm={{ span: 12 }}
						xs={{ span: 24 }}
					>
						<Card
							hoverable
							style={{
								background: token.colorBgLayout,
								textAlign: "center",
							}}
						>
							<Space direction="vertical">
								{isFetchingDashboard ? (
									<LoadingOutlined />
								) : (
									<Typography.Text
										style={{
											color: token.colorPrimary,
											fontSize: 20,
											fontWeight: 700,
										}}
									>
										{item?.value}
									</Typography.Text>
								)}
								<Typography.Text
									style={{ fontSize: 16, fontWeight: 600 }}
								>
									{item?.title}
								</Typography.Text>
								{/* <Typography.Text
									style={{
										color:
											item?.percentageStatus ===
											"positive"
												? "#16A34A"
												: item?.percentageStatus ===
													  "negative"
													? "#DC2626"
													: "",
										fontWeight: 600,
									}}
								>
									{item?.percentage}
								</Typography.Text> */}
							</Space>
						</Card>
					</Col>
				))}
			</Row>
		</Col>
	);
};

export default CustomerOverviewCard;
