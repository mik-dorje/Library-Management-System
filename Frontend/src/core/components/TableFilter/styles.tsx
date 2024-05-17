import { Form, Select } from "antd";
import styled from "styled-components";

export const StyledSelect = styled(Select)`
    .ant-select-selection-item {
        background: #ffffff !important;
        border-radius: 12px !important;
        border: 1px solid #e9ecef !important;
    }
`;

export const StyledFormItem = styled(Form.Item)`
    margin-bottom: "12px";
`;
