import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import { contractAddresses, lotteryAbi } from "../../constants";
import StartLottery from "./StartLottery";
import JoinLottery from "./JoinLottery";
import CountdownTimer from "./Timer";

export default function Lottery() {
    const { isWeb3Enabled, chainId: chainIdHex, account } = useMoralis();

    const chainId = parseInt(chainIdHex);
    const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

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

    // UpdateUI
    useEffect(() => {
        if (isWeb3Enabled && lotteryAddress) {
            updateUI();
        }
    }, [isWeb3Enabled, chainId, lotteryState]);

    // Contract function: getLotteryState
    const { runContractFunction: getLotteryState } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryState",
        params: {},
    });

    // Contract function: getLotteryEntranceFee
    const { runContractFunction: getLotteryEntranceFee } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryEntranceFee",
        params: {},
    });

    // Contract function: getLotteryPlayersNumber
    const { runContractFunction: getLotteryPlayersNumber } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryPlayersNumber",
        params: {},
    });

    // Contract function: getLotteryBalance
    const { runContractFunction: getLotteryBalance } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryBalance",
        params: {},
    });

    // Contract function: getLotteryDurationTime
    const { runContractFunction: getLotteryDurationTime } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryDurationTime",
        params: {},
    });

    // Contract function: getLotteryStartTimeStamp
    const { runContractFunction: getLotteryStartTimeStamp } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryStartTimeStamp",
        params: {},
    });

    // Contract function: getLatestLotteryWinner
    const { runContractFunction: getLatestLotteryWinner } = useWeb3Contract({
        abi: lotteryAbi,
        contractAddress: lotteryAddress,
        functionName: "getLatestLotteryWinner",
        params: {},
    });

    // UpdateUI function
    async function updateUI() {
        // Lottery state
        const lotteryStateFromCall = await getLotteryState();
        setLotteryState(lotteryStateFromCall);

        // Entrance fee
        const entranceFeeFromCall = (await getLotteryEntranceFee()).toString();
        const entranceFeeFormatted = ethers.utils.formatUnits(entranceFeeFromCall, "ether");
        setEntranceFee(entranceFeeFormatted);

        // Players number
        const playersNumberFromCall = (await getLotteryPlayersNumber()).toString();
        setPlayersNumber(playersNumberFromCall);

        // Contract balance
        const balanceFromCall = (await getLotteryBalance()).toString();
        const balanceFromCallFormatted = ethers.utils.formatUnits(balanceFromCall, "ether");
        setBalance(balanceFromCallFormatted);

        // Lottery duration time [ENUM]
        const durationTimeFromCall = (await getLotteryDurationTime()).toString();
        setDurationTime(durationTimeFromCall);

        // Lottery start time stamp
        const startTimeStampFromCall = (await getLotteryStartTimeStamp()).toString();
        setStartTimeStamp(startTimeStampFromCall);

        // Lottery end time stamp
        const endTimeStampFromCall = (
            (await getLotteryStartTimeStamp()).toNumber() + (await getLotteryDurationTime()).toNumber()
        ).toString();
        setEndTimeStamp(endTimeStampFromCall);

        // Lottery start time
        const startTimeFromCall = new Date((await getLotteryStartTimeStamp()).toNumber() * 1000).toLocaleTimeString();
        setLotteryStartTime(startTimeFromCall);

        // Lottery end time
        const endTimeFromCall = new Date(
            ((await getLotteryStartTimeStamp()).toNumber() + (await getLotteryDurationTime()).toNumber()) * 1000
        ).toLocaleTimeString();
        setLotteryEndTime(endTimeFromCall);

        // Latest lottery winner
        const latestWinnerFromCall = (await getLatestLotteryWinner()).toString();
        setLatestWinner(latestWinnerFromCall);
    }

    //////////////////////
    // Helper Functions //
    //////////////////////

    // Address cutter function
    function addressCutter(fullAddress, shortAddressLength) {
        if (fullAddress.length <= shortAddressLength) {
            return fullAddress;
        } else {
            const separator = "...";
            const frontChars = fullAddress.substring(0, 6);
            const backChars = fullAddress.substring(fullAddress.length - 4);
            return frontChars + separator + backChars;
        }
    }

    return (
        <div>
            {lotteryAddress ? (
                <div className="flex flex-col items-center">
                    {/* Start or join lottery button */}
                    {lotteryState == 0 ? (
                        <StartLottery
                            lotteryAddress={lotteryAddress}
                            lotteryAbi={lotteryAbi}
                            updateUI={() => updateUI()}
                        />
                    ) : lotteryState == 1 ? (
                        <div className="h-48 flex-row align-center">
                            <div>
                                <JoinLottery
                                    lotteryAddress={lotteryAddress}
                                    lotteryAbi={lotteryAbi}
                                    updateUI={() => updateUI()}
                                />
                            </div>
                            <div>
                                <CountdownTimer targetTime={endTimeStamp} />
                            </div>
                        </div>
                    ) : lotteryState == 2 ? (
                        <div className="lotteryStateCalculating">
                            <div>Lottery in calculating state! Please wait.</div>
                            <div className="text-xl">(be patient & refresh)</div>
                        </div>
                    ) : (
                        <div className="lotteryStateUndefined">
                            <p>Lottery state undefined. Please refresh the page.</p>
                        </div>
                    )}
                    {/* Refresh button */}
                    <div className="p-3 flex justify-center">
                        <div className="refreshButton">
                            <Image
                                src="/images/refresh.png"
                                alt="Refresh icon"
                                width={32}
                                height={32}
                                onClick={() => updateUI()}
                                className="hover:animate-spin"
                            />
                        </div>
                    </div>
                    {/* Current lottery data */}
                    <div>
                        <div className="mb-2">
                            <div className="text-3xl font-bold">Lottery data:</div>
                        </div>
                        {/* Lottery data: lottery state */}
                        <table className="table-auto ml-6 text-2xl">
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
                        {/* Lottery data: other data */}
                        {lotteryState == 0 ? (
                            "" // Lottery data hidden when lottery is not in OPEN state
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
                            <div className="lotteryStateUndefined">
                                <p>Lottery state undefined. Please refresh the page.</p>
                            </div>
                        )}
                    </div>
                    {/* Latest lottery winner */}
                    {lotteryState == 0 ? (
                        <div className="ml-5">
                            <div className="ml-0 mt-10 mb-2 ">
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
                            {latestWinner.toLowerCase() == account ? (
                                <div>
                                    <div className="lotteryWinnerCaption">You won the lottery!</div>
                                    <div className="lotteryWinnerCongrats">!!! Congratulations !!!</div>
                                </div>
                            ) : (
                                <div className="lotteryWinnerCaption">You didn't win the lottery!</div>
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                <div className="lotteryAddressNotFound">
                    <p className="text-3xl font-medium">
                        <span className="font-bold">Ooops...</span> Lottery address not found.
                    </p>
                    <p className="text-2xl">Please switch to another supported chain.</p>
                </div>
            )}
        </div>
    );
}
