import en from './en';
import hi from './hi';

export const translations = {
  en,
  hi,
};

// This type utility helps with autocomplete and type checking for translation keys
type NestedObjectPaths<T> = T extends string ? '' : {
    [K in keyof T]: K extends string ? `${K}` | `${K}.${NestedObjectPaths<T[K]>}` : never
}[keyof T];

export type TranslationKey = NestedObjectPaths<typeof en>;
