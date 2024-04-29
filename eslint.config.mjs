import commonConfig from "./lib/eslint/eslint.config.mjs";

const projectConfig = [
  {
    files: ["**/web-sockets/**/*.mjs"],
    rules: {
      "import/no-internal-modules": [
        "error",
        {
          allow: [
            "**/handshake/*", "**/messaging/*",
          ],
        },
      ],
    },
  },
];
const ret = [
  ...commonConfig,
  ...projectConfig,
];

export default ret;
