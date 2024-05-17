import { useState } from "react";
import { AnyObject } from "antd/es/_util/type";

export type IInitalFilterValue = {
    row: number;
    page: number;
    fullName?: string;
    type?: string;
} & AnyObject;

export const initialPaginateFilterValue: IInitalFilterValue = {
    row: 10,
    page: 1,
};

const useServerSidePagination = () => {
    const [initialFilterList, setInitialFilterList] = useState(
        initialPaginateFilterValue
    );

    /** For Server side filter and pagination */

    const handleServerSideTableChange = (pagination: IInitalFilterValue) => {
        setInitialFilterList({
            ...pagination,
            page: pagination?.page || 1,
            row: pagination?.row || 10,
        });
    };

    const serverPaginationParams = {
        initialFilterList,
        handleServerSideTableChange,
    };

    return {
        ...serverPaginationParams,
    };
};

export default useServerSidePagination;
