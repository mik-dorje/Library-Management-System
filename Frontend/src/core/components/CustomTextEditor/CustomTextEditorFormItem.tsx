import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

interface PriceInputProps {
	id?: string;
	value?: string;
	onChange?: (value: string) => void;
}

export const CustomTextEditorFormItem: React.FC<PriceInputProps> = (props) => {
	const { id, value, onChange } = props;

	const triggerChange = (changedValue: string) => {
		onChange?.(changedValue);
	};

	const onNumberChange = (editorData: any) => {
		triggerChange(editorData);
	};

	return (
		<div className="ck-content">
			<CKEditor
				id={id}
				editor={Editor}
				data={value || ""}
				onReady={(editor) => {
					console.log("Editor is ready to use!", editor);
				}}
				onChange={(_, editor) => {
					const data = editor.getData();
					onNumberChange(data);
				}}
				onBlur={() => {}}
				onFocus={() => {}}
				config={{
					placeholder: "Description here...",
					heading: {
						options: [
							{
								model: "paragraph",
								title: "Paragraph",
								class: "ck-heading_paragraph",
							},
							{
								model: "heading1",
								title: "Heading 1",
								class: "ck-heading_heading1",
								view: {
									name: "h1",
									classes: "ck-heading_heading1",
								},
							},
							{
								model: "heading2",
								title: "Heading 2",
								class: "ck-heading_heading2",
								view: {
									name: "h2",
									classes: "ck-heading_heading2",
								},
							},
							{
								model: "heading3",
								title: "Heading 3",
								class: "ck-heading_heading3",
								view: {
									name: "h3",
									classes: "ck-heading_heading3",
								},
							},
							{
								model: "heading4",
								title: "Heading 4",
								class: "ck-heading_heading4",
								view: {
									name: "h4",
									classes: "ck-heading_heading4",
								},
							},
							{
								model: "heading5",
								title: "Heading 5",
								class: "ck-heading_heading5",
								view: {
									name: "h5",
									classes: "ck-heading_heading5",
								},
							},
							{
								model: "heading6",
								title: "Heading 6",
								class: "ck-heading_heading6",
								view: {
									name: "h6",
									classes: "ck-heading_heading6",
								},
							},
						],
					},

					style: {
						definitions: [
							{
								name: "Article category",
								element: "span",
								classes: ["category"],
							},
							{
								name: "Title",
								element: "span",
								classes: ["document-title"],
							},
							{
								name: "Subtitle",
								element: "span",
								classes: ["document-subtitle"],
							},
							{
								name: "Info box",
								element: "p",
								classes: ["info-box"],
							},
							{
								name: "Side quote",
								element: "span",
								classes: ["side-quote"],
							},
							{
								name: "Marker",
								element: "span",
								classes: ["marker"],
							},
							{
								name: "Spoiler",
								element: "span",
								classes: ["spoiler"],
							},
							{
								name: "Code (dark)",
								element: "p",
								classes: ["fancy-code", "fancy-code-dark"],
							},
							{
								name: "Code (bright)",
								element: "p",
								classes: ["fancy-code", "fancy-code-bright"],
							},
						],
					},
				}}
			/>
		</div>
	);
};
