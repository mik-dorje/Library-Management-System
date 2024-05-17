import { CloseOutlined } from "@ant-design/icons";
import {
	Button,
	Drawer,
	Flex,
	Form,
	Input,
	Spin,
	Typography,
	message,
} from "antd";
import React, { useEffect, useMemo } from "react";
import { isBoolean } from "lodash";
import {
	useAddCategory,
	useGetCategoryById,
	useUpdateCategory,
} from "../api/queries";

interface CategoryDrawerProps {
	open: boolean | string;
	setOpen: React.Dispatch<React.SetStateAction<boolean | string>>;
}

const CategoryDrawer = ({ open, setOpen }: CategoryDrawerProps) => {
	const [categoryForm] = Form.useForm();
	const isCreateMode = useMemo(() => isBoolean(open), [open]);

	const { data: categoryData, isFetching: isFetchingCategory } =
		useGetCategoryById(open as string, !isCreateMode);

	const { mutate: addCategory, isPaused: isAddingCategory } =
		useAddCategory();
	const { mutate: updateCategory, isPaused: isUpdatingCategory } =
		useUpdateCategory();

	console.log({ categoryData });

	useEffect(() => {
		console.log({ categoryData });
		if (categoryData) {
			const initialFormValues = [
				{
					name: "id",
					value: categoryData?._id,
				},
				{
					name: "categoryName",
					value: categoryData?.name,
				},
				{
					name: "categoryDescription",
					value: categoryData?.description,
				},
			];
			categoryForm.setFields(initialFormValues);
		}
	}, [categoryData, categoryForm]);

	const finishHandler = (values: any) => {
		const payload = {
			id: isCreateMode ? undefined : values.id,
			name: values.categoryName,
			description: values.categoryDescription,
		};
		if (isCreateMode) {
			addCategory(payload, {
				onSuccess() {
					categoryForm.resetFields();
					setOpen(false);
				},
			});
			return;
		}
		updateCategory(payload, {
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
						loading={isAddingCategory}
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
					isFetchingCategory || isAddingCategory || isUpdatingCategory
				}
			>
				<Form
					layout="vertical"
					form={categoryForm}
					onFinish={finishHandler}
				>
					<Form.Item noStyle name="id" hidden>
						<Input placeholder="category Id" disabled />
					</Form.Item>
					<Form.Item label="Category Name" name="categoryName">
						<Input placeholder="Please enter category name" />
					</Form.Item>
					<Form.Item
						label="Category Description"
						name="categoryDescription"
					>
						<Input.TextArea
							placeholder="Please enter category description"
							autoSize={{ minRows: 4 }}
						/>
					</Form.Item>
				</Form>
			</Spin>
		</Drawer>
	);
};

export default CategoryDrawer;
