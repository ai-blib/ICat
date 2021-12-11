import { configureStore } from "@reduxjs/toolkit";
import selectedReducer from "./features/selected";
import selectedIndexReducer from "./features/selectedIndex";
import hdWalletsReducer from "./features/hdWallets";
import importedAccountsReducer from "./features/importedAccounts";
import dfinityIdentityReducer from "./features/dfinityIdentity";
import dfinitySubAccountsReducer from "./features/dfinitySubAccounts";
import passwordReducer from "./features/password";
import ICPBalReducer from "./features/ICPBal";
import loggedInReducer from "./features/loggedIn";
import tokenPriceReducer from "./features/tokenPrice";
import tokenInfoReducer from "./features/tokenInfo";
import tokenMetaDataReducer from "./features/tokenMetaData";
import lpInfoReducer from "./features/lpInfo";
import lpPriceReducer from "./features/lpPrice";
import notificationReducer from "./features/notification";
import plugWallet from "./features/plugWallet";
const store = configureStore({
  reducer: {
    selected: selectedReducer,
    selectedIndex: selectedIndexReducer,
    hdWallets: hdWalletsReducer,
    importedAccounts: importedAccountsReducer,
    dfinityIdentity: dfinityIdentityReducer,
    dfinitySubAccounts: dfinitySubAccountsReducer,
    password: passwordReducer,
    ICPBal: ICPBalReducer,
    loggedIn: loggedInReducer,
    tokenPrice: tokenPriceReducer,
    tokenInfo: tokenInfoReducer,
    tokenMetaData: tokenMetaDataReducer,
    lpInfo: lpInfoReducer,
    lpPrice: lpPriceReducer,
    notification: notificationReducer,
    plugWallet:plugWallet
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
