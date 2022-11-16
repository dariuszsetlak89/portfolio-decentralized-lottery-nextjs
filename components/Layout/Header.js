import Image from "next/image";

export default function Header() {
    return (
        <div className="px-10 py-5 flex border-b-4 border-blue-400">
            <div className="headerBall">
                <Image
                    src="/images/lotto-balls/lotto-ball-yellow.png"
                    alt="Lotto ball yellow"
                    width={100}
                    height={100}
                    className="hover:animate-spin"
                />
            </div>
            <div className="headerCaption">
                <Image
                    src="/images/decentralized-lottery-caption.png"
                    alt="Decentralized lottery wordart caption"
                    width={1000}
                    height={150}
                    priority="true"
                />
            </div>

            <div className="headerBall">
                <Image
                    src="/images/lotto-balls/lotto-ball-yellow.png"
                    alt="Lotto ball yellow"
                    width={100}
                    height={100}
                    className="hover:animate-spin"
                />
            </div>
        </div>
    );
}
