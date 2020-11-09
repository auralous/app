import rosetta from "rosetta";
import en from "./locales/en.json";
import vi from "./locales/vi.json";

export const supportedLocale = <const>["en", "vi"];

const i18n = rosetta({ en, vi });
i18n.locale("en");

export const t: typeof i18n.t = (key, param) => i18n.t(key, param);

export default i18n;
