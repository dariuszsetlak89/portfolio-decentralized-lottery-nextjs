import { Modal, useNotification } from "@web3uikit/core";
import { useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";

export default function JoinLotteryModal({ isVisible, onClose, lotteryAddress, lotteryAbi, entranceFee, updateUI }) {
    /////////////////////
    //  Notifications  //
    /////////////////////
    const dispatch = useNotification();

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Function: joinLottery
    const { runContractFunction: joinLottery } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "joinLottery",
        msgValue: entranceFee,
        params: {},
    });

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Start lottery handler
    const handleJoinLottery = async () => {
        await joinLottery({
            onError: (error) => {
                console.log(error);
            },
            onSuccess: handleJoinLotterySuccess,
        });
    };

    const handleJoinLotterySuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "You successfully joined the lottery.",
            title: "Lottery joined!",
            position: "bottomL",
        });
        updateUI();
        onClose && onClose();
    };

    return (
        <div className="flex">
            <Modal
                title={<div className="p-2 text-3xl text-green-600 font-bold">Join Lottery</div>}
                isVisible={isVisible}
                onCancel={onClose}
                onCloseButtonPressed={onClose}
                okText="JOIN"
                okButtonColor="yellow"
                cancelText="CANCEL"
                onOk={handleJoinLottery}
                width="500px"
            >
                <p className="text-2xl font-medium text-center">
                    Lottery entrance fee:{" "}
                    <span className="font-bold">{ethers.utils.formatEther(entranceFee.toString())} ETH</span>
                </p>
            </Modal>
        </div>
    );
}
