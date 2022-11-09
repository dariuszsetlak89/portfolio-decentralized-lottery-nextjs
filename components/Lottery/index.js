import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";

import { contractAddresses, lotteryAbi } from "../../constants";
import StartLottery from "./StartLottery";
import JoinLottery from "./JoinLottery";
import GetData from "./GetData";

export default function Lottery() {
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();

    ///////////////////////////
    // Read contract address //
    ///////////////////////////

    // Read connected network ID
    const chainId = parseInt(chainIdHex);
    console.log("chainId:", chainId);
    // Read contract address of connected network from file `contractAddresses`
    const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;
    console.log("lotteryAddres:", lotteryAddress);

    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [lotteryState, setLotteryState] = useState("");

    ////////////////////
    // useEffect Hook //
    ////////////////////
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled]);

    ////////////////////
    // View Functions //
    ////////////////////

    // Function: getLotteryState
    const { runContractFunction: getLotteryState } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryState",
        params: {},
    });

    //////////////////
    // UI Functions //
    //////////////////

    async function updateUI() {
        // Read and set lottery state [ENUM]
        const lotteryStateFromCall = (await getLotteryState()).toString();
        setLotteryState(lotteryStateFromCall);
        console.log(`State from call: ${lotteryStateFromCall}`);
    }

    return (
        <div>
            {lotteryAddress ? (
                <div className="flex flex-col items-center">
                    {lotteryState == 0 ? (
                        <StartLottery lotteryAddress={lotteryAddress} lotteryAbi={lotteryAbi} />
                    ) : lotteryState == 1 ? (
                        <JoinLottery lotteryAddress={lotteryAddress} lotteryAbi={lotteryAbi} />
                    ) : (
                        <div className="m-2 p-2 text-3xl text-center text-red-600 font-medium">
                            <p>Lottery in calculating state! Please wait.</p>
                        </div>
                    )}
                    <GetData lotteryAddress={lotteryAddress} lotteryAbi={lotteryAbi} />
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}
