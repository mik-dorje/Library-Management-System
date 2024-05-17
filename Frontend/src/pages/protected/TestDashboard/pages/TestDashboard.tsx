import { useTitle } from "@/providers/TitleProvider";
import { Card, Col, Row, Typography, theme } from "antd";
import { useEffect, useState } from "react";
import CourseOverview from "../components/CourseOverview";
import CustomerOverviewCard from "../components/CustomerOverviewCard";
import LeadBarGraph from "../components/LeadBarGraph";
import SalesPerformance from "../components/SalesPerformance";
import TestDashboardHeader from "../components/TestDashboardHeader";
import { useGetDashboardData } from "../api/queries";

const TestDashboard = () => {
	const { setTitle } = useTitle();
	const { useToken } = theme;
	const { token } = useToken();
	const [fromDate, setFromDate] = useState<string | undefined>();
	const [toDate, setToDate] = useState<string | undefined>();

	const { data: dashboardData, isFetching: isFetchingDashboard } =
		useGetDashboardData();

	console.log({ dashboardData });

	useEffect(() => {
		setTitle("Dashboard");

		return () => {
			setTitle("");
		};
	}, [setTitle]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
			className="single-book p-6"
		>
			<TestDashboardHeader
				setFromDate={setFromDate}
				setToDate={setToDate}
			/>
			<Row
				gutter={[12, 12]}
				style={{
					background: token.colorBgContainer,
				}}
			>
				<CustomerOverviewCard
					countOverview={dashboardData?.countOverview}
					isFetchingDashboard={isFetchingDashboard}
				/>

				<Col xs={{ span: 24 }} md={{ span: 12 }}>
					<Typography.Title level={5} className="text-white">
						Category Overview
					</Typography.Title>
					<Row gutter={[12, 12]}>
						<Col span={24}>
							<Card>
								<LeadBarGraph
									bookOverview={dashboardData?.bookOverview}
									isFetchingData={isFetchingDashboard}
								/>
							</Card>
						</Col>
					</Row>
				</Col>
				<Col xs={{ span: 24 }} md={{ span: 12 }}>
					<SalesPerformance
						bookOverview={dashboardData?.bookOverview}
						isFetchingData={isFetchingDashboard}
					/>
				</Col>

				<Col xs={{ span: 24 }} md={{ span: 12 }}>
					<CourseOverview fromDate={fromDate} toDate={toDate} />
				</Col>
			</Row>
		</div>
	);
};

export default TestDashboard;
