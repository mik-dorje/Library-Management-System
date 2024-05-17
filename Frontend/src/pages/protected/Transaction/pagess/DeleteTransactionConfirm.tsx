import { Button, Flex, Modal, Typography, message } from "antd";
import React from "react";
import { useDeleteTransaction } from "../api/queries";

interface DeleteTransactionConfirmProps {
	selectedCategory: any;
	setSelectedCategory: any;
}

const DeleteTransactionConfirm = ({
	selectedCategory,
	setSelectedCategory,
}: DeleteTransactionConfirmProps) => {
	console.log({ selectedCategory });
	const { mutate: deleteCategory, isPending: isDeletingCategory } =
		useDeleteTransaction();

	const deleteHandler = () => {
		deleteCategory(
			{ id: selectedCategory._id as string },
			{
				onSuccess: () => {
					setSelectedCategory(null);
					message.success(
						`${selectedCategory.name} transaction successfully deleted !!`,
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
					Your are about to delete the transaction{" "}
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

export default DeleteTransactionConfirm;
