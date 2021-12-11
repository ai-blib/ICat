//金币映射
const coinResourceMap = {
    0: 'coin',
    1: 'yx',
    2: 'zw'
};
class Interactive {
    callBackGetApi: Function | any = undefined;

    public receiveCoin: any = []; //可令金币
    public goldCoinTime: number = 0;
    public setResolve: Function | any;
    public resourceStatus: Boolean | any = true;
    public switch3d: boolean | any;
    private firstLoad: boolean | any = false;
    public timeStart: number = 0;
    public catClickFn: Function | any;
    public placeCoin: any = null;
    constructor() {}
    //记录可见时间
    pageVisible() {
        this.timeStart = new Date().getTime();
    }
    // 金币填充时间
    public async setGoldCoinInfo(list: [any]) {
        this.receiveCoin = [];
        //所有的金币实例
        const Coins = require('../goldCoin').default;
        // 删除不存在的金币
        const removes = [5, 4, 3, 2, 1].slice(0, 5 - list.length);
        for (const _i of removes) {
            const coin = Coins.coins['key' + _i];
            coin.remove();
        }
        // 循环填充对应的金币的数据
        for (const index in list) {
            const _item = list[index];
            // 取出相应的coin 实例
            const coin = Coins.coins['key' + (Number(index) + 1)];

            // 筛选不存在的数据
            if (_item.taskId < 0) {
                coin.remove();
                continue;
            }
            if (_item.id === coin.id) {
                continue;
            }
            // await coin.isReadyOver();
            //可领取的金币统计
            if (_item.bubbleType === 0) {
                this.receiveCoin.push(coin);
            }

            //填充coin数据
            await coin.setCoinResourceAndType(
                coinResourceMap[_item.bubbleType],
                _item.title,
                _item.score,
                _item.bubbleType,
                _item,
                index
            );
            // 填充完后播放  只播放一次
            if (!this.firstLoad) {
                await coin.play(index);
            }

            //几录第一个是否是占位金币
            if (Number(index) === 0 && (_item.bubbleType === 1 || _item.bubbleType === 2)) {
                this.placeCoin = coin;
            }
        }
        this.firstLoad = true;
        //统计可领取金币
        this.goldCoinTime = list.filter(_item => _item.bubbleType === 0).length;
        //轮询闪动
        this.rotationCoinShake();
    }
    // 注册猫咪的点击回调
    catClickRegister(fn) {
        this.catClickFn = fn;
    }

    // 猫咪的点击触发
    catClickControl() {
        this.catClickFn && this.catClickFn();
    }
    //循环播放coin 闪动
    async rotationCoinShake() {
        let index = 0,
            len = this.receiveCoin.length;
        for (const i of this.receiveCoin) {
            if (i && i.playShake) {
                if (i.coinSpriteAnimation.resource !== 'shine') {
                    continue;
                }
                await i.playShake();
            }
            index++;
            if (index === len) {
                this.rotationCoinShake();
            }
        }
    }
    //2d 动画触发和3d动画的事件
    coinClick(index) {
        const Coins = require('../goldCoin').default;
        const coin = Coins.coins['key' + (index + 1)];
        coin.coinClickCallback();
    }
    //触发猫咪的招手
    helloAction() {
        const cat = require('../cat').default;
        cat.switchAnimation('hello', 1, () => {
            cat.switchAnimation('loop', Infinity);
        });
    }

    getPlaceCoin(value: number) {
        if (this.placeCoin) {
            this.placeCoin.goldCoinIndex.zIndex = value;
        }
    }

    //领基础分触发金币的tip
    public showBasicScoreGuide(index) {
        const Coins = require('../goldCoin').default;
        //金币实例
        const coin = Coins.coins['key' + (index + 1)];
        coin.setTip2({ desc: '领取激活奖励，可获额外活力值' });
    }

    //金币结束事件 和点击事件
    public coinFallOve(
        position: { x: number; y: number },
        index: number,
        type?: string,
        data?: any
    ): Promise<any> {
        const Coins = require('../goldCoin').default;
        [0, 1, 2, 3, 4].forEach(item => {
            if (item != Number(index)) {
                Coins.coins['key' + (item + 1)].clearTip();
            }
        });
        return this.callBackGetApi && this.callBackGetApi(position, index, type, data);
    }

    //注册回调
    public registerFunction(callBackGetApi: Function): void {
        this.callBackGetApi = callBackGetApi;
    }

    setStatus(value) {
        this.resourceStatus = value;
        // this.setResolve&&this.setResolve(value)
    }


    getAndroidVersion(ua?: any) {
        ua = (ua || navigator.userAgent).toLowerCase();
        var match = ua.match(/android\s([0-9\.]*)/);
        return match ? match[1] : false;
    }
}

const InteractiveController = new Interactive();
export default InteractiveController;
