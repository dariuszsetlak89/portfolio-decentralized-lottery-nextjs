import Image from "next/image";

export default function Header() {
    return (
        <footer>
            <div className="pt-5 pb-2 flex">
                <div className="basis-1/5 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                    <Image
                        src="/images/lotto-balls/lotto-ball-green.png"
                        alt="Lotto ball yellow"
                        width={75}
                        height={75}
                    />
                </div>
                <div className="basis-1/5 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                    <Image
                        src="/images/lotto-balls/lotto-ball-yellow.png"
                        alt="Lotto ball yellow"
                        width={75}
                        height={75}
                    />
                </div>
                <div className="basis-1/5 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                    <Image
                        src="/images/lotto-balls/lotto-ball-red.png"
                        alt="Lotto ball yellow"
                        width={75}
                        height={75}
                    />
                </div>
                <div className="basis-1/5 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                    <Image
                        src="/images/lotto-balls/lotto-ball-yellow.png"
                        alt="Lotto ball yellow"
                        width={75}
                        height={75}
                    />
                </div>
                <div className="basis-1/5 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                    <Image
                        src="/images/lotto-balls/lotto-ball-green.png"
                        alt="Lotto ball yellow"
                        width={75}
                        height={75}
                    />
                </div>
            </div>
            <p className="p-2 text-center font-medium text-2xl text-amber-600">Copyright © 2022 dariuszsetlak89</p>
        </footer>
    );
}
