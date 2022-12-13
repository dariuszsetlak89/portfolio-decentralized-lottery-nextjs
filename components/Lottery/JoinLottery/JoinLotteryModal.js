import { useState } from "react";
import { Modal, useNotification } from "@web3uikit/core";
import { useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import LoadingSpinner from "../Animations/LoadingSpinner";

export default function JoinLotteryModal({ isVisible, lotteryAddress, lotteryAbi, entranceFee, updateUI, onClose }) {
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

    const dispatch = useNotification();

    // Contract function: joinLottery
    const { runContractFunction: joinLottery } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "joinLottery",
        msgValue: entranceFee,
        params: {},
    });

    // Join lottery handler
    const handleJoinLottery = async () => {
        setShowLoadingSpinner(true);
        await joinLottery({
            onError: (error) => {
                console.log(error);
            },
            onSuccess: handleJoinLotterySuccess,
        });
    };

    // Join lottery success handler
    const handleJoinLotterySuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "You successfully joined the lottery.",
            title: "Lottery joined!",
            position: "bottomL",
        });
        updateUI();
        setShowLoadingSpinner(false);
        onClose();
    };

    return (
        <Modal
            title={<div className="joinLotteryModalTitle">Join Lottery</div>}
            isVisible={isVisible}
            width="600px"
            okText="JOIN LOTTERY"
            okButtonColor="blue"
            cancelText="CANCEL"
            onOk={handleJoinLottery}
            onCancel={onClose}
            onCloseButtonPressed={onClose}
        >
            <div className="joinLotteryModalContent">
                Lottery entrance fee:{" "}
                <span className="font-bold">{ethers.utils.formatEther(entranceFee.toString())} ETH</span>
            </div>
            {showLoadingSpinner ? (
                <div>
                    <LoadingSpinner />
                </div>
            ) : (
                ""
            )}
        </Modal>
    );
}
