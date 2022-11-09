import Image from "next/image";

export default function Header() {
    return (
        <div className="px-10 py-5 flex border-b-4 border-amber-400">
            <div className="basis-1/6 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                <Image
                    src="/images/lotto-balls/lotto-ball-yellow.png"
                    alt="Lotto ball yellow"
                    width={100}
                    height={100}
                />
            </div>
            <div className="m-auto basis-4/6 flex-none justify-center">
                <Image src="/images/decentralized-lottery-caption.png" alt="Snake wordart" width={1000} height={150} />
            </div>

            <div className="basis-1/6 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                <Image
                    src="/images/lotto-balls/lotto-ball-yellow.png"
                    alt="Lotto ball yellow"
                    width={100}
                    height={100}
                />
            </div>
        </div>
    );
}
