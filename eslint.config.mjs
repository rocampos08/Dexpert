import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // Puedes personalizar o agregar reglas aquí:
      "react/react-in-jsx-scope": "off", // Next.js no requiere importar React en scope
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Ignora vars que empiezan con _
      "@typescript-eslint/no-explicit-any": "warn", // Advierte sobre uso de any
      "react/no-unescaped-entities": "warn", // Advierte sobre caracteres no escapados en JSX
    },
  },
];

export default eslintConfig;
