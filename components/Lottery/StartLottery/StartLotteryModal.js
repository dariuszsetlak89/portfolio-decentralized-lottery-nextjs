import { Modal, Select, useNotification } from "@web3uikit/core";
import { useState, useEffect } from "react";
// import Select from "react-select";
import { useWeb3Contract } from "react-moralis";

export default function StartLotteryModal({
    isVisible,
    onClose,
    startLotteryFunction,
    lotteryAddress,
    lotteryAbi,
    updateUI,
}) {
    ///////////////////////
    //  Selector Options //
    ///////////////////////
    const selectorOptions = [
        { id: "0", enumValue: "0", label: "LOW - 0.1 ETH" },
        { id: "1", enumValue: "1", label: "MEDIUM - 0.5 ETH" },
        { id: "2", enumValue: "2", label: "HIGH - 1 ETH" },
    ];

    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [entranceFeeSelection, setEntranceFeeSelection] = useState(selectorOptions[0]); // ENUM
    // console.log("entranceFeeSelection enum:", entranceFeeSelection.enumValue);
    const [entranceFee, setEntranceFee] = useState("0"); // BigNumber
    // console.log("entranceFee bigNumber:", entranceFee.toString());

    /////////////////////
    //  Notifications  //
    /////////////////////
    const dispatch = useNotification();

    ////////////////////
    // useEffect Hook //
    ////////////////////
    useEffect(() => {
        handleGetLotteryFeeValues();
    }, [entranceFeeSelection]);

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Function: getLotteryFeesValues
    const { runContractFunction: getLotteryFeesValues } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryFeesValues",
        params: {
            _entranceFee: entranceFeeSelection.enumValue,
        },
    });

    // Function: startLottery
    const { runContractFunction: startLottery } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "startLottery",
        msgValue: entranceFee,
        params: {
            _entranceFee: entranceFeeSelection.enumValue,
        },
    });

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Get lottery fee value handler
    const handleGetLotteryFeeValues = async () => {
        const enumValue = entranceFeeSelection.enumValue;
        if (enumValue == 0 || enumValue == 1 || enumValue == 2) {
            const fee = (await getLotteryFeesValues()).toString();
            setEntranceFee(fee);
        }
    };

    // Start lottery handler
    const handleStartLottery = async () => {
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
        onClose && onClose();
    };

    return (
        <div className="flex">
            <Modal
                title={<div className="p-2 text-3xl text-green-600 font-bold">Start Lottery</div>}
                isVisible={isVisible}
                width="600px"
                onCancel={onClose}
                onCloseButtonPressed={onClose}
                okText="START"
                okButtonColor="yellow"
                cancelText="CANCEL"
                onOk={handleStartLottery}
            >
                <div className="m-5 text-2xl font-medium flex justify-center">Select lottery entrance fee amount:</div>
                <div className="flex justify-center">
                    <div className="mx-5 mt-5 mb-16">
                        <Select
                            id="Select"
                            name="Lottery entrance feessss"
                            description="Lottery entrance fee choice"
                            label="Lottery entrance fee selector"
                            width="300px"
                            height="500px"
                            menuHeight="500px"
                            options={selectorOptions}
                            defaultOptionIndex={0}
                            onChange={setEntranceFeeSelection}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
