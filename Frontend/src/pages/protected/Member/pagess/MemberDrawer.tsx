import { CloseOutlined, InboxOutlined } from "@ant-design/icons";
import {
	Button,
	Drawer,
	Flex,
	Form,
	Image,
	Input,
	Spin,
	Typography,
	Upload,
	UploadProps,
	message,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { isBoolean } from "lodash";
import {
	useAddMember,
	useGetMemberById,
	useUpdateMember,
} from "../api/queries";

interface MemberDrawerProps {
	open: boolean | string;
	setOpen: React.Dispatch<React.SetStateAction<boolean | string>>;
}

const StyledUpload = styled(Upload)`
	.ant-upload {
		width: 100%;
	}
`;

const MemberDrawer = ({ open, setOpen }: MemberDrawerProps) => {
	const [memberForm] = Form.useForm();
	const isCreateMode = useMemo(() => isBoolean(open), [open]);
	const [fileList, setFileList] = useState<any>([]);

	const { data: memberData, isFetching: isFetchingmember } = useGetMemberById(
		open as string,
		!isCreateMode,
	);

	const { mutate: addAuthor, isPending: isAddingMember } = useAddMember();
	const { mutate: updateAuthor, isPending: isUpdatingMember } =
		useUpdateMember();

	useEffect(() => {
		if (memberData) {
			const initialFormValues = [
				{
					name: "id",
					value: memberData?._id,
				},
				{
					name: "name",
					value: memberData?.name,
				},
				{
					name: "description",
					value: memberData?.description,
				},
				{
					name: "email",
					value: memberData?.email,
				},
				{
					name: "mobile",
					value: memberData?.mobile,
				},
				{
					name: "address",
					value: memberData?.address,
				},
			];
			memberForm.setFields(initialFormValues);
			const { profilePicture } = memberData;
			if (profilePicture) {
				setFileList([
					{
						uid: profilePicture.uid,
						name: profilePicture.name,
						// status: "done",
						url: profilePicture.url,
					},
				]);
			}
		}
	}, [memberData, memberForm]);

	const getBase64 = (file: any): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});

	const uploadHandler: UploadProps["onChange"] = async (info) => {
		const { status } = info.file;
		if (status === "removed") {
			setFileList([]);
			return;
		}
		const dataUrl = await getBase64(info.file);
		setFileList([
			{
				uid: info.file.uid,
				name: info.file.name,
				// status: "done",
				mode: "UPLOADED",
				url: dataUrl,
			},
		]);
	};

	const finishHandler = (values: any) => {
		const oneFile = fileList.find((item: any) => item?.uid);
		const newUploadedFile = fileList.find(
			(item: any) => item.mode === "UPLOADED",
		);
		const originalProfilePicture = memberData?.profilePicture;

		const removedUid =
			!oneFile?.uid || oneFile?.uid !== originalProfilePicture?.uid
				? originalProfilePicture?.uid
				: undefined;

		const ppFile = newUploadedFile
			? {
					uid: newUploadedFile?.uid,
					name: newUploadedFile?.name,
					url: newUploadedFile?.url,
				}
			: undefined;

		const payload = {
			...values,
			profilePicture: ppFile,
			removedFileId: removedUid,
		};
		if (isCreateMode) {
			addAuthor(payload, {
				onSuccess() {
					memberForm.resetFields();
					setOpen(false);
				},
			});
			return;
		}
		updateAuthor(payload, {
			onSuccess() {
				memberForm.resetFields();
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
						{isCreateMode ? "Add Member" : "Edit Member"}
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
						onClick={() => memberForm.submit()}
						loading={isAddingMember || isUpdatingMember}
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
					isFetchingmember || isAddingMember || isUpdatingMember
				}
			>
				<Form
					layout="vertical"
					form={memberForm}
					onFinish={finishHandler}
				>
					<Form.Item noStyle name="id" hidden>
						<Input placeholder="author Id" disabled />
					</Form.Item>
					<Form.Item label=" Name" name="name">
						<Input placeholder="Please enter author name" />
					</Form.Item>
					<Form.Item label="Description" name="description">
						<Input.TextArea
							placeholder="Please enter author description"
							autoSize={{ minRows: 4 }}
						/>
					</Form.Item>
					<Form.Item label="Email Address" name="email">
						<Input placeholder="Please enter author email" />
					</Form.Item>
					<Form.Item label="Contact Number" name="mobile">
						<Input placeholder="Please enter author mobile" />
					</Form.Item>
					<Form.Item label="Address" name="address">
						<Input placeholder="Please enter address" />
					</Form.Item>
					<Form.Item label="Profile Picture">
						<StyledUpload
							beforeUpload={() => false}
							maxCount={1}
							fileList={fileList}
							onChange={uploadHandler}
							listType="picture"
							// showUploadList={false}
						>
							<Button block>Upload</Button>
						</StyledUpload>
					</Form.Item>
				</Form>
			</Spin>
		</Drawer>
	);
};

export default MemberDrawer;
