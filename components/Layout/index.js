import { useMoralis, useWeb3Contract } from "react-moralis";
import Header from "./Header";
import Connector from "./Connector";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="font-sans pt-10 pb-40 bg-amber-200">
            <div
                className="mx-auto max-w-4xl overflow-hidden border-4
                border-amber-400 rounded-xl bg-gradient-to-r bg-amber-300"
            >
                <Header />
                <Connector>
                    <div>{children}</div>
                </Connector>
                <Footer className="fixed bottom-0 left-0 bg-red-500 w-screen" />
            </div>
        </div>
    );
}
