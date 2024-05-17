import { Button, GlobalToken } from "antd";
import FormItem from "antd/es/form/FormItem";
import styled from "styled-components";

export const ExtraInfoWrapper = styled.div`
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border: 1px dashed #dee2e6 !important;
    padding: 12px 12px !important;
    border-radius: 4px !important;
`;

interface IExtraInfoTriggerProps {
    token: GlobalToken;
}

export const ExtraInfoTrigger = styled.div<IExtraInfoTriggerProps>`
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: ${({ token }) => token.colorPrimary} !important;
    column-gap: 8px !important;
    cursor: pointer !important;
`;

export const StyledFormItem = styled(FormItem)`
    margin-bottom: 0px !important;
`;

interface StyledDeleteButtonProps {
    token: GlobalToken;
}

export const StyledDeleteButton = styled(Button)<StyledDeleteButtonProps>`
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: #e9ecef !important;
    color: ${({ token }) => token.colorPrimary} !important;
`;

export const ExtraContentFormWrapper = styled.div`
    background-color: #f8f9fa;
    padding: 16px;
    border-radius: 4px;
`;
