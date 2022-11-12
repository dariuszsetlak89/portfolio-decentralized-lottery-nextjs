import { useMoralis, useWeb3Contract } from "react-moralis";
import { useState, useEffect } from "react";
import { contractAddresses, lotteryAbi } from "../../../constants";
import JoinLotteryModal from "./JoinLotteryModal";

export default function JoinLottery({ updateUI }) {
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
    const [showModalJoin, setShowModalJoin] = useState(false);
    const hideModalJoin = () => setShowModalJoin(false);
    const [entranceFee, setEntranceFee] = useState("0");

    ////////////////////
    // useEffect Hook //
    ////////////////////
    useEffect(() => {
        handleGetLotteryEntranceFee();
    }, [showModalJoin]);

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Function: getLotteryEntranceFee
    const { runContractFunction: getLotteryEntranceFee } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryEntranceFee",
        params: {},
    });

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Get lottery entrance fee handler
    const handleGetLotteryEntranceFee = async () => {
        const entranceFeeFromCall = (await getLotteryEntranceFee()).toString();
        setEntranceFee(entranceFeeFromCall);
    };

    return (
        <div>
            <button
                className="m-5 p-5 w-56 text-3xl text-amber-700 font-medium bg-amber-400 
                hover:bg-amber-500 active:bg-amber-600 border-4 border-amber-600 rounded-2xl
                transform hover:scale-125 transition ease-out duration-500"
                onClick={() => setShowModalJoin(true)}
            >
                Join lottery
            </button>
            <JoinLotteryModal
                isVisible={showModalJoin}
                onClose={hideModalJoin}
                lotteryAddress={lotteryAddress}
                lotteryAbi={lotteryAbi}
                entranceFee={entranceFee}
                updateUI={updateUI}
            />
        </div>
    );
}
