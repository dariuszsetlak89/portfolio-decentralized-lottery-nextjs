import Image from "next/image";

export default function Footer() {
    return (
        <footer>
            <div className="pt-5 pb-2 flex">
                <div className="footerBall">
                    <Image
                        src="/images/lotto-balls/lotto-ball-green.png"
                        alt="Lotto ball yellow"
                        width={75}
                        height={75}
                        className="hover:animate-spin"
                    />
                </div>
                <div className="footerBall">
                    <Image
                        src="/images/lotto-balls/lotto-ball-yellow.png"
                        alt="Lotto ball yellow"
                        width={75}
                        height={75}
                        className="hover:animate-spin"
                    />
                </div>
                <div className="footerBall">
                    <Image
                        src="/images/lotto-balls/lotto-ball-red.png"
                        alt="Lotto ball yellow"
                        width={75}
                        height={75}
                        className="hover:animate-spin"
                    />
                </div>
                <div className="footerBall">
                    <Image
                        src="/images/lotto-balls/lotto-ball-yellow.png"
                        alt="Lotto ball yellow"
                        width={75}
                        height={75}
                        className="hover:animate-spin"
                    />
                </div>
                <div className="footerBall">
                    <Image
                        src="/images/lotto-balls/lotto-ball-green.png"
                        alt="Lotto ball yellow"
                        width={75}
                        height={75}
                        className="hover:animate-spin"
                    />
                </div>
            </div>
            <div className="footerDescription">
                <span className="footerDescriptionIcon">
                    <a href="mailto:kryptoprogramista89@gmail.com" target="_blank">
                        <Image src="/images/icons/email.png" alt="Email icon" width={30} height={30} />
                    </a>
                </span>
                <span className="footerDescriptionIcon">
                    <a href="https://github.com/dariuszsetlak89" target="_blank">
                        <Image src="/images/icons/github.png" alt="Github icon" width={30} height={30} />
                    </a>
                </span>
                <span className="footerDescriptionText">Copyright © 2022 dariuszsetlak89</span>
                <span className="footerDescriptionIcon">
                    <a href="https://t.me/DarekS89" target="_blank">
                        <Image src="/images/icons/telegram.png" alt="Telegram icon" width={30} height={30} />
                    </a>
                </span>
                <span className="footerDescriptionIcon">
                    <a href="https://twitter.com/kprogramista89" target="_blank">
                        <Image src="/images/icons/twitter.png" alt="Twitter icon" width={30} height={30} />
                    </a>
                </span>
            </div>
        </footer>
    );
}
