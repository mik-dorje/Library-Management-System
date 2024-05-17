import { Button, Flex, Modal, Typography, message } from "antd";
import React from "react";
import { useDeleteMember } from "../api/queries";

interface DeleteMemberConfirmProps {
	selectedMember: any;
	setSelectedMember: any;
}

const DeleteMemberConfirm = ({
	selectedMember,
	setSelectedMember,
}: DeleteMemberConfirmProps) => {
	const { mutate: deleteCategory, isPending: isDeletingCategory } =
		useDeleteMember();

	const deleteHandler = () => {
		deleteCategory(
			{ id: selectedMember._id as string },
			{
				onSuccess: () => {
					setSelectedMember(null);
					message.success(
						`${selectedMember.name} member successfully deleted !!`,
					);
				},
			},
		);
	};
	return (
		<Modal
			closable={false}
			destroyOnClose
			open={!!selectedMember}
			footer={
				<Flex gap={12} justify="flex-end">
					<Button onClick={() => setSelectedMember(null)}>
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
						{selectedMember?.name}
					</span>
					. Please click on{" "}
					<span style={{ fontWeight: 600 }}>Confirm</span> button to
					delete
				</Typography.Text>
			</Flex>
		</Modal>
	);
};

export default DeleteMemberConfirm;
