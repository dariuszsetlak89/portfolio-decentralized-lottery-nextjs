import { useEffect, useState } from "react";
import React from "react";

const useCountdown = (targetTime) => {
    const countDownTime = new Date(targetTime).getTime();

    const [countDown, setCountDown] = useState(countDownTime - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            let calculation = countDownTime - new Date().getTime();
            if (calculation >= 0) {
                setCountDown(calculation);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [countDownTime]);

    const minutesNumber = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const minutesString = minutesNumber >= 10 ? `${minutesNumber}` : `0${minutesNumber}`;
    const secondsNumber = Math.floor((countDown % (1000 * 60)) / 1000);
    const secondsString = secondsNumber >= 10 ? `${secondsNumber}` : `0${secondsNumber}`;

    return [minutesNumber, secondsNumber, minutesString, secondsString];
};

const CountdownTimer = ({ targetTime }) => {
    const [minutesNumber, secondsNumber, minutesString, secondsString] = useCountdown(targetTime * 1000);

    if (minutesNumber + secondsNumber > 0) {
        // Show timer
        return (
            <div className="timer">
                <div className="timerMinutes">{minutesString}</div>
                <div className="timerSeparator">:</div>
                <div className="timerSeconds">{secondsString}</div>
            </div>
        );
    } else {
        // Show time up message
        return (
            <div className="timerTimesUpMessage">
                <div className="text-3xl">Calculating...</div>
                <div className="text-xl">(be patient & refresh)</div>
            </div>
        );
    }
};

export default CountdownTimer;
