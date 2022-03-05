import Palette from "context/palette";
import SessionProvider from "context/session";
import { I18nProvider } from "hooks/useI18n";
import { Provider } from "react-redux";
import AppRoutes from "routes";
import store from "store";

function App() {
  return (
    <I18nProvider>
      <Palette>
        <Provider store={store}>
          <SessionProvider>
            <AppRoutes />
          </SessionProvider>
        </Provider>
      </Palette>
    </I18nProvider>
  );
}

export default App;
