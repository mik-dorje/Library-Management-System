import { Pie } from "@ant-design/plots";
import { Spin } from "antd";
import { useMemo } from "react";

const SalesPipelinesPieChart = ({ bookOverview, isFetchingData }: any) => {
	const configData = useMemo(() => {
		return (bookOverview || []).map((item: any, index: number) => {
			return {
				type: item?.name,
				value: item?.stock,
			};
		});
	}, [bookOverview]);

	const config = {
		data: configData,
		angleField: "value",
		colorField: "type",
		paddingRight: 80,
		innerRadius: 0.5,
		label: {
			text: "value",
			style: {
				fontWeight: "bold",
			},
		},
		legend: {
			color: {
				title: false,
				position: "bottom",
				rowPadding: 5,
			},
		},
		width: 500, // Adjust width
		height: 300, // Adjust height
		annotations: [
			{
				type: "text",
				style: {
					text: "Chart",
					x: "50%",
					y: "50%",
					textAlign: "center",
					fontSize: 18,
					fontStyle: "bold",
				},
			},
		],
	};
	return (
		<Spin spinning={isFetchingData}>
			<Pie {...config} />
		</Spin>
	);
};

export default SalesPipelinesPieChart;
