import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
	// @ts-ignore
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return {...initialProps};
	}

	render() {
		return (
            <Html>
                <Head>
                    <title>Beer Portal</title>
                    <meta name="description" content="Dapp, give a beer" />
                    <link
                        rel="icon"
                        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍺</text></svg>"
                    />

                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
	}
}

export default MyDocument;
