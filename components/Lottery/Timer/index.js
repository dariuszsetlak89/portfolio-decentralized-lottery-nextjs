import { useEffect, useState } from "react";
import React from "react";

// Hook
const useCountdown = (targetTime) => {
    const countDownTime = new Date(targetTime).getTime();

    const [countDown, setCountDown] = useState(countDownTime - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log(3);
            let calculation = countDownTime - new Date().getTime();
            // console.log("calculation:", calculation);
            if (calculation >= 0) {
                setCountDown(calculation);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [countDownTime]);

    // Calculate time left
    // Minutes
    const minutesNumber = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const minutesString = minutesNumber >= 10 ? `${minutesNumber}` : `0${minutesNumber}`;
    //Seconds
    const secondsNumber = Math.floor((countDown % (1000 * 60)) / 1000);
    const secondsString = secondsNumber >= 10 ? `${secondsNumber}` : `0${secondsNumber}`;

    return [minutesNumber, secondsNumber, minutesString, secondsString];
};

const CountdownTimer = ({ targetTime }) => {
    const [minutesNumber, secondsNumber, minutesString, secondsString] = useCountdown(targetTime * 1000);

    if (minutesNumber + secondsNumber >= 0) {
        // console.log(`minutes: ${minutesNumber}, seconds: ${secondsNumber}`);
        console.log(1);
        return (
            <div className="mb-5 text-5xl text-red-500 font-semibold flex flex-row justify-center absolute">
                <div className="relative left-16">{minutesString}</div>
                <div className="mx-2 relative left-16">:</div>
                <div className="relative left-16">{secondsString}</div>
            </div>
        );
    } else {
        console.log(2);
        return (
            <div className="mb-5 text-3xl text-red-500 font-semibold flex justify-center">
                <p>Lottery times up!</p>
            </div>
        );
    }
};

export default CountdownTimer;
