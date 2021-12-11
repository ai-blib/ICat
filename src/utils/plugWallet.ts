
const whitelist =["oexpe-biaaa-aaaah-qcf6q-cai","gagfc-iqaaa-aaaah-qcdvq-cai","onuey-xaaaa-aaaah-qcf7a-cai",process.env.REACT_APP_WICP_CANISTER_ID,process.env.REACT_APP_XTC_CANISTER_ID,process.env.REACT_APP_SWAP_CANISTER_ID,process.env.REACT_APP_LEDGER_CANISTER_ID,process.env.REACT_APP_SWAP_STORAGE_CANISTER_ID]
const host = process.env.REACT_APP_HOST || '';
const updateWhiteList:string[] =[];
export default class PlugWallet {
    // @ts-ignore
    static whitelist: [string] =whitelist;
    static host: string = host;

    static async verifyConnectionAndAgent() {
        // @ts-ignore
        const connected = await window.ic.plug.isConnected();
        // @ts-ignore
        // @ts-ignore
        if (!connected) await window.ic.plug.requestConnect({whitelist:this.whitelist, host});
        // @ts-ignore
        // @ts-ignore
        if (connected && !window.ic.plug.agent) {
            // @ts-ignore
            await window.ic.plug.createAgent({whitelist:this.whitelist, host})
        }
    }

    static async updateAgentWhitelist(canisterId:string) {
        if (updateWhiteList.includes(canisterId)){
                return ;
        }
        updateWhiteList.push(canisterId);
        // @ts-ignore
       return  await window.ic.plug.createAgent({whitelist:[canisterId], host})

    }
    static async connect(){
        // @ts-ignore
        return  await window?.ic?.plug.requestConnect({
            whitelist,
            host,
        });
    }

}
