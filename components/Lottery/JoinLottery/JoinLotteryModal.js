import { Modal, Input, useNotification } from "@web3uikit/core";
import { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";

export default function JoinLotteryModal({ isVisible, onClose, lotteryAddress, lotteryAbi, entranceFee }) {
    // Entrance fee
    const entranceFeeString = entranceFee.toString();
    const entranceFeeFormatted = ethers.utils.formatUnits(entranceFeeString, "ether");
    console.log(`Entrance fee from state: ${entranceFeeFormatted} ETH`);

    const dispatch = useNotification();

    // Function: joinLottery
    const { runContractFunction: joinLottery } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "joinLottery",
        msgValue: entranceFee,
        params: {},
    });

    const handleJoinLotterySuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "You successfully joined the lottery.",
            title: "Lottery joined!",
            position: "bottomL",
        });
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
                onOk={() => {
                    joinLottery({
                        onError: (error) => {
                            console.log(error);
                        },
                        onSuccess: handleJoinLotterySuccess,
                    });
                }}
                width="500px"
            >
                <p className="text-2xl font-medium text-center">
                    Lottery entrance fee: <span className="font-bold">{entranceFeeFormatted} ETH</span>
                </p>
            </Modal>
        </div>
    );
}
