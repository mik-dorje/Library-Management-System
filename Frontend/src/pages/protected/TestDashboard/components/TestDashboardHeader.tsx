import { useAuth } from "@/providers/AuthProvider";
import { DatePicker, Flex, Tag, Typography, theme } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

interface ITestDashboardHeader {
	setFromDate: React.Dispatch<React.SetStateAction<string | undefined>>;
	setToDate: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const TestDashboardHeader = ({
	setFromDate,
	setToDate,
}: ITestDashboardHeader) => {
	const { useToken } = theme;
	const { token } = useToken();
	const { authUser } = useAuth();

	const onChangeDate: RangePickerProps["onChange"] = (_, dateString) => {
		if (dateString[0] !== "") {
			setFromDate(dayjs(dateString[0]).format("YYYY-MM-DD"));
			setToDate(dayjs(dateString[1]).format("YYYY-MM-DD"));
		} else {
			setFromDate(undefined);
			setToDate(undefined);
		}
	};

	return (
		<Flex justify="space-between">
			<Tag
				style={{
					background: "transparent",
					textAlign: "center",
					fontSize: 24,
					fontWeight: 600,
					border: "none",
				}}
				className="capitalize text-white"
			>
				{`Welcome ${authUser?.email}`}
			</Tag>

			<DatePicker.RangePicker
				style={{ width: "15rem", border: "0.25rem" }}
				onChange={onChangeDate}
			/>
		</Flex>
	);
};

export default TestDashboardHeader;
