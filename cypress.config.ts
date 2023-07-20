import { defineConfig } from "cypress";

export default defineConfig({
  downloadsFolder: "generated/downloads",
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
  e2e: {
    baseUrl: "https://tmastaging.com",
    setupNodeEvents(on, config) {
      require("tsconfig-paths").register();
      require("@cypress/grep/src/plugin")(config);
      return config;
    },
    specPattern: "cypress/tests/**/*.spec.ts",
  },
  projectId: "1xdgs9",
  retries: {
    runMode: 2,
    openMode: 0,
  },
  screenshotOnRunFailure: false,
  screenshotsFolder: "generated/screenshots",
  video: false,
  videosFolder: "generated/videos",
  videoUploadOnPasses: false,
  viewportHeight: 1080,
  viewportWidth: 1920,
});
