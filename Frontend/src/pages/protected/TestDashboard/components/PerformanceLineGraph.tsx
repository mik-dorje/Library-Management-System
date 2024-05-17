import { Tiny } from "@ant-design/plots";

const PerformanceLineGraph = () => {
	const data = [
		20,50,150,40,193,48,110,80,140,85,14,
	].map((value, index) => ({ value, index }));
	const config = {
		data,
		width: 150,
		height: 90,
		padding: 8,
		shapeField: "smooth",
		xField: "index",
		yField: "value",
		style: {
			fill: "linear-gradient(-90deg, #0B72EB00 0%, #0B72EB 100%)",
			fillOpacity: 0.6,
		},
	};
	return <Tiny.Area {...config} />;
};

export default PerformanceLineGraph;
