import { useState } from "react";
import StartLotteryModal from "./StartLotteryModal";

export default function StartLottery({ lotteryAddress, lotteryAbi, updateUI }) {
    const [showStartLotteryModal, setShowStartLotteryModal] = useState(false);
    const hideStartLotteryModal = () => setShowStartLotteryModal(false);

    return (
        <div>
            {/* Start lottery button */}
            <button className="startLotteryButton" onClick={() => setShowStartLotteryModal(true)}>
                Start lottery
            </button>
            {/* Start lottery modal */}
            <StartLotteryModal
                isVisible={showStartLotteryModal}
                lotteryAddress={lotteryAddress}
                lotteryAbi={lotteryAbi}
                updateUI={updateUI}
                onClose={hideStartLotteryModal}
            />
        </div>
    );
}
