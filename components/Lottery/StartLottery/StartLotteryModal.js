import { Modal, Select, useNotification } from "@web3uikit/core";
import { useState, useEffect } from "react";
import { useWeb3Contract } from "react-moralis";
import LoadingSpinner from "../Animations/LoadingSpinner";

export default function StartLotteryModal({ isVisible, lotteryAddress, lotteryAbi, updateUI, onClose }) {
    const selectorOptions = [
        { id: "0", enumValue: "0", label: "LOW - 0.1 ETH" },
        { id: "1", enumValue: "1", label: "MEDIUM - 0.5 ETH" },
        { id: "2", enumValue: "2", label: "HIGH - 1 ETH" },
    ];

    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
    const [entranceFeeSelection, setEntranceFeeSelection] = useState(selectorOptions[0]); // ENUM
    const [entranceFee, setEntranceFee] = useState("0"); // BigNumber

    const dispatch = useNotification();

    useEffect(() => {
        handleGetLotteryFeesValues();
    }, [entranceFeeSelection]);

    // Contract function: getLotteryFeesValues
    const { runContractFunction: getLotteryFeesValues } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryFeesValues",
        params: {
            _entranceFee: entranceFeeSelection.enumValue,
        },
    });

    // Contract function: startLottery
    const { runContractFunction: startLottery } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "startLottery",
        msgValue: entranceFee,
        params: {
            _entranceFee: entranceFeeSelection.enumValue,
        },
    });

    // Get lottery fees values handler
    const handleGetLotteryFeesValues = async () => {
        const enumValue = entranceFeeSelection.enumValue;
        if (enumValue == 0 || enumValue == 1 || enumValue == 2) {
            const fee = (await getLotteryFeesValues()).toString();
            setEntranceFee(fee);
        } else {
            console.log("Error! Unhandled fee enum selection.");
        }
    };

    // Start lottery handler
    const handleStartLottery = async () => {
        setShowLoadingSpinner(true);
        await startLottery({
            onError: (error) => {
                console.log(error);
            },
            onSuccess: handleStartLotterySuccess,
        });
    };

    // Start lottery success handler
    const handleStartLotterySuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "You successfully started and joined the lottery.",
            title: "Lottery started and joined!",
            position: "bottomL",
        });
        updateUI();
        setEntranceFeeSelection(selectorOptions[0]);
        setShowLoadingSpinner(false);
        onClose();
    };

    return (
        // Start lottery modal
        <Modal
            title={<div className="startLotteryModalTitle">Start Lottery</div>}
            isVisible={isVisible}
            width="600px"
            okText="START LOTTERY"
            okButtonColor="blue"
            cancelText="CANCEL"
            onOk={handleStartLottery}
            onCancel={onClose}
            onCloseButtonPressed={onClose}
        >
            <div className="startLotteryModalContent">Select lottery entrance fee amount:</div>
            <div className="flex justify-center">
                <div className="mx-5 mt-5 mb-10">
                    <Select
                        id="Select"
                        name="Lottery entrance fees"
                        description="Lottery entrance fee choice"
                        label="Lottery entrance fee selector"
                        width="300px"
                        options={selectorOptions}
                        defaultOptionIndex={0}
                        onChange={setEntranceFeeSelection}
                    />
                </div>
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
