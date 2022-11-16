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
            <p className="p-2 text-center font-medium text-xl text-blue-600">Copyright © 2022 dariuszsetlak89</p>
        </footer>
    );
}
