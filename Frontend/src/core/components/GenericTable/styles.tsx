import { GlobalToken, Table } from "antd";
import styled from "styled-components";

interface IStyledTableProps {
    token: GlobalToken;
}

export const StyledTable = styled(Table)<IStyledTableProps>`
    .ant-table .ant-table-thead th {
        color: ${({ token }) => token.colorPrimary} !important;
    }
`;
