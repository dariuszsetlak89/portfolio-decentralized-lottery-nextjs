import Head from "next/head";
import Layout from "../components/Layout";
import Lottery from "../components/Lottery";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Decentralized Lottery</title>
                <meta name="description" content="SmartContract Decentralized Lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Lottery />
            </Layout>
        </div>
    );
}
