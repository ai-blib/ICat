import GoldCoin from './GoldCoin';
const coin_position = {
    'key4': {
        startY: 95,
        startX: 304,
        endY: 98,
        endX: 303.5     // 4
    },
    'key5': {
        startY: 76,
        startX: 135,
        endY: 98,     // 1
        endX: 303.5
    },
    'key2': {
        startY: 95,
        startX: 196,
        endY: 98,      // 2
        endX: 303.5
    },
    'key3': {
        startY: 76,
        startX: 253,           // 3
        endY: 98,
        endX: 303.5
    },
    'key1': {
        startY: 164,
        startX: 213,        // 5
        endY: 98,
        endX: 303.5
    }

};
export default class Coins {
    static coins: {};
     public static coin_position=coin_position;
    constructor() {
    }
    static createCoin() {
        this.coins = {};
        //创建金币
        return new Promise(async (resolve) => {
            Object.entries(this.coin_position).forEach((_item) => {
                this.coins[_item[0]] = new GoldCoin(_item[1]).load();
            });
            resolve(true);
        });
    }
    //播放金币
    static coinAnimation(list) {
        return new Promise(async (resolve) => {
            for (const n in list) {
                   await this.coins['key' + Number(n)+1].play(n,true);
            }
            resolve(true);
        });
    }
}
