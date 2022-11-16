import Header from "./Header";
import Connector from "./Connector";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="outerBackground">
            <div className="innerBackground">
                <Header />
                <Connector>
                    <div>{children}</div>
                </Connector>
                <Footer className="footer" />
            </div>
        </div>
    );
}
