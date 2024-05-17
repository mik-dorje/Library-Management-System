import React, { useEffect } from "react";
import { Button, Form, Input, Select, Space, DatePicker } from "antd";
import dayjs from "dayjs";

import {
    IInitalFilterValue,
    initialPaginateFilterValue,
} from "@/core/components/GenericTable/hooks/useServerSidePagination";
import {
    IPaginatedDataFilterField,
    PaginatedDataFilterFieldTypeEnum,
} from "@/schema/shared.schema";

import { StyledFormItem, StyledSelect } from "./styles";

interface ITableFilterProps {
    filterInfo: IPaginatedDataFilterField[];
    initialFilterList: IInitalFilterValue;
    handleServerSideTableChange: (pagination: IInitalFilterValue) => void;
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableFilter = ({
    filterInfo,
    initialFilterList,
    handleServerSideTableChange,
    setIsFilterOpen,
}: ITableFilterProps) => {
    const [filterForm] = Form.useForm();

    useEffect(() => {
        const fieldsValue = filterForm.getFieldsValue();

        const initialFieldsValue = Object.keys(fieldsValue).reduce(
            (acc, key) => {
                if (initialFilterList && key in initialFilterList) {
                    acc[key] = initialFilterList[key];
                } else {
                    acc[key] = fieldsValue[key];
                }

                return acc;
            },
            {} as { [key: string]: any }
        );

        filterForm.setFieldsValue(initialFieldsValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filterSubmitHandler = (values: any) => {
        const filteredValues = Object.entries(values).reduce(
            (acc, [key, value]) => {
                if (key === "fromDate" || key === "toDate") {
                    if (value) {
                        acc[key] = dayjs(value as Date).format("YYYY-MM-DD");
                    } else {
                        acc[key] = undefined;
                    }
                } else if (key === "dateRange") {
                    if (
                        dayjs((value as Date[])[0]).isValid() &&
                        dayjs((value as Date[])[1]).isValid()
                    ) {
                        acc.fromDate = dayjs((value as Date[])[0]).format(
                            "YYYY-MM-DD"
                        );
                        acc.toDate = dayjs((value as Date[])[1]).format(
                            "YYYY-MM-DD"
                        );
                    }
                } else {
                    acc[key] =
                        (value !== "" && value !== null) ||
                        (Array.isArray(value) && value?.length > 0)
                            ? value
                            : undefined;
                }

                return acc;
            },
            {} as IInitalFilterValue
        );

        handleServerSideTableChange?.({
            ...initialFilterList,
            ...filteredValues,
        });

        setIsFilterOpen(false);
    };

    const filterResetHandler = () => {
        handleServerSideTableChange?.(initialPaginateFilterValue);
        filterForm.resetFields();
        setIsFilterOpen(false);
    };

    return (
        <Form
            form={filterForm}
            layout="vertical"
            onFinish={filterSubmitHandler}
        >
            {filterInfo.map((field) => {
                if (field.type === PaginatedDataFilterFieldTypeEnum.INPUT) {
                    return (
                        <StyledFormItem
                            key={field.name}
                            label={field.label}
                            name={field.name}
                        >
                            <Input
                                placeholder={`Please ${field.type} ${field.label}`}
                            />
                        </StyledFormItem>
                    );
                }

                if (field.type === PaginatedDataFilterFieldTypeEnum.SELECT) {
                    return (
                        <StyledFormItem
                            key={field.name}
                            label={field.label}
                            name={field.name}
                        >
                            <StyledSelect
                                placeholder={`Please ${field.type} ${field.label}`}
                                mode={field.mode}
                                options={field.options}
                                allowClear
                            />
                        </StyledFormItem>
                    );
                }

                if (field.type === PaginatedDataFilterFieldTypeEnum.DATE) {
                    return (
                        <StyledFormItem
                            key={field.name}
                            label={field.label}
                            name={field.name}
                        >
                            <DatePicker
                                placeholder="Please Select Date"
                                allowClear
                                className="w-full"
                            />
                        </StyledFormItem>
                    );
                }

                if (field.type === PaginatedDataFilterFieldTypeEnum.RANGE) {
                    return (
                        <StyledFormItem
                            key={field.name}
                            label={field.label}
                            name={field.name}
                        >
                            <DatePicker.RangePicker
                                allowClear
                                className="w-full"
                            />
                        </StyledFormItem>
                    );
                }

                return null;
            })}

            <Form.Item className="mb-0">
                <div className="flex items-center justify-end space-x-3">
                    <Button onClick={filterResetHandler}>Reset</Button>

                    <Button type="primary" htmlType="submit">
                        Apply
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default TableFilter;
