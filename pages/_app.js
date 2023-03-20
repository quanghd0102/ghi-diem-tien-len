import "@/styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";
import { store, persistor } from "../redux/store";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="min-h-[896px]">
            <Component {...pageProps} />
          </div>
        </PersistGate>
      </Provider>
    </>
  );
}
