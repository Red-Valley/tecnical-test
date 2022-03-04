import {
  useState,
  useContext,
  createContext,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import { LANGS } from "utils/constants";

type I18nProviderProps = {
  children: ReactNode;
};

interface II18nContext {
  messages: any;
  locale: string;
  langLoaded?: boolean;
  setLocale: Dispatch<SetStateAction<string>>;
}

const defaultI18nContext: II18nContext = {
  messages: {},
  locale: LANGS.en,
  setLocale: () => "",
};

export const I18nContext = createContext(defaultI18nContext);

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [messages, setMessages] = useState({});
  const [locale, setLocale] = useState(LANGS.en);
  const [langLoaded, setLangLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setLangLoaded(false);
      // resolve user's favorite language
      const [el] = await Promise.all([
        fetch(`/static/lang/${locale}.json`).then((lang) => lang.json()),
      ]);

      setMessages({ [locale]: el });
      setLangLoaded(true);
    })();
  }, [locale]);

  // TODO: Add a default loading screen component here...
  if (!langLoaded) {
    return <div></div>;
  }

  return (
    <I18nContext.Provider value={{ messages, locale, setLocale, langLoaded }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
