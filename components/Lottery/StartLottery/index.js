import { useState } from "react";
import StartLotteryModal from "./StartLotteryModal";

export default function StartLottery({ lotteryAddress, lotteryAbi }) {
    const [showModalStart, setShowModalStart] = useState(false);
    const hideModalStart = () => setShowModalStart(false);

    ///////////////////////
    const entranceFee = 1000000000000000000; // 1 ETH
    ///////////////////////

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
                entranceFee={entranceFee}
            />
        </div>
    );
}
