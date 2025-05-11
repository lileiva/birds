import { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

const config: CodegenConfig = {
  schema: [
    {
      [env.GRAPHQL_ENDPOINT]: {
        headers: {
          Authorization: `Bearer ${env.VITE_ACCESS_TOKEN}`,
        },
      },
    },
  ],

  documents: ["src/**/*.{ts,tsx}", "src/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
