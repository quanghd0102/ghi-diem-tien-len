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
        <meta
          name="description"
          content="Tiến lên và ghi điểm 1 cách dễ dàng hơn"
        />
        <meta property="og:title" content="Tiến Lên Ghi Điểm" />
        <meta
          property="og:description"
          content="Tiến lên và ghi điểm 1 cách dễ dàng hơn"
        />
        <meta property="og:image" content="/title.jpg" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="min-h-[768px] max-w-xl m-auto">
            <Component {...pageProps} />
          </div>
        </PersistGate>
      </Provider>
    </>
  );
}
