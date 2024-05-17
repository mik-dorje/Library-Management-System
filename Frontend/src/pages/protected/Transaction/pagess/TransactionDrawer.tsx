import { CloseOutlined } from "@ant-design/icons";
import {
	Button,
	DatePicker,
	Drawer,
	Flex,
	Form,
	Input,
	Select,
	Spin,
	Typography,
	message,
} from "antd";
import React, { useEffect, useMemo } from "react";
import { isBoolean } from "lodash";
import dayjs from "dayjs";
import {
	useAddTransaction,
	useGetTransactionById,
	useUpdateTransaction,
} from "../api/queries";
import { useGetAllBook } from "../../MockTestBoard/api/queries";
import { useGetAllMember } from "../../Member/api/queries";
import { StyledFormItem } from "../styles";

interface TransactionDrawerProps {
	open: boolean | string;
	setOpen: React.Dispatch<React.SetStateAction<boolean | string>>;
}

const TransactionDrawer = ({ open, setOpen }: TransactionDrawerProps) => {
	const [categoryForm] = Form.useForm();
	const isCreateMode = useMemo(() => isBoolean(open), [open]);

	const { data: transactionData, isFetching: isFetchingTransaction } =
		useGetTransactionById(open as string, !isCreateMode);

	const { mutate: addTransaction, isPending: isAddingTransaction } =
		useAddTransaction();
	const { mutate: updateTransaction, isPending: isUpdatingTransaction } =
		useUpdateTransaction();

	const { data: allBookData, isFetching: isFetchingBook } = useGetAllBook();
	const { data: allMemberData, isFetching: isFetchingMember } =
		useGetAllMember();

	const bookOptions = useMemo(() => {
		const options = (allBookData || []).map((book: any) => {
			return {
				label: book.name,
				value: book._id,
			};
		});
		return options;
	}, [allBookData]);

	const memberOptions = useMemo(() => {
		const options = (allMemberData || []).map((member: any) => {
			return {
				label: member.name,
				value: member._id,
			};
		});
		return options;
	}, [allMemberData]);

	console.log({ transactionData });

	useEffect(() => {
		console.log({ transactionData });
		if (transactionData) {
			const initialFormValues = [
				{
					name: "id",
					value: transactionData?._id,
				},
				{
					name: "book",
					value: transactionData?.book,
				},
				{
					name: "member",
					value: transactionData?.member,
				},
				{
					name: "transactionType",
					value: transactionData?.transactionType,
				},
				{
					name: "rentDate",
					value: dayjs(transactionData?.rentDate, "YYYY-MM-DD"),
				},
				{
					name: "returnDate",
					value: dayjs(transactionData?.returnDate, "YYYY-MM-DD"),
				},
			];
			categoryForm.setFields(initialFormValues);
		}
	}, [transactionData, categoryForm]);

	const finishHandler = (values: any) => {
		const payload = {
			...values,
			rentDate: dayjs(values.rentDate).format("YYYY-MM-DD"),
			returnDate: dayjs(values.returnDate).format("YYYY-MM-DD"),
		};
		if (isCreateMode) {
			addTransaction(payload, {
				onSuccess() {
					categoryForm.resetFields();
					setOpen(false);
				},
			});
			return;
		}
		updateTransaction(payload, {
			onSuccess() {
				categoryForm.resetFields();
				setOpen(false);
			},
		});
	};
	return (
		<Drawer
			open={!!open}
			onClose={() => setOpen(false)}
			closable={false}
			destroyOnClose
			title={
				<Flex align="center" justify="space-between">
					<Typography.Text style={{ fontSize: 16 }}>
						{isCreateMode ? "Add Category" : "Edit Category"}
					</Typography.Text>
					<Button
						type="text"
						shape="circle"
						icon={<CloseOutlined />}
						onClick={() => setOpen(false)}
					/>
				</Flex>
			}
			footer={
				<Flex justify="flex-end" gap={8}>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button
						type="primary"
						onClick={() => categoryForm.submit()}
						loading={isAddingTransaction}
					>
						Submit
					</Button>
				</Flex>
			}
			bodyStyle={{
				padding: 20,
			}}
		>
			<Spin
				spinning={
					isFetchingTransaction ||
					isAddingTransaction ||
					isUpdatingTransaction
				}
			>
				<Form
					layout="vertical"
					form={categoryForm}
					onFinish={finishHandler}
					scrollToFirstError
				>
					<Form.Item noStyle name="id" hidden>
						<Input placeholder="category Id" disabled />
					</Form.Item>
					<StyledFormItem
						label="Book"
						name="book"
						rules={[
							{ required: true, message: "Please select a book" },
						]}
					>
						<Select
							placeholder="Please select book"
							options={bookOptions}
							disabled={!isCreateMode}
						/>
					</StyledFormItem>
					<StyledFormItem
						label="Member"
						name="member"
						rules={[
							{
								required: true,
								message: "Please select a member",
							},
						]}
					>
						<Select
							placeholder="Please select member"
							options={memberOptions}
							disabled={!isCreateMode}
						/>
					</StyledFormItem>
					<StyledFormItem
						label="Transaction Type"
						name="transactionType"
						initialValue={"RENT"}
						rules={[
							{
								required: true,
								message: "Please select a transaction type",
							},
						]}
					>
						<Select
							placeholder="Please select transaction type"
							options={[
								{
									label: "Rent",
									value: "RENT",
									disabled: !isCreateMode,
								},
								{
									label: "Return",
									value: "RETURN",
									disabled: isCreateMode,
								},
							]}
						/>
					</StyledFormItem>

					<StyledFormItem
						label="Rent Date"
						name="rentDate"
						rules={[
							{
								required: true,
								message: "Please select the rent date",
							},
						]}
						initialValue={dayjs()}
					>
						<DatePicker
							placeholder="Please select rent date"
							className="w-full"
						/>
					</StyledFormItem>
					<StyledFormItem
						label="Return Date"
						name="returnDate"
						rules={[
							{
								required: true,
								message: "Please select the return date",
							},
						]}
						initialValue={dayjs().add(7, "days")}
					>
						<DatePicker
							placeholder="Please select return date"
							className="w-full"
						/>
					</StyledFormItem>
				</Form>
			</Spin>
		</Drawer>
	);
};

export default TransactionDrawer;
