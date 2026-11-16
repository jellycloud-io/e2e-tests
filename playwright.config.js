const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/ui',
  use: {
    baseURL: process.env.UI_BASE_URL,
    browserName: 'chromium',
  },
});
