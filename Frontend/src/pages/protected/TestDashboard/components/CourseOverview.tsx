import { useTitle } from "@/providers/TitleProvider";
import { getComputedPath, protectedRoutePaths, useNavigate } from "@/router";
import { RightOutlined } from "@ant-design/icons";
import {
	Card,
	Col,
	Flex,
	Row,
	Space,
	Spin,
	Tag,
	Typography,
	theme,
} from "antd";

interface ICourseOverview {
	fromDate: string | undefined;
	toDate: string | undefined;
}

const CourseOverview = ({ fromDate, toDate }: ICourseOverview) => {
	const { setTitle } = useTitle();
	const { useToken } = theme;
	const { token } = useToken();
	const navigate = useNavigate();

	const courseOverview = [
		{
			id: 1,
			value: "Sin Eater",
			title: "Most Rented Book",
			key: "course",
		},
		{
			id: 2,
			value: "Last Wish",
			title: "Newly Added Book",
			key: "course",
		},
	];

	return (
		<Spin spinning={false}>
			<Flex vertical gap={20}>
				<Col span={24}>
					<Typography.Title level={5}>
						Course overview{" "}
					</Typography.Title>
					<Row gutter={[12, 12]}>
						{courseOverview?.map((item: any) => (
							<Col span={24} key={item?.id}>
								<Card
									hoverable
									style={{
										background: token.colorBgLayout,
									}}
								>
									<Flex justify="space-between">
										<Space>
											<Typography.Title
												style={{
													margin: 0,
												}}
												level={5}
											>
												{item?.title}
											</Typography.Title>
											<Tag
												style={{
													borderRadius: "1rem",
													background:
														item?.percentageStatus ===
														"positive"
															? "#F0FDF4"
															: "#F6D7D5",
													color:
														item?.percentageStatus ===
														"positive"
															? "#14532D"
															: "#A62A22",
													border: "none",
												}}
											>
												{item?.percentage}
											</Tag>
										</Space>
										<Space>
											<Typography.Title
												style={{
													margin: "0",
													color: token.colorPrimary,
												}}
												level={5}
											>
												{item?.value}
											</Typography.Title>
											<RightOutlined
												style={{
													color: token.colorPrimary,
												}}
											/>
										</Space>
									</Flex>
								</Card>
							</Col>
						))}
					</Row>
				</Col>
				{/* <Col span={24}>
						<Typography.Title level={5}>
							Consultancy overview
						</Typography.Title>
						<Row gutter={[12, 12]}>
							{consultancyOverview?.map((item: any) => (
								<Col span={24} key={item?.id}>
									<Card
										hoverable
										style={{
											background: token.colorBgLayout,
										}}
										onClick={() => {
											navigate(
												getComputedPath({
													path: protectedRoutePaths.testDashboardView,
													params: { id: item?.id },
												}),
												{
													state: {
														tableType:
															"consultancy",
													},
												},
											);
										}}
									>
										<Flex justify="space-between">
											<Typography.Title
												style={{
													margin: 0,
												}}
												level={5}
											>
												{item?.title}
											</Typography.Title>
											<Space>
												<Typography.Title
													style={{
														margin: "0",
														color: token.colorPrimary,
													}}
													level={5}
												>
													{item?.value}
												</Typography.Title>
												<RightOutlined
													style={{
														color: token.colorPrimary,
													}}
												/>
											</Space>
										</Flex>
									</Card>
								</Col>
							))}
						</Row>
					</Col> */}
			</Flex>
		</Spin>
	);
};

export default CourseOverview;
