import { Modal, Dropdown, Select, useNotification } from "@web3uikit/core";
import { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";

export default function StartLotteryModal({ isVisible, onClose, lotteryAddress, lotteryAbi }) {
    const [durationTime, setDurationTime] = useState(0);
    const [entranceFee, setEntranceFee] = useState(0);

    // Entrance fee
    const entranceFeeString = entranceFee.toString();
    const entranceFeeFormatted = ethers.utils.formatUnits(entranceFeeString, "ether");
    console.log(`Entrance fee from state: ${entranceFeeFormatted} ETH`);
    // Entrance fee ENUM
    // const entranceFeeEnum = ethers.BigNumber.from("1");
    const entranceFeeEnum = 1;
    console.log("entranceFeeEnum:", entranceFeeEnum.toString());
    // Lottery duration ENUM
    // const durationEnum = ethers.BigNumber.from("1");
    const durationEnum = 1;
    console.log("durationEnum:", durationEnum.toString());

    const dispatch = useNotification();

    // Function: startLottery
    const { runContractFunction: startLottery } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "startLottery",
        msgValue: entranceFee,
        params: {
            _duration: durationEnum,
            _entranceFee: entranceFeeEnum,
        },
    });

    // Function: joinLottery
    const { runContractFunction: joinLottery } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "joinLottery",
        msgValue: entranceFee,
        params: {},
    });

    const handleStartLotterySuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "You successfully started and joined the lottery.",
            title: "Lottery started and joined!",
            position: "bottomL",
        });
        onClose && onClose();
    };

    return (
        <div className="flex">
            <Modal
                title={<div className="p-2 text-3xl text-green-600 font-bold">Start Lottery</div>}
                isVisible={isVisible}
                onCancel={onClose}
                onCloseButtonPressed={onClose}
                okText="START"
                okButtonColor="yellow"
                cancelText="CANCEL"
                onOk={() => {
                    startLottery({
                        onError: (error) => {
                            console.log(error);
                        },
                        onSuccess: handleStartLotterySuccess,
                    });
                }}
            >
                <div className="m-5 text-2xl font-medium flex justify-center">
                    Select lottery <span className="font-bold"> duration time </span> and{" "}
                    <span className="font-bold"> entrance fee </span> amount.
                </div>
                <div className="flex justify-center">
                    <div className="mx-5 mt-5 mb-16">
                        <Select
                            defaultOptionIndex={0}
                            id="Select"
                            label="Lottery duration time"
                            onBlurTraditional={function noRefCheck() {}}
                            onChange={function noRefCheck() {}}
                            onChangeTraditional={function noRefCheck() {}}
                            width="300px"
                            options={[
                                {
                                    id: "fast",
                                    label: "FAST - 5 minutes",
                                },
                                {
                                    id: "medium",
                                    label: "MEDIUM - 15 minutes",
                                },
                                {
                                    id: "long",
                                    label: "LONG - 60 minutes",
                                },
                            ]}
                        />
                    </div>
                    <div className="mx-5 mt-5 mb-16">
                        <Select
                            defaultOptionIndex={0}
                            id="Select"
                            label="Lottery entrance fee"
                            onBlurTraditional={function noRefCheck() {}}
                            onChange={function noRefCheck() {}}
                            onChangeTraditional={function noRefCheck() {}}
                            width="300px"
                            menuHeight="500px"
                            options={[
                                {
                                    id: "low",
                                    label: "LOW - 0.05 ETH",
                                },
                                {
                                    id: "medium",
                                    label: "MEDIUM - 0.1 ETH",
                                },
                                {
                                    id: "high",
                                    label: "HIGH - 0.5 ETH",
                                },
                                {
                                    id: "veryhigh",
                                    label: "VERY HIGH - 1 ETH",
                                },
                            ]}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
