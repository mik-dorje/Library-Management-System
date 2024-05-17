import { CloseOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	DatePicker,
	Drawer,
	Flex,
	Form,
	Input,
	InputNumber,
	Rate,
	Row,
	Select,
	Spin,
	Typography,
	UploadProps,
	message,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomTextEditorFormItem } from "@/core/components/CustomTextEditor/CustomTextEditorFormItem";
import { StyledFormItem, StyledUpload } from "@/pages/shared/NotFound/styles";
import { protectedRoutePaths, useNavigate } from "@/router";
import dayjs from "dayjs";
import { useAddBook, useGetBookById, useUpdateBook } from "./api/queries";
import { useGetAllCategory } from "../Category/api/queries";
import { useGetAllAuthor } from "../Author/api/queries";

const BookForm = () => {
	const [bookForm] = Form.useForm();
	const navigate = useNavigate();
	const { id } = useParams();
	const [fileList, setFileList] = useState<any>([]);
	const [backCoverFileList, setBackCoverFileList] = useState<any>([]);

	const { data: bookData, isFetching: isFetchingBook } = useGetBookById(
		id || "",
	);
	const { data: allCategoryData, isFetching: isFetchingCategory } =
		useGetAllCategory();
	const { data: allAuthorData, isFetching: isFetchingAuthor } =
		useGetAllAuthor();

	const { mutate: addCategory, isPending: isAddingCategory } = useAddBook();
	const { mutate: updateCategory, isPending: isUpdatingCategory } =
		useUpdateBook();

	const categoryOptions = useMemo(() => {
		const options = (allCategoryData || []).map((category: any) => {
			return {
				label: category.name,
				value: category._id,
			};
		});
		return options;
	}, [allCategoryData]);

	const authorOptions = useMemo(() => {
		const options = (allAuthorData || []).map((author: any) => {
			return {
				label: author.name,
				value: author._id,
			};
		});
		return options;
	}, [allAuthorData]);

	useEffect(() => {
		console.log({ bookData });
		if (bookData) {
			const initialFormValues = [
				{
					name: "id",
					value: bookData?._id,
				},
				{
					name: "name",
					value: bookData?.name,
				},
				{
					name: "description",
					value: bookData?.description,
				},
				{
					name: "authors",
					value: bookData?.authors,
				},
				{
					name: "stock",
					value: bookData?.stock,
				},
				{
					name: "rating",
					value: bookData?.rating,
				},
				{
					name: "category",
					value: bookData?.category,
				},
				{
					name: "totalPage",
					value: bookData?.totalPage,
				},
				{
					name: "publishedDate",
					value: bookData?.publishedDate
						? dayjs(bookData?.publishedDate, "YYYY-MM-DD")
						: undefined,
				},
			];
			bookForm.setFields(initialFormValues);
			const { frontCoverDetails, backCoverDetails } = bookData;
			if (frontCoverDetails) {
				setFileList([
					{
						uid: frontCoverDetails.uid,
						name: frontCoverDetails.name,
						url: frontCoverDetails.url,
					},
				]);
			}
			if (backCoverDetails) {
				setBackCoverFileList([
					{
						uid: backCoverDetails.uid,
						name: backCoverDetails.name,
						url: backCoverDetails.url,
					},
				]);
			}
		}
	}, [bookData, bookForm]);

	const getBase64 = (file: any): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});

	const uploadFrontCoverHandler: UploadProps["onChange"] = async (info) => {
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
	const uploadBackCoverHandler: UploadProps["onChange"] = async (info) => {
		const { status } = info.file;
		if (status === "removed") {
			setBackCoverFileList([]);
			return;
		}
		const dataUrl = await getBase64(info.file);
		setBackCoverFileList([
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
		const oneFrontFile = fileList.find((item: any) => item?.uid);
		const oneBackFile = backCoverFileList.find((item: any) => item?.uid);
		const newUploadedFrontCover = fileList.find(
			(item: any) => item.mode === "UPLOADED",
		);
		const newUploadedBackCover = backCoverFileList.find(
			(item: any) => item.mode === "UPLOADED",
		);
		const removedFrontCoverId =
			!oneFrontFile?.uid ||
			oneFrontFile?.uid !== bookData?.profilePicture?.uid
				? bookData?.profilePicture?.uid
				: undefined;
		const removedBackCoverId =
			!oneBackFile?.uid ||
			oneBackFile?.uid !== bookData?.backCoverDetails?.uid
				? bookData?.backCoverDetails?.uid
				: undefined;
		const backFrontPayload = newUploadedFrontCover
			? {
					uid: newUploadedFrontCover?.uid,
					name: newUploadedFrontCover?.name,
					url: newUploadedFrontCover?.url,
				}
			: undefined;
		const backCoverPayload = newUploadedBackCover
			? {
					uid: newUploadedBackCover?.uid,
					name: newUploadedBackCover?.name,
					url: newUploadedBackCover?.url,
				}
			: undefined;

		const payload = {
			...values,
			publishedDate: dayjs(values?.publishedDate).isValid()
				? dayjs(values?.publishedDate).format("YYYY-MM-DD")
				: undefined,
			frontCoverDetails: backFrontPayload,
			backCoverDetails: backCoverPayload,
			removedFrontCoverId,
			removedBackCoverId,
		};
		if (id) {
			updateCategory(payload, {
				onSuccess() {
					bookForm.resetFields();
					// setOpen(false);
					setFileList([]);
					navigate(protectedRoutePaths.book.bookList);
				},
			});
			return;
		}
		addCategory(payload, {
			onSuccess() {
				bookForm.resetFields();
				// setOpen(false);
				setFileList([]);
				navigate(protectedRoutePaths.book.bookList);
			},
		});
	};
	return (
		<Flex className="single-book p-8">
			<Card>
				<Form
					layout="vertical"
					form={bookForm}
					onFinish={finishHandler}
				>
					<Spin
						spinning={
							isFetchingBook ||
							isAddingCategory ||
							isUpdatingCategory
						}
					>
						<StyledFormItem label="Id" name="id" hidden>
							<Input placeholder="category Id" disabled />
						</StyledFormItem>
						<StyledFormItem label="Name" name="name">
							<Input placeholder="Please enter category name" />
						</StyledFormItem>
						<StyledFormItem label="Author/s" name="authors">
							<Select
								mode="multiple"
								placeholder="Please select book authors"
								options={authorOptions}
							/>
						</StyledFormItem>
						<StyledFormItem label="Category" name="category">
							<Select
								placeholder="Please select book category"
								options={categoryOptions}
							/>
						</StyledFormItem>
						<Flex gap={18}>
							<StyledFormItem
								label="Total Page"
								name="totalPage"
								style={{ flex: 1 }}
							>
								<InputNumber
									style={{ width: "100%" }}
									min={0}
									placeholder="Enter number of pages"
								/>
							</StyledFormItem>
							<StyledFormItem
								label="Published Date"
								name="publishedDate"
								style={{ flex: 1 }}
							>
								<DatePicker
									className="w-full"
									placeholder="Select published date"
								/>
							</StyledFormItem>
						</Flex>

						<StyledFormItem
							style={{ flex: 1, marginBottom: 6 }}
							label="Front Book Cover"
						>
							<StyledUpload
								key={1}
								beforeUpload={() => false}
								maxCount={1}
								fileList={fileList}
								onChange={uploadFrontCoverHandler}
								listType="picture"
							>
								<Button block>Upload Front Cover</Button>
							</StyledUpload>
						</StyledFormItem>
						<StyledFormItem
							style={{ flex: 1, marginBottom: 6 }}
							label="Back Book Cover"
						>
							<StyledUpload
								key={2}
								beforeUpload={() => false}
								maxCount={1}
								fileList={backCoverFileList}
								onChange={uploadBackCoverHandler}
								listType="picture"
							>
								<Button block>Upload Back Cover</Button>
							</StyledUpload>
						</StyledFormItem>

						<Flex gap={18}>
							<StyledFormItem
								label="Stock"
								name="stock"
								style={{ flex: 1 }}
							>
								<InputNumber
									style={{ width: "100%" }}
									min={0}
									placeholder="Enter number of books"
								/>
							</StyledFormItem>
							<StyledFormItem
								label="Rating"
								name="rating"
								style={{ flex: 1 }}
								initialValue={4}
							>
								<Rate />
							</StyledFormItem>
						</Flex>

						<StyledFormItem label="Description" name="description">
							<CustomTextEditorFormItem />
						</StyledFormItem>
						<StyledFormItem>
							<Flex justify="flex-end" gap={8}>
								<Button onClick={() => {}}>Cancel</Button>
								<Button
									type="primary"
									onClick={() => bookForm.submit()}
									loading={
										isAddingCategory || isUpdatingCategory
									}
								>
									Submit
								</Button>
							</Flex>
						</StyledFormItem>
					</Spin>
				</Form>
			</Card>
		</Flex>
	);
};

export default BookForm;
