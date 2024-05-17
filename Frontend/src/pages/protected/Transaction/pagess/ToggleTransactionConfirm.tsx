import { Button, Flex, Modal, Typography, message } from "antd";
import React from "react";
import { useUpdateTransaction } from "../api/queries";

interface ToggleTransactionConfirmProps {
	selectedTransaction: any;
	setSelectedTransaction: any;
}

const ToggleTransactionConfirm = ({
	selectedTransaction,
	setSelectedTransaction,
}: ToggleTransactionConfirmProps) => {
	console.log({ selectedTransaction });
	const { mutate: toogleTransaction, isPending: isTogglingTransaction } =
		useUpdateTransaction();

	const deleteHandler = () => {
		const payload = {
			id: selectedTransaction._id as string,
			transactionType:
				selectedTransaction.transactionType === "RENT"
					? "RETURN"
					: "RENT",
		};
		toogleTransaction(payload, {
			onSuccess: () => {
				setSelectedTransaction(null);
			},
		});
	};
	return (
		<Modal
			closable={false}
			destroyOnClose
			open={!!selectedTransaction}
			footer={
				<Flex gap={12} justify="flex-end">
					<Button onClick={() => setSelectedTransaction(null)}>
						Cancel
					</Button>
					<Button
						type="primary"
						loading={isTogglingTransaction}
						onClick={deleteHandler}
					>
						Confirm
					</Button>
				</Flex>
			}
		>
			<Flex>
				<Typography.Text style={{ color: "gray" }}>
					Your are about to toggle the transaction{" "}
					<span style={{ fontWeight: 600 }}>
						{selectedTransaction?.name}
					</span>
					. Please click on{" "}
					<span style={{ fontWeight: 600 }}>Confirm</span> button to
					toggle
				</Typography.Text>
			</Flex>
		</Modal>
	);
};

export default ToggleTransactionConfirm;
