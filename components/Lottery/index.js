import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddresses, lotteryAbi } from "../../constants";
import StartLottery from "./StartLottery";
import JoinLottery from "./JoinLottery";
import Image from "next/image";
import CountdownTimer from "./Timer";

export default function Lottery() {
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();

    ///////////////////////////
    // Read contract address //
    ///////////////////////////

    // Read connected network ID and contract address of connected network from `contractAddresses` file
    const chainId = parseInt(chainIdHex);
    const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [lotteryState, setLotteryState] = useState("0");
    const [entranceFee, setEntranceFee] = useState("0");
    const [playersNumber, setPlayersNumber] = useState("0");
    const [balance, setBalance] = useState("0");
    const [durationTime, setDurationTime] = useState("0");
    const [startTimeStamp, setStartTimeStamp] = useState("0");
    const [endTimeStamp, setEndTimeStamp] = useState("0");
    const [lotteryStartTime, setLotteryStartTime] = useState("0");
    const [lotteryEndTime, setLotteryEndTime] = useState("0");
    const [latestWinner, setLatestWinner] = useState("0");

    /////////////////////
    // useEffect Hooks //
    /////////////////////
    useEffect(() => {
        if (isWeb3Enabled && lotteryAddress) {
            updateUI();
        }
    }, [isWeb3Enabled, lotteryState]);

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Function: getLotteryState
    const { runContractFunction: getLotteryState } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryState",
        params: {},
    });

    // Function: getLotteryEntranceFee
    const { runContractFunction: getLotteryEntranceFee } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryEntranceFee",
        params: {},
    });

    // Function: getLotteryPlayersNumber
    const { runContractFunction: getLotteryPlayersNumber } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryPlayersNumber",
        params: {},
    });

    // Function: getLotteryBalance
    const { runContractFunction: getLotteryBalance } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryBalance",
        params: {},
    });

    // Function: getLotteryDurationTime
    const { runContractFunction: getLotteryDurationTime } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryDurationTime",
        params: {},
    });

    // Function: getLotteryStartTimeStamp
    const { runContractFunction: getLotteryStartTimeStamp } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryStartTimeStamp",
        params: {},
    });

    // Function: getLatestLotteryWinner
    const { runContractFunction: getLatestLotteryWinner } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLatestLotteryWinner",
        params: {},
    });

    //////////////////
    // UI Functions //
    //////////////////

    async function updateUI() {
        // Read and set lottery state
        const lotteryStateFromCall = await getLotteryState();
        // const lotteryStateFormatted = ethers.utils.formatUnits(lotteryStateFromCall, "ether");
        setLotteryState(lotteryStateFromCall);
        // console.log(`Lottery state from state: ${lotteryState}`);

        // Read and set entrance fee
        const entranceFeeFromCall = (await getLotteryEntranceFee()).toString();
        const entranceFeeFormatted = ethers.utils.formatUnits(entranceFeeFromCall, "ether");
        setEntranceFee(entranceFeeFormatted);
        // console.log(`Entrance fee from state: ${entranceFeeFormatted} ETH`);

        // Read and set players number
        const playersNumberFromCall = (await getLotteryPlayersNumber()).toString();
        setPlayersNumber(playersNumberFromCall);
        // console.log(`Players number from call: ${playersNumberFromCall} `);

        // Read and set contract balance
        const balanceFromCall = (await getLotteryBalance()).toString();
        const balanceFromCallFormatted = ethers.utils.formatUnits(balanceFromCall, "ether");
        setBalance(balanceFromCallFormatted);
        // console.log(`Balance from call: ${balanceFromCallFormatted} ETH`);

        // Read and set lottery duration time [ENUM]
        const durationTimeFromCall = (await getLotteryDurationTime()).toString();
        setDurationTime(durationTimeFromCall);
        // console.log(`Duration time from call: ${durationTimeFromCall} `);

        // Read and set lottery start time stamp
        const startTimeStampFromCall = (await getLotteryStartTimeStamp()).toString();
        setStartTimeStamp(startTimeStampFromCall);
        // console.log(`Start time stamp from call: ${startTimeStampFromCall} `);

        // Read and set lottery end time stamp
        const endTimeStampFromCall = (
            (await getLotteryStartTimeStamp()).toNumber() + (await getLotteryDurationTime()).toNumber()
        ).toString();
        setEndTimeStamp(endTimeStampFromCall);
        // console.log(`End time stamp from call: ${endTimeStampFromCall} `);

        // Lottery start time
        const startTime = new Date((await getLotteryStartTimeStamp()).toNumber() * 1000).toLocaleTimeString();
        // console.log("startTime:", startTime);
        setLotteryStartTime(startTime);
        // console.log("lotteryStartTime:", lotteryStartTime);

        // Lottery end time
        const endTime = new Date(
            ((await getLotteryStartTimeStamp()).toNumber() + (await getLotteryDurationTime()).toNumber()) * 1000
        ).toLocaleTimeString();
        // console.log("endTime:", endTime);
        setLotteryEndTime(endTime);
        // console.log("lotterytEndTime:", lotteryEndTime);

        // Read and set latest lottery winner
        const latestWinnerFromCall = (await getLatestLotteryWinner()).toString();
        setLatestWinner(latestWinnerFromCall);
        // console.log(`Latest winner from call: ${latestWinnerFromCall} `);
    }

    const addressCutter = (fullAddress, shortAddressLength) => {
        if (fullAddress.length <= shortAddressLength) return fullAddress;
        const separator = "...";
        const frontChars = fullAddress.substring(0, 6);
        const backChars = fullAddress.substring(fullAddress.length - 4);
        return frontChars + separator + backChars;
    };

    return (
        <div>
            {lotteryAddress ? (
                <div className="flex flex-col items-center">
                    {/* Start or join lottery button */}
                    {lotteryState == 0 ? (
                        <StartLottery updateUI={async () => await updateUI()} />
                    ) : lotteryState == 1 ? (
                        <div className="h-48 flex-row align-center">
                            <div>
                                <JoinLottery updateUI={async () => await updateUI()} />
                            </div>
                            <div>
                                <CountdownTimer targetTime={endTimeStamp} />
                            </div>
                            <div>{/* <Countdown date={new Date(endTimeStamp * 1000)} /> */}</div>
                        </div>
                    ) : lotteryState == 2 ? (
                        <div className="m-2 p-2 text-3xl text-center text-red-600 font-medium">
                            <p>Lottery in calculating state! Please wait.</p>
                        </div>
                    ) : (
                        <div className="m-2 p-2 text-3xl text-center text-red-600 font-medium">
                            <p>Lottery state undefined. Please refresh the page.</p>
                        </div>
                    )}
                    {/* Refresh button */}
                    <div className="p-3 flex justify-center">
                        <div
                            className="p-3 rounded-full bg-amber-200 hover:bg-amber-400 active:bg-amber-500 cursor-pointer
                            transform hover:scale-125 transition ease-out duration-1000 hover:rotate-180"
                        >
                            <Image
                                src="/images/refresh.png"
                                alt="Refresh icon"
                                width={32}
                                height={32}
                                onClick={async () => await updateUI()}
                            />
                        </div>
                    </div>
                    {/* Current lottery data */}
                    <div>
                        <div className=" mb-2">
                            <div className="text-3xl font-bold">Lottery data:</div>
                        </div>

                        <table className="table-auto m-auto text-2xl">
                            <tbody>
                                <tr>
                                    <td className="w-48">Lottery state:</td>
                                    <td className="font-medium">
                                        {lotteryState == 0
                                            ? "CLOSE"
                                            : lotteryState == 1
                                            ? "OPEN"
                                            : lotteryState == 2
                                            ? "CALCULATING"
                                            : "Incorrect state!"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {lotteryState == 0 ? (
                            "" // Lottery data hidden
                        ) : lotteryState == 1 || lotteryState == 2 ? (
                            <table className="table-auto ml-6 text-2xl">
                                <tbody>
                                    <tr>
                                        <td className="w-48">Entrance fee:</td>
                                        <td className="font-medium">{entranceFee} ETH</td>
                                    </tr>
                                    <tr>
                                        <td>Players:</td>
                                        <td className="font-medium">
                                            {playersNumber} {playersNumber == 1 ? "player" : "players"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Lottery balance:</td>
                                        <td className="font-medium">{balance} ETH</td>
                                    </tr>
                                    <tr>
                                        <td>Duration time:</td>
                                        <td className="font-medium">{durationTime / 60} min</td>
                                    </tr>
                                    <tr>
                                        <td>Lottery start time:</td>
                                        <td className="font-medium">{lotteryStartTime}</td>
                                    </tr>
                                    <tr>
                                        <td>Lottery end time:</td>
                                        <td className="font-medium">{lotteryEndTime}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <div className="m-2 p-2 text-3xl text-center text-red-600 font-medium">
                                <p>Lottery state undefined. Please refresh the page.</p>
                            </div>
                        )}
                    </div>
                    {/* Latest winner data */}
                    <div className="ml-10">
                        <div className="flex items-center mt-10 mb-2">
                            <div className="text-3xl font-bold">Latest lottery winner:</div>
                        </div>
                        <table className="table-auto m-auto text-2xl">
                            <tbody>
                                <tr>
                                    <td className="w-48">Winner address:</td>
                                    <td className="font-medium">{addressCutter(latestWinner || "", 15)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="m-5 text-3xl text-red-500 text-center font-normal">
                    <p className="font-medium">
                        <span className="font-bold">Ooops...</span> Lottery address not found.
                    </p>
                    <p className="text-2xl">Please switch to another supported chain.</p>
                </div>
            )}
        </div>
    );
}
