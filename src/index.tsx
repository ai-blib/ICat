import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./views";
// import store from "./redux/store";
import "./index.css";
import {fontResize} from "./utils/fontResize";
import rewriteFixed from "./utils/rewriteFixed";

import ThemeProvider from './theme/index';
import {ProvideAuth} from './usehooks/useAuth'
import {ProvideMessage} from './usehooks/useNotification'
import {NotificationWrap} from '@/components';

fontResize();
rewriteFixed();
ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider>
            <ProvideMessage>
                <ProvideAuth>
                    <App/>
                </ProvideAuth>
                <NotificationWrap/>
            </ProvideMessage>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
