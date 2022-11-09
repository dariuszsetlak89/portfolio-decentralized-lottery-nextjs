import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import Image from "next/image";

export default function GetData({ lotteryAddress, lotteryAbi }) {
    const { isWeb3Enabled } = useMoralis();

    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [lotteryState, setLotteryState] = useState("0");
    const [entranceFee, setEntranceFee] = useState("0");
    const [playersNumber, setPlayersNumber] = useState("0");
    const [balance, setBalance] = useState("0");
    const [durationTime, setDurationTime] = useState("0");
    const [latestWinner, setLatestWinner] = useState("0");
    const [startTimeStamp, setStartTimeStamp] = useState("0");

    ////////////////////
    // useEffect Hook //
    ////////////////////
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled]);

    ////////////////////
    // View Functions //
    ////////////////////

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
        console.log(`Lottery state from state: ${lotteryState}`);

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

        // Read and set latest lottery winner
        const latestWinnerFromCall = (await getLatestLotteryWinner()).toString();
        setLatestWinner(latestWinnerFromCall);
        // console.log(`Latest winner from call: ${latestWinnerFromCall} `);

        // Read and set lottery start time stamp
        const startTimeStampFromCall = (await getLotteryStartTimeStamp()).toString();
        setStartTimeStamp(startTimeStampFromCall);
        // console.log(`Start time stamp from call: ${startTimeStampFromCall} `);
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

            <div className="mx-auto">
                <div className="mb-2">
                    <div className="text-3xl font-bold">Current lottery data:</div>
                </div>

                <table class="table-auto m-auto text-2xl">
                    <tbody>
                        <tr>
                            <td className="w-48">Lottery status:</td>
                            <td className="font-medium">{lotteryState}</td>
                        </tr>
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
                            <td className="font-medium">{durationTime} [s]</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <div className="flex items-center mt-10 mb-2">
                    <div className="text-3xl font-bold">Latest lottery winner:</div>
                </div>
                <table class="table-auto m-auto text-2xl">
                    <tbody>
                        <tr>
                            <td className="w-32">Winner:</td>
                            <td className="font-medium">{addressCutter(latestWinner || "", 15)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
