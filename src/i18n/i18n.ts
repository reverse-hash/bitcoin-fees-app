import { NativeModules } from "react-native";

import en from "./en";
import es from "./es";
import fr from "./fr";

const translation = {
  en,
  es,
  fr,
};

const defaultLocale = "en";
const systemLocaleId = NativeModules?.I18nManager?.localeIdentifier ?? defaultLocale;
const localeKey = Object.keys(translation).find((key) => systemLocaleId.startsWith(key)) || defaultLocale;
const dictionary = translation[localeKey];

function t(key: string, ...args: any[]): string {
  const template = dictionary[key] ?? "MISS[" + key + "]";
  if (args.length === 0) {
    return template;
  }

  return template.replace(/{}/g, () => {
    if (args.length === 0) {
      return "{}";
    }
    const arg = args.shift();
    return arg !== undefined ? String(arg) : "{}";
  });
}

export default { t };
