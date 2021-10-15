import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "../components/Layout";
import AppStateProvider from "../context/AppState";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <AppStateProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppStateProvider>
    );
}

export default MyApp
