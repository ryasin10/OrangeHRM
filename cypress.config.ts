import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer";
import path from "path";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import * as XLSX from "xlsx";
import fs from "fs";

export default defineConfig({
  allowCypressEnv: false,
  // Keep your existing configuration
  projectId: "xqb5t3",

  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,
    responseTimeout: 30000,
    defaultBrowser: "chrome",

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      on(
        "file:preprocessor",
        webpackPreprocessor({
          webpackOptions: {
            resolve: {
              extensions: [".ts", ".js"],
              plugins: [
                new TsconfigPathsPlugin({
                  configFile: path.resolve(__dirname, "./tsconfig.json"),
                }),
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

      on("task", {
        verifyFileDownloaded(filePath) {
          return new Promise((resolve) => {
            const checkFile = () => {
              if (fs.existsSync(filePath)) {
                resolve(true);
                return;
              }

              setTimeout(checkFile, 500);
            };

            checkFile();
          });
        },

        convertXlsxToJson({ filePath }) {
          return new Promise((resolve) => {
            setTimeout(() => {
              const workbook = XLSX.readFile(filePath);
              const worksheet = workbook.Sheets[workbook.SheetNames[0]];
              const jsonData = XLSX.utils.sheet_to_json(worksheet);
              resolve(jsonData);
            }, 2000);
          });
        },
      });

      return config;
    },
  },
});
