import { Column } from "@ant-design/plots";
import { Spin } from "antd";
import _ from "lodash";

const LeadBarGraph = ({ bookOverview, isFetchingData }: any) => {
	const groupedBookOverview = _.groupBy(bookOverview || [], "categoryName");

	const graphData = Object.entries(groupedBookOverview).map(
		([key, value]: any) => {
			console.log({ key, value });
			return {
				type: key,
				value: (value || []).length,
			};
		},
	);

	const medal = (datum: any) => {
		return datum;
	};

	const config = {
		data: graphData,
		xField: "type",
		yField: "value",
		colorField: "type",
		paddingRight: 8,

		axis: {
			x: {
				size: 60,
				labelFormatter: (datum: any) => medal(datum),
			},
		},
		legend: {
			color: {
				title: false,
				position: "bottom",
				rowPadding: 5,
			},
		},
	};
	return (
		<Spin spinning={isFetchingData}>
			<Column {...config} />
		</Spin>
	);
};

export default LeadBarGraph;
