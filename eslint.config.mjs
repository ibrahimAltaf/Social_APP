import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Resolve current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize FlatCompat with proper base directory
const compat = new FlatCompat({
    baseDirectory: __dirname,
});

// Correctly extending Next.js ESLint rules
const eslintConfig = compat.config({
    extends: ["next/core-web-vitals"],  // Ensure no direct function references
});

export default eslintConfig;
