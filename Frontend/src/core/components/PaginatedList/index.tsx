import { useState } from "react";
import { Pagination, Spin } from "antd";

import { IInitalFilterValue } from "../GenericTable/hooks/useServerSidePagination";
import DataUnavailable from "../DataUnavailable";

interface IPaginatedListProps {
    children: React.ReactNode;
    pageSizeOptions?: number[];
    serverSideDataParams?: IServerSideParams;
    handleServerSideTableChange?: (pagination: IInitalFilterValue) => void;
    initialFilterList?: IInitalFilterValue;
    isLoading?: boolean;
    isEmpty?: boolean;
    emptyMsg?: string;
}

const PaginatedList = ({
    children,
    pageSizeOptions,
    serverSideDataParams,
    handleServerSideTableChange,
    initialFilterList,
    isLoading,
    isEmpty,
    emptyMsg,
}: IPaginatedListProps) => {
    const [paginationParams, setPaginationParams] = useState({
        current: 1,
        pageSize: 10,
    });

    const handlePageChange = (page: number, pageSize: number) => {
        if (serverSideDataParams) {
            return handleServerSideTableChange?.({
                page,
                row: pageSize,
            });
        }
        setPaginationParams({
            current: page,
            pageSize,
        });
    };

    return (
        <Spin spinning={isLoading}>
            {isEmpty && <DataUnavailable title={emptyMsg || "No Data Found"} />}

            {!isEmpty && children}

            <Pagination
                current={
                    serverSideDataParams?.currentPageIndex ||
                    paginationParams?.current ||
                    0
                }
                total={serverSideDataParams?.totalElements || 0}
                style={{ marginTop: "2rem" }}
                showSizeChanger
                pageSizeOptions={pageSizeOptions || [10, 20, 50, 100]}
                pageSize={
                    initialFilterList?.row || paginationParams?.pageSize || 0
                }
                onChange={handlePageChange}
            />
        </Spin>
    );
};

export default PaginatedList;
