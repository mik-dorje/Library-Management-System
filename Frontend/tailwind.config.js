/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#004276",
                },
                secondary: {
                    DEFAULT: "#0066b3",
                },
                accent: {
                    DEFAULT: "#FCB913",
                },
                gray: {
                    16: "#292929",
                    24: "#3D3D3D",
                    32: "#525252",
                    50: "#f8f9fa",
                    100: "#F8F9FA",
                    200: "#e9ecef",
                    300: "#DEE2E6",
                    400: "#ced4da",
                    500: "#adb5bd",
                    600: "#6C757D",
                    700: "#495057",
                    800: "#343a40",
                    900: "#212529",
                },
                blue: {
                    50: "#e3f2fd",
                    100: "#bbdefb",
                    200: "#90caf9",
                    300: "#64b5f6",
                    400: "#42a5f5",
                    500: "#2196f3",
                    600: "#1e88e5",
                    700: "#1976d2",
                    800: "#1565c0",
                    900: "#0D47A1",
                },
                green: {
                    50: "#F0FDF4",
                    100: "#DCFCE7",
                    200: "#BBF7D0",
                    300: "#86EFAC",
                    400: "#4ADE80",
                    500: "#22C55E",
                    600: "#16A34A",
                    700: "#15803D",
                    800: "#166534",
                    900: "#14532D",
                },
                yellow: {
                    50: "#FEFCE8",
                    100: "#FEF9C3",
                    200: "#FEF08A",
                    300: "#FDE047",
                    400: "#FACC15",
                    500: "#EAB308",
                    600: "#CA8A04",
                    700: "#A16207",
                    800: "#854D0E",
                    900: "#713F12",
                },
                red: {
                    50: "#FEF2F2",
                    100: "#FEE2E2",
                    200: "#FECACA",
                    300: "#FCA5A5",
                    400: "#F87171",
                    500: "#EF4444",
                    600: "#DC2626",
                    700: "#B91C1C",
                    800: "#991B1B",
                    900: "#7F1D1D",
                },
                orange: {
                    16: "#452400",
                    24: "#733C00",
                    32: "#A05300",
                    40: "#CE6B00",
                    48: "#FB8200",
                    56: "#FB982E",
                    64: "#FCAF5C",
                    72: "#FDC68B",
                    80: "#FDDCB9",
                    88: "#FEE7CD",
                    96: "#FFEFDE",
                    104: "#FFF6ED",
                },
                "cool-gray": {
                    16: "#292929",
                    24: "#3D3D3D",
                    32: "#525252",
                    50: "#f8f9fa",
                    100: "#F8F9FA",
                    200: "#e9ecef",
                    300: "#DEE2E6",
                    400: "#ced4da",
                    500: "#adb5bd",
                    600: "#6C757D",
                    700: "#495057",
                    800: "#343a40",
                    900: "#212529",
                },
                "warm-gray": {
                    50: "#F0F0F0",
                    100: "#E0E0E0",
                    200: "#C2C2C2",
                    300: "#A3A3A3",
                    400: "#858585",
                    500: "#666666",
                    600: "#4D4D4D",
                    700: "#333333",
                    800: "#1A1A1A",
                    900: "#0A0A0A",
                },
            },
            screens: {
                500: "500px",
                900: "900px",
            },
        },
    },
    plugins: [],
    important: true,
};
