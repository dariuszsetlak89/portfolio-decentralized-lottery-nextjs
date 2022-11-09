import { useMoralis } from "react-moralis";
import { ConnectButton } from "@web3uikit/web3";
import Image from "next/image";

const supportedChainsIds = ["31337", "5"];

export default function Header({ children }) {
    const { isWeb3Enabled, chainId } = useMoralis();

    return (
        <div>
            <div className="h-screen border-b-4 p-10 border-amber-400">
                <div className="flex justify-center p-2 ">
                    <ConnectButton moralisAuth={false} />
                </div>
                <div>
                    {isWeb3Enabled ? (
                        <div>
                            {supportedChainsIds.includes(parseInt(chainId).toString()) ? (
                                <div>
                                    <div className="p-2 text-3xl text-center text-green-600 font-bold">
                                        <p>Connected!</p>
                                    </div>
                                    <p>{children}</p>
                                </div>
                            ) : (
                                <div>
                                    <div className="p-2 text-center text-red-600">
                                        <p className="text-3xl font-bold">Not supported chain!</p>
                                        <p className="p-2 text-2xl">{`Supported chains IDs: ${supportedChainsIds}`}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-2 text-3xl text-center text-red-600 font-bold">
                            <p>Please connect to a Wallet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
