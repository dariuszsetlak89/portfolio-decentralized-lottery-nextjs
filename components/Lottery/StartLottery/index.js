import { useMoralis, useWeb3Contract } from "react-moralis";
import { useState } from "react";
import { contractAddresses, lotteryAbi } from "../../../constants";
import StartLotteryModal from "./StartLotteryModal";

export default function StartLottery({ updateUI }) {
    ///////////////////////////
    // Read contract address //
    ///////////////////////////
    const { chainId: chainIdHex } = useMoralis();
    // Read connected network ID and contract address of connected network from `contractAddresses` file
    const chainId = parseInt(chainIdHex);
    const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [showModalStart, setShowModalStart] = useState(false);
    const hideModalStart = () => setShowModalStart(false);

    return (
        <div>
            <button
                className="m-5 p-5 w-56 text-3xl text-amber-700 font-medium bg-amber-400 
                hover:bg-amber-500 active:bg-amber-600 border-4 border-amber-600 rounded-2xl
                transform hover:scale-125 transition ease-out duration-500"
                onClick={() => setShowModalStart(true)}
            >
                Start lottery
            </button>
            <StartLotteryModal
                isVisible={showModalStart}
                onClose={hideModalStart}
                lotteryAddress={lotteryAddress}
                lotteryAbi={lotteryAbi}
                updateUI={updateUI}
            />
        </div>
    );
}
