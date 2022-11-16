import { useWeb3Contract } from "react-moralis";
import { useState, useEffect } from "react";
import JoinLotteryModal from "./JoinLotteryModal";

export default function JoinLottery({ lotteryAddress, lotteryAbi, updateUI }) {
    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [showJoinLotteryModal, setShowJoinLotteryModal] = useState(false);
    const hideJoinLotteryModal = () => setShowJoinLotteryModal(false);
    const [entranceFee, setEntranceFee] = useState("0");

    ////////////////////
    // useEffect Hook //
    ////////////////////
    useEffect(() => {
        handleGetLotteryEntranceFee();
    }, [showJoinLotteryModal]);

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Contract function: getLotteryEntranceFee
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
        // console.log(`Entrance fee: ${entranceFee} ETH`);
    };

    return (
        <div>
            {/* Join lottery button */}
            <button className="joinLotteryButton" onClick={() => setShowJoinLotteryModal(true)}>
                Join lottery
            </button>
            {/* Join lottery modal */}
            <JoinLotteryModal
                isVisible={showJoinLotteryModal}
                lotteryAddress={lotteryAddress}
                lotteryAbi={lotteryAbi}
                entranceFee={entranceFee}
                updateUI={updateUI}
                onClose={hideJoinLotteryModal}
            />
        </div>
    );
}
