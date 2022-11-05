import Head from "next/head";
import Header from "../components/Header";
import { useMoralis } from "react-moralis";

const supportedChains = ["31337", "5"];

export default function Home() {
    const { isWeb3Enabled, chainId } = useMoralis();

    return (
        <div>
            <Head>
                <title>Decentralized Lottery</title>
                <meta name="description" content="My SmartContract Decentralized Lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {isWeb3Enabled ? (
                <div>
                    {supportedChains.includes(parseInt(chainId).toString()) ? (
                        <div className="flex flex-row">
                            {/* <LotteryEntrance className="p-8" /> */}
                        </div>
                    ) : (
                        <div>
                            <p>{`Please switch to a supported chain.`}</p>
                            <p>{`The supported chain ids are: ${supportedChains}`}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div>Please connect to a Wallet!</div>
            )}
        </div>
    );
}
