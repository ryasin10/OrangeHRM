import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        webpackPreprocessor({
          webpackOptions: {
            resolve: {
              extensions: [".ts", ".js"],
              plugins: [
                new TsconfigPathsPlugin({ configFile: "./tsconfig.json" }),
              ],
            },
            module: {
              rules: [
                {
                  test: /\.ts$/,
                  exclude: [/node_modules/],
                  use: [{ loader: "ts-loader" }],
                },
              ],
            },
          },
        }),
      );
      return config;
    },
  },
});
