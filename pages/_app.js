import Head from "next/head";
import { Lato } from "next/font/google";
import "../styles/globals.css";

const lato = Lato({
    subsets: ["latin"],
    weight: ["400", "700"],
});

function MyApp({ Component, pageProps }) {
    return (
        <main className={`${lato.className} antialiased`}>
            <Head>
                <title>LRSIC TILES</title>
                <meta
                    name="description"
                    content="graphic to la reine science center pavers"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Component {...pageProps} />
        </main>
    );
}

export default MyApp;
