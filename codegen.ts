import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://main-practice.codebootcamp.co.kr/graphql",
  // documents: ["src/**/*.tsx", "src/**/*.ts"], // .tsx, .ts 파일 경로
  generates: {
    "./src/entities/api/": {
      preset: "client",
    },
  },
};
export default config;
