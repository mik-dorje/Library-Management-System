import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Popover, theme } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, TableLocale } from "antd/es/table/interface";
import { AnyObject } from "antd/es/_util/type";
import { twMerge } from "tailwind-merge";

import filterIcon from "@/assets/vectors/filter.svg";
import { IPaginatedDataFilterField } from "@/schema/shared.schema";

import {
	IInitalFilterValue,
	initialPaginateFilterValue,
} from "./hooks/useServerSidePagination";
import { StyledTable } from "./styles";

import TableFilter from "../TableFilter";
import Flexbox from "../Flexbox";
import PaginatedSearchBar from "../PaginatedSearchBar";

const { useToken } = theme;

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue>;
	fullName?: string;
}

interface IGenericTableProps<TData> {
	dataSource?: TData[];
	columns: ColumnsType<TData>;
	hasAddBtn?: boolean;
	addBtnAction?: any;
	addBtnText?: string;
	searchBar?: React.ReactNode;
	searchFilterKey?: string;
	isLoading?: boolean;
	filterInfo?: IPaginatedDataFilterField[];
	initialFilterList?: IInitalFilterValue;
	serverSideDataParams?: IServerSideParams;
	handleServerSideTableChange?: (pagination: IInitalFilterValue) => void;
	customEmptyDataComponent?: React.ReactNode;
	otherHeaderComponent?: React.ReactNode;
	rowSelection?: any;
	rowClassName?: string;
	onRowClick?: any;
}

const GenericTable = <TData extends AnyObject>({
	dataSource,
	columns,
	hasAddBtn,
	addBtnAction,
	addBtnText,
	searchBar,
	searchFilterKey,
	isLoading,
	filterInfo,
	initialFilterList,
	serverSideDataParams,
	handleServerSideTableChange,
	customEmptyDataComponent,
	otherHeaderComponent,
	rowSelection,
	rowClassName,
	onRowClick,
}: IGenericTableProps<TData>) => {
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});

	const { token } = useToken();

	const handleTableChange = (pagination: TablePaginationConfig) => {
		if (serverSideDataParams) {
			return handleServerSideTableChange?.({
				page: pagination.current || 1,
				row: pagination.pageSize || 10,
			});
		}

		setTableParams({
			pagination,
		});
	};

	const locale: TableLocale = {
		...(customEmptyDataComponent && {
			emptyText: () => {
				return customEmptyDataComponent;
			},
		}),
	};

	const searchHandler = (searchQuery: string) => {
		if (searchQuery) {
			if (handleServerSideTableChange) {
				return handleServerSideTableChange({
					...initialPaginateFilterValue,
					fullName: searchQuery,
				});
			}
		}
	};

	const showHeader =
		searchBar ||
		searchFilterKey ||
		hasAddBtn ||
		!!filterInfo ||
		!!otherHeaderComponent;

	return (
		<div className="h-full w-full space-y-6">
			{showHeader && (
				<Flexbox
					align="center"
					justify="space-between"
					className="w-full"
				>
					{searchFilterKey &&
						initialFilterList &&
						handleServerSideTableChange && (
							<PaginatedSearchBar
								initialFilterList={initialFilterList}
								handleServerSideTableChange={
									handleServerSideTableChange
								}
								filterKey={searchFilterKey}
							/>
						)}

					{!searchFilterKey && searchBar && searchBar}

					<Flexbox className="ml-auto" align="center">
						{otherHeaderComponent}

						{hasAddBtn && (
							<Button
								type="primary"
								className="ml-3"
								icon={<PlusOutlined />}
								onClick={addBtnAction}
							>
								{addBtnText || "Add New"}
							</Button>
						)}

						{filterInfo &&
							initialFilterList &&
							handleServerSideTableChange && (
								<Popover
									className="ml-3"
									content={
										<TableFilter
											filterInfo={filterInfo}
											handleServerSideTableChange={
												handleServerSideTableChange
											}
											initialFilterList={
												initialFilterList
											}
											setIsFilterOpen={setIsFilterOpen}
										/>
									}
									trigger="click"
									arrow={false}
									placement="bottomRight"
									overlayInnerStyle={{
										width: "300px",
										padding: 16,
									}}
									open={isFilterOpen}
									onOpenChange={() =>
										setIsFilterOpen(!isFilterOpen)
									}
								>
									<Button
										icon={
											<img
												src={filterIcon}
												alt="filter icon"
											/>
										}
										className="flex items-center justify-center border-primary"
									/>
								</Popover>
							)}
					</Flexbox>
				</Flexbox>
			)}

			<StyledTable
				columns={columns}
				dataSource={dataSource || []}
				token={token}
				rootClassName="h-full"
				rowSelection={rowSelection || undefined}
				loading={isLoading}
				scroll={{ x: "max-content" }}
				pagination={
					!!serverSideDataParams && !!initialFilterList
						? {
								total: serverSideDataParams?.totalElements || 0,
								current:
									serverSideDataParams?.currentPageIndex || 0,
								pageSize: initialFilterList?.row || 0,
								showSizeChanger: true,
								pageSizeOptions: ["5", "10", "15"],
							}
						: tableParams.pagination
				}
				locale={locale}
				rowClassName={() => {
					return twMerge("text-gray-700", rowClassName);
				}}
				onRow={(record) => {
					return {
						onClick: () => {
							onRowClick?.(record);
							if (rowSelection) {
								const { onChange } = rowSelection;
								onChange([record?.id]);
							}
						},
						className: onRowClick ? "cursor-pointer" : "",
					};
				}}
				onChange={handleTableChange}
			/>
		</div>
	);
};

export default GenericTable;
