import { defineConfig } from "i18next-cli";

// Ключи вынимаются из кода, а не поддерживаются руками: пропущенный перевод
// иначе виден только тогда, когда на него наткнулся пользователь. Локалей три,
// и `i18next-cli status` показывает, какая из них отстала.
// `types` генерирует объявление ресурсов, после которого t() с несуществующим
// ключом не проходит проверку типов.
export default defineConfig({
  locales: ["en", "ru", "es"],
  extract: {
    input: ["src/**/*.{ts,tsx}"],
    output: "src/locales/{{language}}/{{namespace}}.json",
    defaultNS: "translation",
    primaryLanguage: "en",
    // Подписи ссылок в шапке лежат в массиве и передаются в t() переменной,
    // поэтому в коде их не видно. Без этого extract вычистил бы их из переводов.
    preservePatterns: ["store", "cart"],
  },
  types: {
    input: ["src/locales/en/*.json"],
    output: "src/@types/i18next.d.ts",
    enableSelector: true,
  },
});
