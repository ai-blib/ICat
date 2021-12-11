import { GameObject, RESOURCE_TYPE } from '@eva/eva.js';
import { Img, ImgSystem } from '@eva/plugin-renderer-img'; // 引入渲染图片所需要的组件和系统
import { Text, TextSystem } from '@eva/plugin-renderer-text';
import { Transition, TransitionSystem } from '@eva/plugin-transition';
import { SpriteAnimation, SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { Event, EventSystem, HIT_AREA_TYPE } from '@eva/plugin-renderer-event';
import { Render } from '@eva/plugin-renderer-render';
import RenderAni from '../render';
import Feeder from '../feeder';
import cat from '../cat';
import InteractiveController from '../controller';
import { NinePatchSystem } from '@eva/plugin-renderer-nine-patch';
import { POINT } from '../trackerPoint';
import { tip } from './position';

// 资源
export const Source = [
    {
        name: 'coin',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/coin.png'
            }
        },
        preload: true
    },
    {
        name: 'coinFrameAnimation',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/coin_Ani_3X.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/coin_Ani_3X.json'
            }
        },
        preload: true
    },
    {
        name: 'yx',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/coin/coin_yx.png'
            }
        },
        preload: true
    },
    {
        name: 'zw',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/coin/coin_zw.png'
            }
        },
        preload: true
    },
    {
        name: 'shine',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/shine/coin_light.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/shine/coin_light.json'
            }
        },
        preload: true
    },
    {
        name: 'hand',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/hand.png'
            }
        },
        preload: true
    },
    {
        name: 'tip1',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/tip.png'
            }
        },
        preload: true
    },
    {
        name: 'tip2',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/tip2.png'
            }
        },
        preload: true
    },
    {
        name: 'tip3',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/tip3.png'
            }
        },
        preload: true
    },
    {
        name: 'tip3',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/tip4.png'
            }
        },
        preload: true
    },
    {
        name: 'arraw',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/arraw.png'
            }
        },
        preload: true
    }
];

export default class GoldCoin {
    coin = null;
    width = 44;
    height = 44;
    goldAnimation = null;
    BG = null;
    startY = 0;
    startX = 200;
    endX = 200;
    endY = 100;
    speed = 0;
    flag = true;
    private removeIs: boolean = false;
    private goldCoinTransition: Transition | any;
    private goldCoin: GameObject | any;
    private coinFrameAnimation: GameObject | any = null;
    private title: any;
    private speedTime: number | any;
    private text0: any;
    private text1: any;
    private event: Event | any;
    private text1Transition: Transition | any;
    private frameAnimationTransition: SpriteAnimation | any;
    private callBack: Function | undefined;
    public coinSpriteAnimation: SpriteAnimation | any;
    public titleText: any;
    private text1_score: any;
    private text0_score: any;
    private coinType: number | null = null;
    private goldCoinEvent: any;
    private coinData: any = {};
    private goldCoinImg: any;
    private isRemoveFrameAnimation: Boolean = false;
    private title_T: GameObject | any;
    private title2Text: any;
    private endAnimationCallback: Function | any;
    private coinIndex: number | any;
    private timer: any;
    private timer_T: number | any;
    private imgHand: GameObject | any;
    private startFloat: Boolean | any = false;
    private titleData: string = '';
    private currentResource: string = '';
    private readyOverStatus: Boolean = false;
    private readyResolve: any = null;
    private removeStart: boolean = false;
    private waitApiBack: any;
    private receiveApiStatus: boolean = true;
    private startLoad: boolean = false;
    private coinFrameAnimationIndex: any;
    private goldCoinIndex: any;
    private tip: GameObject | any;
    private tipPatch: any;
    private tipEvent: any;
    private arraw: GameObject | any;
    private tipText: any;
    private tipTextButn: any;
    private tiptextobj: GameObject | any;
    private tipBtnObj: GameObject | any;
    private tip2: GameObject | any;
    private tipPatch2: any;
    private tipEvent2: any;
    private arraw2: GameObject | any;
    private tipText2: any;
    private tipTextButn2: any;
    private tiptextobj2: GameObject | any;
    private tipBtnObj2: GameObject | any;
    private isDataChange: boolean | any;
    private typeChange: boolean | any;
    private setTime: NodeJS.Timeout | any;
    private playTime: number | any; //播放时长
    private id: number | any; //唯一标识符

    constructor({ startY, startX, endY, endX }) {
        Object.assign(this, {
            startY,
            startX,
            endY,
            endX
        });

        GoldCoin.initResource();
        this.createGoldCoinGame();
    }
    // 与数据交互
    //注册函数
    public async setCoinResourceAndType(
        resource: string,
        title: string,
        score: number,
        coinType: number,
        _item: any,
        index: number
    ) {
        if (!resource) {
            return;
        }
        //前后数据是否相等
        this.isDataChange = JSON.stringify(_item) === JSON.stringify(this.coinData);
        this.typeChange =
            _item.bubbleType === this.coinData.bubbleType || this.coinData.bubbleType === undefined;
        // 该金币是否是已删除
        if (!this.removeIs) {
            if (
                this.coinData &&
                this.coinData.taskId === 501 &&
                this.coinData.bubbleType === 0 &&
                this.coinData.exposureDaysTillToday <= 1
            ) {
                this.setTip2({ desc: '恭喜您完成新人引导', buttonText: '请领取新人福利' });
            }
        }
        //页面刷新避免重复加载创建金币，跟据金币数据前后是否相等，并且是否删除掉了
        if (this.isDataChange && !this.removeIs) {
            return;
        }
        // 阻塞事件。
        //解决问题：金币正在掉落过程中，有新的数据出现，造成金币错乱。等待金币已经删除完成后重新加载数据，展示新的金币
        await this.waitEndReceive();
        //如果删除了 就重新添加组件
        if (this.removeIs) {
            await this.addComponent(resource);
        }
        //填数据
        this.titleData = title;
        this.currentResource = resource;
        this.coinType = coinType;
        this.coinData = _item;
        this.coinIndex = index;
        this.switchCoinAnimation(this.coinType, this.currentResource);
        this.setTitle(this.titleData);
        this.setScoreValue(score);
        this.id = _item.id;
        if (this.removeIs) {
            this.startLoad = false;
            await this.play(index);
        }
        return true;
    }

    // coinType   0-任务气泡，1-营销气泡，2-占位气泡
    public switchCoinAnimation(coinType: number, resource: string) {
        switch (coinType) {
            case 0:
                this.hideAndShowSpriteAnimation(1);
                this.hideAndShowTransition(0);
                if (!this.typeChange) {
                    this.frameAnimationTransition.play('float', Infinity);
                }
                this.goldCoinImg.resource = 'coin';
                this.coinSpriteAnimation.resource = 'shine';
                return;
            case 1:
                if (this.coinIndex == 0 && !cat.defaultAnimation()) {
                    this.goldCoinIndex.zIndex = 1;
                } else {
                    this.goldCoinIndex.zIndex = 55;
                }
                this.hideAndShowSpriteAnimation(0);
                this.hideAndShowTransition(1);
                this.goldCoinImg.resource = resource;
                return;
            case 2:
                if (this.coinIndex == 0 && !cat.defaultAnimation()) {
                    this.goldCoinIndex.zIndex = 1;
                } else {
                    this.goldCoinIndex.zIndex = 55;
                }
                this.hideAndShowSpriteAnimation(0);
                this.hideAndShowTransition(1);
                this.goldCoinImg.resource = resource;
                return;
            default:
                return;
        }
    }

    //设置title
    setTitle(title: string) {
        //title 居中显示
        let switchTitle = false;
        if (this.timer) {
            clearInterval(this.timer);
        }
        if (!title || !this.title_T) {
            return;
        }
        if (this.coinType == 1) {
            this.title_T.transform.scale = { x: 1, y: 1 };

            if (this.coinData.countDown) {
                let time = this.coinData.countDown / 1000;
                const setTitle2 = () => {
                    if (this.removeIs) {
                        clearInterval(this.timer);
                    }
                    title = this.coinData.countDown;
                    this.title2Text.style.wordWrapWidth = this.width * 4;
                    this.title_T.transform.position.x = -(((title.length - 1) / 2) * 4);
                    this.title2Text.text = title || '';
                    time -= 1;
                    if (time === 0) {
                        clearInterval(this.timer);
                    }
                };
                setTitle2();
                this.timer = setInterval(() => {
                    setTitle2();
                }, 1000);
            } else {
                if (title.length <= 6) {
                    this.title_T.transform.position.x = 24 - (title.length + 1) * 4;
                    this.title2Text.text = title || '';
                } else {
                    this.title_T.transform.position.x = -8;
                    this.title2Text.text = `${title.slice(0, 6)}  ${title.slice(6, 13)}${
                        title.length > 12 ? '...' : ''
                    }`;
                }
            }

            //可领金币
        } else if (this.coinType == 0) {
            if (this.timer_T) {
                clearInterval(this.timer_T);
            }

            const setTitle = () => {
                if (this.isRemoveFrameAnimation) {
                    clearInterval(this.timer_T);
                }
                if (!switchTitle) {
                    this.imgHand.transform.scale = { x: 1, y: 1 };
                    let statictitle = '点击领取';
                    this.titleText.text = statictitle;
                    this.title.transform.position.x = 15 - (statictitle.length - 1) * 4;
                    this.title.transform.scale = { x: 1, y: 1 };
                    switchTitle = true;
                } else {
                    this.title.transform.scale = { x: 1, y: 1 };
                    if (title.length <= 6) {
                        this.title.transform.position.x = 24 - (title.length + 1) * 4;
                        this.titleText.text = title || '';
                    } else {
                        this.title.transform.position.x = -6;
                        this.titleText.text = `${title.slice(0, 6)}  ${title.slice(6, 13)}${
                            title.length > 12 ? '...' : ''
                        }`;
                    }
                    this.imgHand.transform.scale = { x: 0, y: 0 };
                    switchTitle = false;
                }
            };
            setTitle();
            this.timer_T = setInterval(() => {
                setTitle();
            }, 3000);
        } else if (this.coinType == 2) {
            this.title_T.transform.scale = { x: 1, y: 1 };
            if (title.length <= 6) {
                //2 8 3 - 4 4-12 5-16 6- 20
                this.title_T.transform.position.x = 24 - (title.length + 1) * 4;
                this.title2Text.text = title || '';
            } else {
                this.title_T.transform.position.x = -8;
                this.title2Text.text = `${title.slice(0, 6)}  ${title.slice(6, 13)}${
                    title.length > 12 ? '...' : ''
                }`;
            }
        }
    }

    //设置活力值
    setScoreValue(score) {
        if (!this.title) {
            clearInterval(this.timer);
            return;
        }
        if (this.coinType === 2) {
            // score = '明日 可领';
            // this.text0.transform.position.x = 10;
            // this.text0.transform.position.y = 7;
            // this.text1.transform.position.x = 16 - ((String(score).length - 1) * 3);
            // this.text0_score.style.fontSize = 8;
        } else {
            this.text0.transform.position.x = 18 - (String(score).length - 1) * 3;
            this.text0.transform.position.y = 18;
            this.text1.transform.position.x = 18 - (String(score).length - 1) * 3;

            this.text0_score.style.fontSize = 11;
            this.text0_score.text = score;
            this.text1_score.text = score;
        }
    }

    private waitEndReceive() {
        return new Promise((resolve, reject) => {
            if (this.receiveApiStatus) {
                resolve(true);
            }
            this.waitApiBack = resolve;
        });
    }

    private static initResource() {
        RenderAni.addResource(Source).addSystem([
            new NinePatchSystem(),
            new TextSystem(),
            new TransitionSystem(),
            new SpriteAnimationSystem(),
            new ImgSystem(),
            new EventSystem()
        ]);
    }

    private initGameObj() {
        if (!this.goldCoin || !this.coinFrameAnimation) return;

        this.goldCoin.transform.position = {
            x: this.startX,
            y: -50
        };
        this.coinFrameAnimation.transform.position = {
            x: this.startX,
            y: this.startY
        };
    }

    private addComponent(resource?: string) {
        this.addGoldComponent(resource);
        this.coinFrameAnimationAddComponent();
        this.showTip();
        this.showTip2();
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 500);
        });
    }

    //静态动画的相关组件
    private addGoldComponent(resource?: string) {
        if (this.goldCoin && this.goldCoin.components.some(_i => _i.name == 'Transition')) {
            return;
        }
        // 添加金币文案
        this.goldCoin.addChild(this.numberText(0));
        this.goldCoinEvent = this.goldCoin.addComponent(
            new Event({
                hitArea: {
                    type: HIT_AREA_TYPE.Circle,
                    style: {
                        x: 20,
                        y: 10,
                        radius: 30
                    }
                }
            })
        );
        this.goldCoinImg = this.goldCoin.addComponent(
            new Img({
                resource: resource || 'coin'
            })
        );
        this.goldCoin.addChild(this.title_T);
        this.goldCoinTransition = this.goldCoin.addComponent(new Transition());
        this.title2Text = this.title_T.addComponent(
            new Text({
                text: '',
                style: {
                    fontFamily: 'fzlt',
                    fontSize: 9,
                    fill: ['#905D3C'], // gradient
                    leading: 1,
                    wordWrap: true,
                    align: 'center',
                    wordWrapWidth: 20
                }
            })
        );
        this.animationGroup();
    }

    //帧动画的组件
    coinFrameAnimationAddComponent() {
        //判断是否重复删除
        if (this.coinFrameAnimation.components.some(_i => _i.name == 'SpriteAnimation')) {
            return;
        }
        this.titleText = this.title.addComponent(
            new Text({
                text: '',
                style: {
                    fontFamily: 'fzlt',
                    fontSize: 9,
                    fill: ['#905D3C'], // gradient
                    leading: 1,
                    align: 'center',
                    wordWrap: true,
                    wordWrapWidth: 20
                }
            })
        );

        // this.goldCoin.addChild(this.title);
        this.imgHand.addComponent(
            new Img({
                resource: 'hand'
            })
        );

        // 添加金币文案
        this.coinFrameAnimation.addChild(this.numberText(1));
        this.coinFrameAnimation.addChild(this.title);
        this.coinFrameAnimation.addChild(this.imgHand);
        this.event = this.coinFrameAnimation.addComponent(
            new Event({
                hitArea: {
                    type: HIT_AREA_TYPE.Circle,
                    style: {
                        x: 20,
                        y: 10,
                        radius: 30
                    }
                }
            })
        );

        this.coinSpriteAnimation = this.coinFrameAnimation.addComponent(
            // @ts-ignore
            new SpriteAnimation({
                resource: 'shine',
                speed: 40
            })
        );
        // this.coinSpriteAnimation.stop();
        // 注册过渡动画
        this.frameAnimationTransition = this.coinFrameAnimation.addComponent(new Transition());
        this.coinFrameAnimationGroup();
    }

    //tip 提示
    showTip() {
        this.tipPatch = this.tip.addComponent(
            new Img({
                resource: 'tip3'
            })
        );
        this.tip.addComponent(
            new Render({
                zIndex: 200
            })
        );
        this.arraw.addComponent(
            new Img({
                resource: 'arraw'
            })
        );
        this.tipText = this.tiptextobj.addComponent(
            new Text({
                text: '气泡营销 气泡营销',
                style: {
                    fontFamily: 'fzlt',
                    fontSize: 12,
                    fill: ['#fff'], // gradient
                    leading: 1,
                    wordWrap: false,
                    wordWrapWidth: 120
                }
            })
        );
        this.tipTextButn = this.tipBtnObj.addComponent(
            new Text({
                text: '去借款',
                style: {
                    fontFamily: 'fzlt',
                    fontSize: 12,
                    fill: ['#fcab32'], // gradient
                    leading: 1,
                    wordWrap: true,
                    wordWrapWidth: 20
                }
            })
        );
        this.tipEvent = this.tip.addComponent(new Event());
        this.goldCoin.addChild(this.tip);
        this.tip.addChild(this.tiptextobj);
        this.tip.addChild(this.tipBtnObj);
        this.tip.addChild(this.arraw);

        // this.coinFrameAnimation.addChild(this.tip);
    }
    // tip 提示
    showTip2() {
        this.tipPatch2 = this.tip2.addComponent(
            new Img({
                resource: 'tip3'
            })
        );
        this.tip2.addComponent(
            new Render({
                zIndex: 200
            })
        );
        this.arraw2.addComponent(
            new Img({
                resource: 'arraw'
            })
        );
        this.tipText2 = this.tiptextobj2.addComponent(
            new Text({
                text: '气泡营销 气泡营销',
                style: {
                    fontFamily: 'fzlt',
                    fontSize: 12,
                    fill: ['#fff'], // gradient
                    leading: 1,
                    wordWrap: false,
                    wordWrapWidth: 120
                }
            })
        );
        this.tipTextButn2 = this.tipBtnObj2.addComponent(
            new Text({
                text: '去借款',
                style: {
                    fontFamily: 'fzlt',
                    fontSize: 12,
                    fill: ['#fcab32'], // gradient
                    leading: 1,
                    wordWrap: true,
                    wordWrapWidth: 20
                }
            })
        );
        this.tip2.addChild(this.tiptextobj2);
        this.tip2.addChild(this.tipBtnObj2);
        this.tip2.addChild(this.arraw2);
        this.coinFrameAnimation.addChild(this.tip2);
    }

    // 删除tip
    removeTip() {
        this.tip.removeComponent(Img);
        this.tip.removeComponent(Render);
        this.arraw.removeComponent(Img);
        this.tiptextobj.removeComponent(Text);
        this.tipBtnObj.removeComponent(Text);
        this.tip.removeComponent(Event);

        this.tip2.removeComponent(Img);
        this.tip2.removeComponent(Render);
        this.arraw2.removeComponent(Img);
        this.tiptextobj2.removeComponent(Text);
        this.tipBtnObj2.removeComponent(Text);
        this.coinFrameAnimation.removeChild(this.tip2);
        this.goldCoin.removeChild(this.tip);
    }

    public play(index) {
        // if (!this.removeIs) {
        //     return;
        // }
        this.isRemoveFrameAnimation = false;

        this.removeIs = false;
        this.removeStart = false;
        // Render.renderGame(this.coinFrameAnimation);
        // 除了第一次，其他都运行
        if (!this.flag) {
            this.initGameObj();
        }
        this.flag = false;
        this.speedTime = (5 - index) * 30;
        this.controlAnimation();
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 200);
        });
    }

    public isReadyOver() {
        return new Promise((resolve, reject) => {
            if (this.readyOverStatus) {
                resolve(true);
            } else {
                this.readyResolve = resolve;
            }
        });
    }
    private hiddenOrShowCoinFrameAnimation(value) {
        this.coinFrameAnimation.transform.scale = { x: value, y: value };
    }
    private hiddenOrShowGoldCoin(value) {
        this.goldCoin.transform.scale = { x: value, y: value };
    }
    private controlAnimation() {
        //可令金币
        if (this.coinType === 0) {
            this.hiddenOrShowCoinFrameAnimation(1);
            this.frameAnimationTransition.group && this.frameAnimationTransition.play('drop', 1);
        } else {
            this.hiddenOrShowGoldCoin(1);
            this.goldCoinTransition.play('drop', 1);
        }
        //首次添加事件
        if (!this.startLoad) {
            this.startLoad = true;
            this.coinClick();
            this.addEventListenerCoin();
        }
    }
    // 加载
    public load() {
        this.addComponent();
        this.goldCoinIndex = RenderAni.renderGame(this.goldCoin, 55);
        this.coinFrameAnimationIndex = RenderAni.renderGame(this.coinFrameAnimation, 55);

        return this;
    }

    private remove() {
        this.hideAndShowSpriteAnimation(0);
        this.hideAndShowTransition(0);
        this.removeStart = true;
        this.removeGoldCoin();
        this.removeFrameAnimation();
        this.removeTip();
        this.removeIs = true;
        this.endAnimationCallback &&
            this.endAnimationCallback(
                this.coinSpriteAnimation && this.coinSpriteAnimation.resource === 'shake'
            );
        clearInterval(this.timer);
        clearInterval(this.timer_T);
    }

    // 删除帧动画
    public async removeFrameAnimation() {
        if (!this.coinSpriteAnimation) {
            return;
        }
        //判断是否重复删除
        if (!this.coinFrameAnimation.components.some(_i => _i.name == 'SpriteAnimation')) {
            return;
        }
        this.coinSpriteAnimation.stop();
        this.coinFrameAnimation.removeComponent(SpriteAnimation);
        this.coinFrameAnimation.removeComponent(Transition);
        this.coinFrameAnimation.removeComponent(Event);
        this.title && this.title.removeComponent(Text);
        this.text1 && this.text1.removeComponent(Text);
        this.imgHand.removeComponent(Img);
        this.isRemoveFrameAnimation = true;
        // RenderAni.removeGameObj(this.coinFrameAnimation);

        // }
    }

    //删除金币
    removeGoldCoin() {
        if (!this.goldCoin.components.some(_i => _i.name == 'Transition')) {
            return;
        }
        this.goldCoin.removeComponent(Transition);
        this.goldCoin.removeComponent(Img);
        this.goldCoin.removeComponent(Event);
        this.text0 && this.text0.removeComponent(Text);
        this.title_T && this.title_T.removeComponent(Text);
    }

    coinClick() {
        //金币点击事件
        this.goldCoinEvent &&
            this.goldCoinEvent.on('tap', () => {
                if (this.coinData && this.coinData.desc && this.coinData.bubbleType === 1) {
                    this.setTip(this.coinData);
                }
                const position = this.goldCoin.transform.position;
                InteractiveController.coinFallOve(position, this.coinIndex);
                POINT.click({
                    tgt_event_id: 'h5_ACT_privilege_catdh',
                    tgt_name: 'h5-ACT-成长权益-权益猫动画',
                    param2: 'coin'
                });
            });
        // 帧动画金币点击事件
        this.event.on('tap', () => {
            this.coinClickCallback();
        });
        //tip 点击
        this.tipEvent &&
            this.tipEvent.on('tap', () => {
                if (!this.tip.transform.scale.x || !this.tip.transform.scale.y) {
                    return;
                }
                const position = this.goldCoin.transform.position;
                InteractiveController.coinFallOve(position, this.coinIndex, 'tip', this.coinData);
            });
    }

    //营销弹窗
    //设置tip
    setTip({ desc, buttonText }) {
        if (!this.tipText) {
            return;
        }
        this.tipText.text = desc;
        this.tipTextButn.text = buttonText;
        this.tip.transform.scale = {
            x: 1,
            y: 1
        };
        this.goldCoinIndex.zIndex = 200;
        const len = (desc + (buttonText || '')).length;
        let type = 'tip1';
        if (len > 12) {
            type = 'tip3';
        } else if (len > 5 && len <= 12) {
            type = 'tip2';
        }
        const obj = tip[type];
        this.tipPatch.resource = type;
        this.tip.transform.size = obj.container.size;
        this.tip.transform.position = obj.container.position;
        this.arraw.transform.position = obj.arraw.position;
        this.tipBtnObj.transform.position = obj.tipBtnObj.position;
        if (!this.setTime) {
            clearTimeout(this.setTime);
        }
        this.setTime = setTimeout(() => {
            this.tip.transform.scale = {
                x: 0,
                y: 0
            };
            this.goldCoinIndex.zIndex = 55;
        }, 6000);
    }

    setTip2({ desc, buttonText }) {
        this.tipText2.text = desc;
        this.tipTextButn2.text = buttonText;
        this.tip2.transform.scale = {
            x: 1,
            y: 1
        };
        if (!buttonText) {
            this.arraw2.transform.scale = {
                x: 0,
                y: 0
            };
            this.tip2.transform.size.width = 184;
            this.tip2.transform.position.x = -130;
        } else {
            this.arraw2.transform.scale = {
                x: 1,
                y: 1
            };
            this.tiptextobj2.transform.width = 132;
        }
        this.coinFrameAnimationIndex.zIndex = 200;
        const len = (desc + (buttonText || '')).length;
        let type = 'tip1';
        if (len > 12) {
            type = 'tip3';
        } else if (len > 5 && len <= 12) {
            type = 'tip2';
        }
        this.tipPatch2.resource = type;
        if (!this.setTime) {
            clearTimeout(this.setTime);
        }
        this.setTime = setTimeout(() => {
            this.tip2.transform.scale = {
                x: 0,
                y: 0
            };
            this.coinFrameAnimationIndex.zIndex = 20;
        }, 6000);
    }

    clearTip() {
        console.log(this.coinIndex, 90);
        clearTimeout(this.setTime);
        this.tip.transform.scale = {
            x: 0,
            y: 0
        };
        if (this.coinIndex == 0 && (this.coinType == 1 || this.coinType == 0)) {
            this.goldCoinIndex.zIndex = 1;
        } else {
            this.goldCoinIndex.zIndex = 55;
        }
        console.log(this.coinIndex);
        this.tip2.transform.scale = {
            x: 0,
            y: 0
        };
        this.coinFrameAnimationIndex.zIndex = 55;
    }

    //金币旋转动画
    switchAnimationRotate() {
        this.coinSpriteAnimation.resource = 'coinFrameAnimation';
        this.coinSpriteAnimation.speed = 30;
        this.coinSpriteAnimation.play(Infinity);
    }
    //隐藏掉title
    hiddenTitle() {
        this.imgHand.transform.scale = { x: 0, y: 0 };
        this.hideAndShowSpriteAnimation(1);
        this.title.transform.scale = { x: 0, y: 0 };
    }
    async coinClickCallback() {
        this.clearTip();
        //传递点击事件
        const position = this.goldCoin.transform.position;
        //当接口又返回的时候再播放
        this.receiveApiStatus = false;
        const res = await InteractiveController.coinFallOve(position, this.coinIndex);
        if (!res) {
            return;
        }
        //点击完后
        //修改层级
        this.goldCoinIndex.zIndex = 59;
        this.coinFrameAnimationIndex.zIndex = 59;
        //记录点击时间
        this.playTime = new Date().getTime();
        POINT.click({
            tgt_event_id: 'h5_ACT_privilege_catdh',
            tgt_name: 'h5-ACT-成长权益-权益猫动画',
            param2: 'coin'
        });
        clearInterval(this.timer);
        clearInterval(this.timer_T);
        // 切换为旋转动画
        this.switchAnimationRotate();
        this.hideAndShowTransition(0);
        // 隐藏掉title
        this.hiddenTitle();
        //文案闪动
        // this.text1Transition.play('flicker', Infinity);
        //播放晃动动画
        this.frameAnimationTransition.play('rock', 1);
        // 帧动画的过渡动画监听结束
        this.frameAnimationTransition.on('finish', name => {
            if (name === 'rock') {
                this.frameAnimationTransition.stop();
                this.frameAnimationTransition.play('move', 1);
                this.hideAndShowTransition(0);
                this.goldCoin.transform.position = {
                    x: this.endX,
                    y: this.endY
                };
            } else if (name === 'move') {
                this.hideAndShowSpriteAnimation(0);
                this.coinSpriteAnimation.speed = 40;
                this.hideAndShowTransition(1);
                // 隐藏title
                this.title_T.transform.scale = { x: 0, y: 0 };
                // 隐藏
                this.goldCoinTransition.play('shake', 1);
            }
        });
    }

    //金币过度动画监听
    addEventListenerCoin() {
        //金币掉落结束
        // InteractiveController.coinFallOve();

        // //播放金闪闪
        // this.coinSpriteAnimation.resource = 'shine';
        // this.coinSpriteAnimation.play(1);
        // this.frameAnimationTransition.play('float', Infinity);
        this.frameAnimationTransition.on('finish', name => {
            if (name === 'drop') {
                if (this.coinType === 0) {
                    //金币掉落结束 播放浮动动画
                    this.frameAnimationTransition.play('float', Infinity);
                    if (
                        this.coinData.taskId === 501 &&
                        this.coinData.bubbleType === 0 &&
                        this.coinData.exposureDaysTillToday <= 1
                    ) {
                        this.setTip2({ desc: '恭喜您完成新人引导', buttonText: '请领取新人福利' });
                        // 领取激活奖励，可获得额外奖励
                    }
                }
            }
        });
        // 金币图片的掉落动画
        this.goldCoinTransition.on('finish', name => {
            if (name === 'drop') {
                //金币掉落结束 播放浮动动画
                if (this.coinType === 1 || this.coinType === 2) {
                    this.goldCoinTransition.play('float', Infinity);
                }
            } else if (name === 'shake') {
                this.goldCoinTransition.play('disappear', 1);
                // 修改层级
                this.goldCoinIndex.zIndex = 20;
                this.coinFrameAnimationIndex.zIndex = 20;
                // 掉落结束
            } else if (name === 'disappear') {
                this.goldFallOver();
            }
        });
        // 回调事件
        this.coinSpriteAnimation.on('complete', () => {
            this.endAnimationCallback &&
                this.endAnimationCallback(this.coinSpriteAnimation.resource === 'shake');
        });
    }
    //播放金闪闪动画
    playShake() {
        return new Promise((resolve, reject) => {
            if (!this.coinSpriteAnimation) {
                return 1;
            }
            this.coinSpriteAnimation.resource = 'shine';
            this.coinSpriteAnimation.play(1);
            this.endAnimationCallback = resolve;
        });
    }

    //过度动画显示隐藏
    hideAndShowTransition(value) {
        this.goldCoin.transform.scale = {
            x: value,
            y: value
        };
        this.text0.transform.scale = {
            x: value,
            y: value
        };
    }

    //帧动画动画显示隐藏
    hideAndShowSpriteAnimation(value) {
        //暂定帧动画
        this.title.transform.scale = {
            x: value,
            y: value
        };
        this.text1.transform.scale = {
            x: value,
            y: value
        };

        this.coinFrameAnimation.transform.scale = {
            x: value,
            y: value
        };
    }
    // 计算动画时间
    public setAnimationDuration() {
        const currentTime = new Date().getTime();
        return currentTime - this.playTime;
    }
    // 金币动画结束
    public goldFallOver() {
        this.goldCoinIndex.zIndex = 55;
        this.coinFrameAnimationIndex.zIndex = 55;
        POINT.imp({
            tgt_event_id: 'h5_ACT_privilege_catdh',
            tgt_name: 'h5-ACT-成长权益-权益猫动画',
            param2: 'coin',
            param3: this.setAnimationDuration()
        });
        // 修改金币的个数
        InteractiveController.goldCoinTime--;
        Feeder.transition.play('shake', 1);
        // 鱼动画
        Feeder.dropFishAction();
        cat.eatFishAction();
        this.remove();
        //金币掉落结束
        this.receiveApiStatus = true;
        this.waitApiBack && this.waitApiBack(true);
    }

    // 数字text
    private numberText(index) {
        let text = 'text' + index;
        this[text] = new GameObject(text, {
            size: {
                width: this.width,
                height: this.height
            },
            origin: {
                x: 0,
                y: 0
            },
            //14
            position: {
                x: 10,
                y: 16
            }
        });
        // @ts-ignore
        this[text + '_score'] = this[text].addComponent(
            new Text({
                text: '',
                style: {
                    fontFamily: 'fzlt_bold',
                    fontSize: 11,
                    fill: ['#C75606'], // gradient
                    leading: 0,
                    wordWrap: true,
                    breakWords: true,
                    whiteSpace: 'true',
                    wordWrapWidth: 40
                }
            })
        );
        this[text + 'Transition'] = this[text].addComponent(new Transition());
        return this[text];
    }

    public createGoldCoinGame() {
        // 创建 game object
        this.goldCoin = new GameObject('coin', {
            size: {
                width: this.width,
                height: this.height
            },
            origin: {
                x: 0,
                y: 0
            },
            position: {
                x: this.startX,
                y: -50
            },
            anchor: {
                x: 0,
                y: 0
            },
            scale: {
                x: 0,
                y: 0
            }
        });
        this.title = new GameObject('title', {
            size: {
                width: this.width,
                height: this.height
            },
            origin: {
                x: 0,
                y: 0
            },
            // 1-13   2-9  3 -5   4-1 5- -3 6 -7
            position: {
                x: 1,
                y: 44
            },
            scale: {
                x: 1,
                y: 1
            }
        });
        this.title_T = new GameObject('title_T', {
            size: {
                width: this.width,
                height: this.height
            },
            origin: {
                x: 0,
                y: 0
            },
            // 1-13   2-9  3 -5   4-1 5- -3 6 -7
            position: {
                x: 1,
                y: 44
            },
            scale: {
                x: 1,
                y: 1
            }
        });
        this.coinFrameAnimation = new GameObject('animation', {
            size: {
                width: this.width,
                height: this.height
            },
            origin: {
                x: 0,
                y: 0
            },
            position: {
                x: this.startX,
                y: this.startY
            },
            anchor: {
                x: 0,
                y: 0
            },
            scale: {
                x: 0,
                y: 0
            }
        });
        this.imgHand = new GameObject('imgHand', {
            size: {
                width: 12,
                height: 12
            },
            origin: {
                x: 0,
                y: 0
            },
            // 1-13   2-9  3 -5   4-1 5- -3 6 -7
            position: {
                x: -12,
                y: 42
            },
            scale: {
                x: 1,
                y: 1
            }
        });

        this.tip = new GameObject('tip', {
            size: {
                width: 252,
                height: 28
            },
            origin: {
                x: 0,
                y: 0
            },
            // 1-13   2-9  3 -5   4-1 5- -3 6 -7
            position: {
                x: -195,
                y: -30
            },
            scale: {
                x: 0,
                y: 0
            }
        });
        this.tiptextobj = new GameObject('tiptextobj', {
            size: {
                width: 132,
                height: 28
            },
            origin: {
                x: 0,
                y: 0
            },
            // 1-13   2-9  3 -5   4-1 5- -3 6 -7
            position: {
                x: 10,
                y: 4
            },
            scale: {
                x: 1,
                y: 1
            }
        });
        this.tipBtnObj = new GameObject('tipBtnObj', {
            size: {
                width: 132,
                height: 28
            },
            origin: {
                x: 0,
                y: 0
            },
            // 1-13   2-9  3 -5   4-1 5- -3 6 -7
            position: {
                x: 130,
                y: 4
            },
            scale: {
                x: 1,
                y: 1
            }
        });
        this.arraw = new GameObject('arraw', {
            size: {
                width: 10,
                height: 10
            },
            origin: {
                x: 0,
                y: 0
            },
            // 1-13   2-9  3 -5   4-1 5- -3 6 -7
            position: {
                x: 230,
                y: 7
            },
            scale: {
                x: 1,
                y: 1
            }
        });

        this.tip2 = new GameObject('tip2', {
            size: {
                width: 225,
                height: 28
            },
            origin: {
                x: 0,
                y: 0
            },
            // 1-13   2-9  3 -5   4-1 5- -3 6 -7
            position: {
                x: -160,
                y: -30
            },
            scale: {
                x: 0,
                y: 0
            }
        });
        this.tiptextobj2 = new GameObject('tiptextobj2', {
            size: {
                width: 132,
                height: 28
            },
            origin: {
                x: 0,
                y: 0
            },
            // 1-13   2-9  3 -5   4-1 5- -3 6 -7
            position: {
                x: 8,
                y: 5
            },
            scale: {
                x: 1,
                y: 1
            }
        });
        this.tipBtnObj2 = new GameObject('tipBtnObj2', {
            size: {
                width: 60,
                height: 28
            },
            origin: {
                x: 0,
                y: 0
            },
            // 1-13   2-9  3 -5   4-1 5- -3 6 -7
            position: {
                x: 120,
                y: 5
            },
            scale: {
                x: 1,
                y: 1
            }
        });
        this.arraw2 = new GameObject('arraw2', {
            size: {
                width: 10,
                height: 10
            },
            origin: {
                x: 0,
                y: 0
            },
            // 1-13   2-9  3 -5   4-1 5- -3 6 -7
            position: {
                x: 210,
                y: 7
            },
            scale: {
                x: 1,
                y: 1
            }
        });
    }

    coinFrameAnimationGroup() {
        // // 过度动画管理
        this.frameAnimationTransition.group = {
            rock: [
                {
                    name: 'position.y',
                    component: this.coinFrameAnimation.transform,
                    values: [
                        {
                            time: 0,
                            value: this.startY,
                            tween: 'ease-out'
                        },
                        {
                            time: 200,
                            value: this.startY - 10,
                            tween: 'ease-out'
                        },
                        {
                            time: 400,
                            value: this.startY,
                            tween: 'ease-out'
                        }
                    ]
                }
            ],
            move: [
                {
                    name: 'position.y',
                    component: this.coinFrameAnimation.transform,
                    values: [
                        {
                            time: 0,
                            value: this.startY,
                            tween: 'ease-out'
                        },
                        {
                            time: 400,
                            value: this.endY,
                            tween: 'ease-out'
                        }
                    ]
                },
                {
                    name: 'position.x',
                    component: this.coinFrameAnimation.transform,
                    values: [
                        {
                            time: 0,
                            value: this.startX,
                            tween: 'ease-out'
                        },
                        {
                            time: 400,
                            value: this.endX,
                            tween: 'ease-out'
                        }
                    ]
                }
            ],
            float: [
                {
                    name: 'position.y',
                    component: this.coinFrameAnimation.transform,
                    values: [
                        {
                            time: 0,
                            value: this.startY,
                            tween: 'ease-out'
                        },
                        {
                            time: 800,
                            value: this.startY - 5,
                            tween: 'ease-out'
                        },
                        {
                            time: 1600,
                            value: this.startY,
                            tween: 'ease-in'
                        }
                    ]
                }
            ],
            drop: [
                {
                    name: 'position.y',
                    component: this.coinFrameAnimation.transform,
                    values: [
                        {
                            time: 0,
                            value: 0,
                            tween: 'ease-out'
                        },
                        {
                            time: 400 - this.speed,
                            value: this.startY + 10,
                            tween: 'ease-out'
                        },
                        {
                            time: 600 - this.speed,
                            value: this.startY,
                            tween: 'ease-out'
                        }
                    ]
                }
            ]
        };
        // 金币活力值动画
        this.text1Transition.group = {
            flicker: [
                {
                    name: 'alpha',
                    component: this.text1.addComponent(
                        new Render({
                            alpha: 1
                        })
                    ),
                    values: [
                        {
                            time: 0,
                            value: 1,
                            tween: 'ease-out'
                        },
                        {
                            time: 50,
                            value: 0,
                            tween: 'ease-in'
                        },
                        {
                            time: 100,
                            value: 1,
                            tween: 'ease-in'
                        }
                    ]
                }
            ]
        };
    }

    private animationGroup() {
        // 金币过渡动画
        this.goldCoinTransition.group = {
            drop: [
                {
                    name: 'position.y',
                    component: this.goldCoin.transform,
                    values: [
                        {
                            time: 0,
                            value: 0,
                            tween: 'ease-out'
                        },
                        {
                            time: 400 - this.speed,
                            value: this.startY + 10,
                            tween: 'ease-out'
                        },
                        {
                            time: 600 - this.speed,
                            value: this.startY,
                            tween: 'ease-out'
                        }
                    ]
                }
            ],
            disappear: [
                {
                    name: 'position.y',
                    component: this.goldCoin.transform,
                    values: [
                        {
                            time: 0,
                            value: this.endY,
                            tween: 'ease-out'
                        },
                        {
                            time: 300 - this.speed,
                            value: this.endY + 50,
                            tween: 'ease-out'
                        }
                    ]
                }
            ],
            shake: [
                {
                    name: 'position.y',
                    component: this.goldCoin.transform,
                    values: [
                        {
                            time: 0,
                            value: this.endY,
                            tween: 'ease-out'
                        },
                        {
                            time: 80,
                            value: this.endY + 5,
                            tween: 'ease-out'
                        },
                        {
                            time: 160,
                            value: this.endY,
                            tween: 'ease-out'
                        },
                        {
                            time: 240,
                            value: this.endY - 5,
                            tween: 'ease-out'
                        },
                        {
                            time: 320,
                            value: this.endY,
                            tween: 'ease-out'
                        }
                    ]
                }
            ],
            move: [
                {
                    name: 'position.y',
                    component: this.goldCoin.transform,
                    values: [
                        {
                            time: 0,
                            value: this.startY,
                            tween: 'ease-out'
                        },
                        {
                            time: 300 - this.speedTime,
                            value: this.endY,
                            tween: 'ease-out'
                        }
                    ]
                },
                {
                    name: 'position.x',
                    component: this.goldCoin.transform,
                    values: [
                        {
                            time: 0,
                            value: this.startX,
                            tween: 'ease-out'
                        },
                        {
                            time: 300 - this.speedTime,
                            value: this.endX,
                            tween: 'ease-out'
                        }
                    ]
                }
            ],
            float: [
                {
                    name: 'position.y',
                    component: this.goldCoin.transform,
                    values: [
                        {
                            time: 0,
                            value: this.startY,
                            tween: 'ease-out'
                        },
                        {
                            time: 800,
                            value: this.startY - 5,
                            tween: 'ease-out'
                        },
                        {
                            time: 1600,
                            value: this.startY,
                            tween: 'ease-in'
                        }
                    ]
                }
            ]
        };
    }
}
