import "@/styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";
import { store, persistor } from "../redux/store";
import "../configs/firebase";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Tiến Lên - Ghi Điểm</title>
        <meta
          name="description"
          content="Tiến lên và ghi điểm 1 cách dễ dàng hơn"
        />
        <meta
          name="description"
          content="Tiến lên và ghi điểm 1 cách dễ dàng hơn"
        />
        <meta property="og:title" content="Tiến Lên - Ghi Điểm" />
        <meta
          property="og:description"
          content="Tiến lên và ghi điểm 1 cách dễ dàng hơn"
        />
        <meta property="og:image" content="/title.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3461417137839639"
          crossOrigin="anonymous"
        />
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
