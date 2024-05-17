/// <reference types="vite/client" />

import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import { GetEnvVars } from "env-cmd";

/*
    TODO: Use mode and env dynamically
*/

const mode: string = process.env.NODE_ENV || "development";
const env = {
    PORT: 4000,
    HTTPS: false,
    BUILD_PATH: "./dist",
    CI: false,
    MODE: mode.toUpperCase(),
    GENERATE_SOURCEMAP: false,
    VITE_USERNAME: "clientId",
    VITE_PASSEWORD: "secret",
};

export default {
    plugins: [
        react(),
        ...(mode !== "test"
            ? [
                  checker({
                      eslint: {
                          lintCommand: "eslint --config .eslintrc.json ./src",
                      },
                      typescript: true,
                      enableBuild: false,
                      overlay: { panelStyle: "height:100%;" },
                  }),
              ]
            : []),
    ],
    server: {
        port: env.PORT,
        open: true,
        https: env.HTTPS,
    },
    define: {
        "process.env.VITE_NODE_ENV": `"${mode}"`,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: "globalThis",
            },
        },
    },
    build: {
        outDir: env.BUILD_PATH,
        rollupOptions: {
            output: {
                sourcemap: env.GENERATE_SOURCEMAP,
                generatedCode: "es5",
            },
            plugins: [
                babel({
                    babelHelpers: "bundled",
                    configFile: path.resolve(__dirname, ".babelrc"),
                }),
                resolve(),
            ],
        },
    },
};
