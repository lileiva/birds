import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const config: CodegenConfig = {
  schema: [
    {
      [process.env.GRAPHQL_ENDPOINT as string]: {
        headers: {
          Authorization: `Bearer ${process.env.VITE_ACCESS_TOKEN}`,
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
