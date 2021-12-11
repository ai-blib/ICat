import { GameObject, resource, RESOURCE_TYPE } from '@eva/eva.js';
import { ImgSystem } from '@eva/plugin-renderer-img'; // 引入渲染图片所需要的组件和系统
import { TextSystem } from '@eva/plugin-renderer-text';
import { TransitionSystem } from '@eva/plugin-transition';
import { SpriteAnimation, SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import RenderAni from '../render';
import { Event, EventSystem } from '@eva/plugin-renderer-event';
import InteractiveController from '../controller';
import { POINT } from '../trackerPoint';
import { Fish } from '../feeder/fish';
import DialogBox from '../dialogBox';
// 资源
export const Source = [{
    name: 'cat',
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
        image: {
            type: 'png',
            url: '././public/resource3d/cat_Ani_3X.png'
        },
        json: {
            type: 'json',
            url: '././public/resource3d/cat_Ani_3X.json'
        }
    },
    preload: true
}, {
    name: 'stand',
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
        image: {
            type: 'png',
            url: '././public/resource3d/V1_Stand/stand.png'
        },
        json: {
            type: 'json',
            url: '././public/resource3d/V1_Stand/stand.json'
        }
    },
    preload: true
},
    {
        name: 'look',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/V2_Look/Look.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/V2_Look/Look.json'
            }
        },
        preload: true
    }, {
        name: 'walk',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/V3_Walk/Walk.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/V3_Walk/Walk.json'
            }
        },
        preload: true
    }, {
        name: 'sit',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/V4_Sit/sit.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/V4_Sit/sit.json'
            }
        },
        preload: true
    }, {
        name: 'sit2',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/v5_Sit/Sit_Loop.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/v5_Sit/Sit_Loop.json'
            }
        },
        preload: true
    }, {
        name: 'taste',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/taste/taste.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/taste/taste.json'
            }
        },
        preload: true
    }, {
        name: 'eat',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/eat/eat.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/eat/eat.json'
            }
        },
        preload: true
    }, {
        name: 'reset',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/reset/reset.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/reset/reset.json'
            }
        },
        preload: true
    }, {
        name: 'back',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/V6_Walk_back/walk_small.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/V6_Walk_back/walk_small.json'
            }
        },
        preload: true
    }, {
        name: 'hello',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/V7_hellow/cat_hello.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/V7_hellow/cat_hello.json'
            }
        },
        preload: true
    }, {
        name: 'loop',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/V8_cat_loop/cat_Loop.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/V8_cat_loop/cat_Loop.json'
            }
        },
        preload: true
    }, {
        name: 'loop2',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/V8_cat_loop/loop_V1.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/V8_cat_loop/loop_V1.json'
            }
        },
        preload: true
    }, {
        name: 'loop3',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/V8_cat_loop/Smile_Loop_V1.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/V8_cat_loop/Smile_Loop_V1.json'
            }
        },
        preload: true
    }, {
        name: 'smile',
        type: RESOURCE_TYPE.SPRITE_ANIMATION,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/V8_cat_loop/loop_smile.png'
            },
            json: {
                type: 'json',
                url: '././public/resource3d/V8_cat_loop/loop_smile.json'
            }
        },
        preload: true
    }];
// width =474;
// height = 298;
// x: -28,
//     y: 68
class CatInstance {
    // @ts-ignore
    private width: number = 310;
    private height: number = 208;
    private playActions: any = ['sit2', 'eat', 'taste', 'reset'];
    private playIndex: number = 0;
    private first: Boolean = false;
    private action: string = '';
    private cat: GameObject | any;
    public catSpriteAnimation: SpriteAnimation | any;
    private totalFrames: number = 0;
    private recordPreviousGameName: GameObject | any;
    private frames: number | any;
    private resetTimes: number = 0;
    private endAnimation: Function | any = () => {
    };
    private callBackEndAnimation: Function | any;
    private catZIndex: number | any;
    private playTime: number | any;
    private ignoreAction = ['walk', 'back'];
    private firstPalyTag: boolean = false;
    private firstSwitch: boolean = false;
    private catEatCallBack: Function | any;
    private signPlayHello:boolean = false;
    constructor() {
        this.initResource();
        this.initGame();
    }

    initResource() {
        RenderAni.addResource(Source).addSystem([new TextSystem(), new TransitionSystem(), new SpriteAnimationSystem(), new ImgSystem(), new EventSystem()]);
    }

    initGame() {
        this.cat = new GameObject('cat1', {
            size: { width: this.width, height: this.height },
            origin: { x: 0, y: 0 },
            position: {
                x: 91,
                y: 135
            },
            anchor: {
                x: 0,
                y: 0
            },
            scale: {
                x: 0.8,
                y: 0.8
            }
        });
    }

    setAnimationDuration() {
        const currentTime = new Date().getTime();
        return currentTime - this.playTime;
    }

     //是否是默认动画
    public  defaultAnimation(){
        const action = this.catSpriteAnimation.resource;
        return(['loop', 'stand', 'hello'].includes(action))
    }
    //
    private async switchGame(name: string, speed?: number) {

        //判断是否还有鱼干没有播放完
        //解决问题：猫咪返回的时候点击了金币，但是back 不能中途返回去吃鱼干，播放完back 然后查询状态自动去吃小鱼干
        if (['loop', 'stand', 'hello'].includes(name) && Fish.eatFishStartOver) {
            this.eatFishAction(true);
            Fish.eatFishStartOver = false;
            return;
        }
        //改变金币的层级
        if (['loop', 'stand', 'hello'].includes(name)){
            InteractiveController.getPlaceCoin(55);
        }else {
            InteractiveController.getPlaceCoin(1);
        }
        if (name === 'eat') {
            Fish.emptyFish();
        }
        if (this.firstSwitch) {
            POINT.imp({
                tgt_event_id: 'h5_ACT_privilege_catdh',
                tgt_name: 'h5-ACT-成长权益-权益猫动画',
                param2: this.catSpriteAnimation.resource,
                param3: new Date().getTime() - this.playTime
            });
        }
        this.playTime = new Date().getTime();
        this.firstSwitch = true;
        // 创建 game object
        if (!this.first) {
            this.catSpriteAnimation = this.cat.addComponent(
                // @ts-ignore
                new SpriteAnimation({
                    autoPlay: false,
                    resource: name,
                    speed: speed || 180
                })
            );
            this.cat.addComponent(new Event()).on('tap', (event) => {
                event.stopPropagation();
                if (this.catSpriteAnimation.resource === 'loop'||this.catSpriteAnimation.resource === 'stand') {
                    this.signPlayHello = true;
                } else {
                    //回调猫的点击
                    InteractiveController.catClickControl();
                }
                POINT.click({
                    tgt_event_id: 'h5_ACT_privilege_catdh',
                    tgt_name: 'h5-ACT-成长权益-权益猫动画',
                    param2: this.catSpriteAnimation.resource
                });

            });
        } else {
            this.switchSpeed(name);
            this.catSpriteAnimation.resource = name;
        }
        this.first = true;
    }
    //修改速度
    switchSpeed(name: string) {
        let speed = 40;
        if (name === 'loop') {
            speed = 180;
        } else if (name === 'hello') {
            speed = 120;
        } else if (name === 'back') {
            speed = 380;
        }
        this.catSpriteAnimation.speed = speed;
    }

    public play(name: string) {
        this.switchGame(name);
        RenderAni.renderGame(this.cat, 15);
        return Promise.resolve(true);
    }

    private load(name: string, callBack?: Function, speed?: number) {
        this.addChild(DialogBox.load())
        this.switchGame(name, speed);
        this.callBackEndAnimation = callBack;
        RenderAni.renderGame(this.cat, 15);
        this.controllerAnimationFrame();
        return Promise.resolve(true);

    }


    /**
     *
     * @param direct   无视条件直接播放走路去吃小鱼
     */
    // 吃鱼的动作
    async eatFishAction(direct?: boolean) {
        if (direct || this.catSpriteAnimation.resource === 'stand' || this.catSpriteAnimation.resource === 'loop') {
            this.action = 'walk';
            this.catSpriteAnimation && this.catSpriteAnimation.stop();
            this.frames = 0;
            this.playIndex = 0;
            this.catSpriteAnimation.play(1);
            this.switchGame('walk');
            this.totalFrames = 24;
        }
    }

    //小鱼掉落完后吃鱼
    fishFallOverStartEat(callback) {
        const action = this.catSpriteAnimation.resource;
        //判断猫咪当前动作
        if (['walk', 'stand', 'loop', 'hello', 'back'].includes(action)) {
            return;
        }
        //注册回调
        this.catEatCallBack = callback;
        //播放吃鱼的同时，让鱼清空动画
        this.switchAnimation('eat', 2);
        // 让鱼清空动画
        return true;
    }

    //控制动画播放帧数,到多少帧停止
    controllerAnimationFrame() {
        // 监听帧数
        this.animationFrameChange();
        // 监听循环
        this.animationPlayLoop();
        //监听结束
        this.animationComplete();
    }
    //播放帧的监听
    animationFrameChange(){
        this.catSpriteAnimation.on('frameChange', () => {
            const action = this.catSpriteAnimation.resource;
            if (!this.firstPalyTag) {
                this.firstPalyTag = true;
                POINT.imp({
                    tgt_event_id: 'h5_ACT_privilege_catdh_ymjzsj',
                    tgt_name: 'h5-ACT-成长权益-权益猫动画-页面加载时间',
                    param2: new Date().getTime() - InteractiveController.timeStart,
                    param3: action
                });
            }
            //设置结束的帧数
            if (action === 'walk' || action === 'back') {
                if (this.frames >= this.totalFrames) {
                    this.endAnimation && this.endAnimation(action);
                    this.callBackEndAnimation && this.callBackEndAnimation(action);
                    if (action === 'walk') {
                        this.switchAnimation('sit2', Infinity);
                    } else if (action === 'back') {
                        this.switchAnimation('stand', Infinity);
                    } else if (action === 'sit2') {
                        this.switchAnimation('eat', 2);

                    }
                }
            }
            this.frames++;
        });
    }
    //动画播放循环的的回调
    animationPlayLoop(){
        this.catSpriteAnimation.on('loop', () => {
            // 可领金币个数
            const receiveCoins = InteractiveController.goldCoinTime;
            const currentResource = this.catSpriteAnimation.resource;
            if (currentResource === 'reset') {
                this.resetTimes++;
                if (this.resetTimes >= 2) {
                    this.resetTimes = 0;
                    this.switchAnimation('taste', Infinity);

                }
            } else if (currentResource === 'taste') {
                this.resetTimes++;
                if (this.resetTimes >= 2) {
                    this.resetTimes = 0;
                    this.switchAnimation('back', 1);
                }
            } else if (currentResource === 'sit2') {
                this.switchAnimation('eat', 2);
            } else if (currentResource === 'stand') {
                if (this.signPlayHello){
                    this.switchAnimation('hello', 1, () => {
                        this.switchAnimation('loop', Infinity);
                    });
                    this.signPlayHello = false;
                }else {
                    this.switchAnimation('loop', Infinity);
                }
            } else if (currentResource === 'loop') {
                 //播放完微笑动画，然后判断是否需要招手
                if (this.signPlayHello){
                    this.switchAnimation('hello', 1, () => {
                        this.switchAnimation('loop', Infinity);
                    });
                    this.signPlayHello = false;
                    return;
                }
                 //有可领金币
                if (receiveCoins > 0){
                    this.switchAnimation('stand', 1);
                }
            }
        });

    }
    //动画播放完成的回调 stop 的时候不会触发
    animationComplete(){
        this.catSpriteAnimation.on('complete', async () => {
            this.endAnimation && this.endAnimation(this.action);
            this.callBackEndAnimation && this.callBackEndAnimation(this.catSpriteAnimation.resource);
            const currentResource = this.catSpriteAnimation.resource;
            if (currentResource === 'walk') {
                this.switchAnimation('sit2', Infinity);
            } else if (currentResource === 'eat') {
                Fish.fishHide(); //主动鱼消失
                // 吃小鱼干完成的回调
                this.catEatCallBack && this.catEatCallBack('eat');
                if (InteractiveController && InteractiveController.goldCoinTime <= 0) {
                    this.switchAnimation('taste', Infinity);
                    return;
                }
                this.endAnimation && this.endAnimation('eat');
                this.switchAnimation('reset', Infinity);
            } else if (currentResource === 'sit2') {
                this.switchAnimation('eat', 2);
            } else if (currentResource === 'back') {
                this.switchAnimation('stand', Infinity);
            }
        });
    }
    // 动画切换
    async switchAnimation(currentAction: string, times: any = 1, callBack?: Function) {
        // console.log(this.catSpriteAnimation,8890)；
        const currentResource = this.catSpriteAnimation.resource;
        //忽略掉不切换的情况
        if (this.ignoreAction.includes(currentResource) && currentAction === 'eat') {
            return;
        }
        //tod
        this.catSpriteAnimation.stop();
        this.endAnimation = callBack;
        this.action = currentAction;
        this.frames = 0;
        //当前的播放动作
        if (!this.action) return;
        //总的动画帧数
        const currentTime = (times === Infinity) ? 1 : times;
        this.totalFrames = currentTime * (await resource.getResource(this.action)).instance.length - (this.action === 'back' ? 4 : 2);
        this.switchGame(this.action);
        this.catSpriteAnimation.play(times);
        // RenderAni.renderGame(action);
        this.playIndex++;

    }

    remove() {
        this.cat.removeComponent(SpriteAnimation);
        this.cat.removeComponent(Event);
        this.first = false;
    }
    //添加子对象
    addChild(game:GameObject){
        this.cat.addChild(game);
    }
}

const Cat = new CatInstance();
export default Cat;
