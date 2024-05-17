import { ThemeConfig } from "antd/es/config-provider/context";

export const customTheme: ThemeConfig = {
    token: {
        fontFamily: "Inter",
        colorPrimary: "#004276",
    },
    components: {
        Input: {
            fontSize: 14,
            borderRadius: 5,
        },
        Button: {
            fontSize: 14,
            borderRadius: 5,
            fontWeightStrong: 400,
            primaryShadow: "none",
            defaultShadow: "none",
            borderRadiusSM: 5,
        },
        Select: {
            borderRadius: 5,
        },
        DatePicker: {
            borderRadius: 5,
        },
        Modal: {
            borderRadius: 0,
        },
    },
};
