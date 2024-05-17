import { Button, Card, Image, Typography, Flex, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteFilled, EditFilled, ShopOutlined } from "@ant-design/icons";
import { getComputedPath, protectedRoutePaths } from "@/router";

interface ProductProps {
	asset: any;
}

const BookCard = ({ asset }: ProductProps) => {
	const navigate = useNavigate();

	return (
		<Card
			key={asset.id}
			hoverable
			style={{
				width: "100%",
				height: "auto",
				position: "relative",
			}}
			bodyStyle={{
				padding: 0,
			}}
		>
			<Flex
				style={{
					position: "absolute",
					padding: 9,
					right: 0,
					zIndex: 1,
					top: 0,
				}}
				gap={4}
			>
				<Button
					size="small"
					shape="circle"
					icon={<EditFilled className="text-primary" />}
					onClick={() => {
						navigate(
							getComputedPath({
								path: protectedRoutePaths.book.editBookForm,
								params: { id: asset?._id },
							}),
						);
					}}
				/>
				<Button
					size="small"
					shape="circle"
					icon={<DeleteFilled className="text-primary" />}
				/>
			</Flex>
			<Flex justify="center" className="p-6">
				<Image
					src={
						asset?.frontCoverDetails?.url ||
						"https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
					}
					style={{
						width: "100%",
						height: "180px",
						backgroundSize: "cover",
						borderRadius: 4,
					}}
					preview={false}
				/>
			</Flex>
			<Flex vertical className="px-6 pb-6 pt-2" gap={3}>
				<Flex justify="center">
					<Typography.Text
						style={{
							fontWeight: 600,
							fontSize: 18,
							color: "GrayText",
						}}
					>
						{asset?.name}
					</Typography.Text>
				</Flex>
				<Flex justify="center">
					<Typography.Text
						style={{
							fontWeight: 500,
							fontSize: 16,
							color: "GrayText",
						}}
					>
						{asset?.categoryDetails?.name}
					</Typography.Text>
				</Flex>

				<Flex justify="center">
					<Rate value={4} disabled />
				</Flex>
				<Flex justify="center">
					<Flex gap={4}>
						<ShopOutlined
							style={{
								color: "GrayText",
								fontWeight: 500,
								fontSize: 16,
							}}
						/>
						<Typography.Text
							style={{
								color: "GrayText",
								fontWeight: 500,
								fontSize: 16,
							}}
						>
							{`${asset?.stock} Books Available`}
						</Typography.Text>
					</Flex>
				</Flex>
				<Button
					block
					type="primary"
					onClick={() => {
						navigate(
							getComputedPath({
								path: protectedRoutePaths.book.viewBook,
								params: { id: asset?._id },
							}),
						);
					}}
				>
					View Details
				</Button>
			</Flex>
		</Card>
	);
};

export default BookCard;
