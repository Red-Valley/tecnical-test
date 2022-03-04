import { I18nProvider } from "hooks/useI18n";
import { Provider } from "react-redux";
import AppRoutes from "routes";
import store from "store";

function App() {
  return (
    <I18nProvider>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </I18nProvider>
  );
}

export default App;
