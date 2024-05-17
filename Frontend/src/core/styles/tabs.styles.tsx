import { Tabs } from "antd";
import styled from "styled-components";

export const StrippedTabs = styled(Tabs)`
    .ant-tabs-nav {
        margin-bottom: 0px !important;
    }

    .ant-tabs-tab {
        padding-top: 0px !important;
    }
`;
