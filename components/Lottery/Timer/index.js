import { useEffect, useState } from "react";
import React from "react";

///////////////////////
// useCountdown Hook //
///////////////////////
const useCountdown = (targetTime) => {
    ////////////////////
    // Countdown Time //
    ////////////////////
    const countDownTime = new Date(targetTime).getTime();

    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [countDown, setCountDown] = useState(countDownTime - new Date().getTime());

    //////////////////////
    //  useEffect Hook  //
    //////////////////////
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

    /////////////////////////
    // Calculate time left //
    /////////////////////////
    const minutesNumber = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const minutesString = minutesNumber >= 10 ? `${minutesNumber}` : `0${minutesNumber}`;
    const secondsNumber = Math.floor((countDown % (1000 * 60)) / 1000);
    const secondsString = secondsNumber >= 10 ? `${secondsNumber}` : `0${secondsNumber}`;
    // console.log(`minutes: ${minutesNumber}, seconds: ${secondsNumber}`);

    return [minutesNumber, secondsNumber, minutesString, secondsString];
};

//////////////////////////////
// Countdown Timer Function //
//////////////////////////////
const CountdownTimer = ({ targetTime }) => {
    ///////////////////////
    // useCountdown Hook //
    ///////////////////////
    const [minutesNumber, secondsNumber, minutesString, secondsString] = useCountdown(targetTime * 1000);

    //////////////////
    //  Show timer  //
    //////////////////
    if (minutesNumber + secondsNumber > 0) {
        // Show timer
        // console.log(`minutes: ${minutesNumber}, seconds: ${secondsNumber}`);
        // console.log(1);
        return (
            <div className="timer">
                <div className="timerMinutes">{minutesString}</div>
                <div className="timerSeparator">:</div>
                <div className="timerSeconds">{secondsString}</div>
            </div>
        );
    } else {
        // Show time up message
        // console.log(2);
        return (
            <div className="timerTimesUpMessage">
                <div className="text-3xl">Calculating...</div>
                <div className="text-xl">(be patient & refresh)</div>
            </div>
        );
    }
};

export default CountdownTimer;
