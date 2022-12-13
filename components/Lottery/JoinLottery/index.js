import { useWeb3Contract } from "react-moralis";
import { useState, useEffect } from "react";
import JoinLotteryModal from "./JoinLotteryModal";

export default function JoinLottery({ lotteryAddress, lotteryAbi, updateUI }) {
    const [showJoinLotteryModal, setShowJoinLotteryModal] = useState(false);
    const hideJoinLotteryModal = () => setShowJoinLotteryModal(false);
    const [entranceFee, setEntranceFee] = useState("0");

    useEffect(() => {
        handleGetLotteryEntranceFee();
    }, [showJoinLotteryModal]);

    // Contract function: getLotteryEntranceFee
    const { runContractFunction: getLotteryEntranceFee } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryEntranceFee",
        params: {},
    });

    // Get lottery entrance fee handler
    const handleGetLotteryEntranceFee = async () => {
        const entranceFeeFromCall = (await getLotteryEntranceFee()).toString();
        setEntranceFee(entranceFeeFromCall);
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
