import { Button, Flex, Modal, Typography, message } from "antd";
import React from "react";
import { useDeleteCategory } from "../api/queries";

interface DeleteCategoryConfirmProps {
	selectedCategory: any;
	setSelectedCategory: any;
}

const DeleteCategoryConfirm = ({
	selectedCategory,
	setSelectedCategory,
}: DeleteCategoryConfirmProps) => {
	console.log({ selectedCategory });
	const { mutate: deleteCategory, isPending: isDeletingCategory } =
		useDeleteCategory();

	const deleteHandler = () => {
		deleteCategory(
			{ id: selectedCategory._id as string },
			{
				onSuccess: () => {
					setSelectedCategory(null);
					message.success(
						`${selectedCategory.name} category successfully deleted !!`,
					);
				},
			},
		);
	};
	return (
		<Modal
			closable={false}
			destroyOnClose
			open={!!selectedCategory}
			footer={
				<Flex gap={12} justify="flex-end">
					<Button onClick={() => setSelectedCategory(null)}>
						Cancel
					</Button>
					<Button
						type="primary"
						loading={isDeletingCategory}
						onClick={deleteHandler}
					>
						Confirm
					</Button>
				</Flex>
			}
		>
			<Flex>
				<Typography.Text style={{ color: "gray" }}>
					Your are about to delete the category{" "}
					<span style={{ fontWeight: 600 }}>
						{selectedCategory?.name}
					</span>
					. Please click on{" "}
					<span style={{ fontWeight: 600 }}>Confirm</span> button to
					delete
				</Typography.Text>
			</Flex>
		</Modal>
	);
};

export default DeleteCategoryConfirm;
