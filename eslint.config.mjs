import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: {
        parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module"
        }
    }
});

export default [
    ...compat.config({
        extends: ["next/core-web-vitals"],
        rules: {
            "react/react-in-jsx-scope": "off",
            "no-unused-vars": "warn"
        }
    }),
];
