import { GameObject, RESOURCE_TYPE } from '@eva/eva.js';
import { Img, ImgSystem } from '@eva/plugin-renderer-img'; // 引入渲染图片所需要的组件和系统
import { Text, TextSystem } from '@eva/plugin-renderer-text';
import { RenderSystem } from '@eva/plugin-renderer-render';
import { Transition, TransitionSystem } from '@eva/plugin-transition';
import { MaskSystem } from '@eva/plugin-renderer-mask';
import ScrollNumber from './scrollNumber';
import RenderAni from '../render';
import { Fish } from './fish';
import { Event, EventSystem, HIT_AREA_TYPE } from '@eva/plugin-renderer-event';
import { POINT } from '../trackerPoint';

// 资源
export const Source = [{
    name: 'feeder',
    type: RESOURCE_TYPE.IMAGE,
    src: {
        image: {
            type: 'png',
            url: '././public/resource3d/feeder.png'
        }
    },
    preload: true

}, {
    name: 'lib',
    type: RESOURCE_TYPE.IMAGE,
    src: {
        image: {
            type: 'png',
            url: '././public/resource3d/feeder_v2.png'
        }
    },
    preload: true
},

    {
        name: 'part',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/touweiji_part_V3.png'
            }
        },
        preload: true

    }, {
        name: 'number',
        type: RESOURCE_TYPE.IMAGE,
        src: {
            image: {
                type: 'png',
                url: '././public/resource3d/number.png'
            }
        },
        preload: true
    }];

class FeederInstance {
    private width: number = 140;
    private height: number = 120;
    private Feeder: GameObject | any;
    private numbers:any = null;
    partStatus = false;
    private static instanceFeeder: any;
    private container: GameObject | any;
    private part: GameObject | any;
    private lib: GameObject | any;
    private title: GameObject | any;
    private libTransTion: Transition | any;
    private partTransTion: Transition | any;
    instance: any;
    constructor() {
        this._initResource();
        this._container();
        this._feederGame();
        this._injectorGame();
        this._libGame();
        this._titleGame();
        // 添加游戏
        this._addGame();
    }

  private  _initResource() {
        RenderAni.addResource(Source).addSystem([new TextSystem(), new TransitionSystem(), new MaskSystem(), new ImgSystem(), new RenderSystem(), new EventSystem()]);
    }

   private _container() {
        this.container = new GameObject('container', {
            size: { width: this.width, height: this.height },
            origin: { x: 0, y: 0 },
            position: {
                x: 235,
                y: 175
            },
            anchor: {
                x: 0,
                y: 0
            }
        });
        // this.container.addComponent(new Render({
        //     zIndex: 1,
        // }));
    }

  private  _feederGame() {
        // 创建 game object
        this.Feeder = new GameObject('feeder', {
            size: { width: this.width, height: this.height },
            origin: { x: 0, y: 0 },
            position: {
                x: 0,
                y: 0
            },
            anchor: {
                x: 0,
                y: 0
            }
        });

        this.Feeder.addComponent(new Img({
            resource: 'feeder'
        }));

    }

    // 喷嘴
   private _injectorGame() {
        this.part = new GameObject('part', {
            size: { width: 33, height: 36 },
            anchor: { x: 0, y: 0 },
            origin: { x: 1, y: 0 },
            position: {
                x: 63,
                y: 25
            },
            rotation: -0.6

        });
        this.part.addComponent(new Img({ resource: 'part' }));

    }

         // 盖子
   private _libGame() {
        this.lib = new GameObject('lib', {
            size: { width: 42, height: 10 },
            origin: { x: 0, y: 0 },
            position: {
                x: this.Feeder.transform.position.x + 69,
                y: this.Feeder.transform.position.y - 7
            }
        });
        this.lib.addComponent(new Img({
            resource: 'lib'
        }));
    }

    // 活力值
   private _titleGame() {
        // 活力值
        this.title = new GameObject('title', {
            size: { width: 60, height: 50 },
            position: { x: 72, y: 35}
        });
        this.title.addComponent(new Text({
            text: '活力值',
            style: {
                fontSize: '12px',
                fill: ['#fff'], // gradient
                leading: 5,
                wordWrap: true,
                wordWrapWidth: 20
            }
        }));
        // this.title.addComponent(new Render({
        //     zIndex: 1
        // }));
    }

   private _addGame() {
        // 添加子游戏对象
        this.container.addChild(this.lib);
        this.container.addChild(this.part);
        this.container.addChild(this.Feeder);
        this.container.addChild(this.title);
        this._readyFish();
        // 盖子动画
        this.libTransTion = this.lib.addComponent(new Transition());
        // 注册过渡动画
        this.partTransTion = this.part.addComponent(new Transition());
       this.container.addComponent(new Event()).on('tap',()=>{
           POINT.click({
               tgt_event_id: 'h5_ACT_privilege_catdh',
               tgt_name: 'h5-ACT-成长权益-权益猫动画',
               param2: 'feeder'
           })
       })
       POINT.imp({
           tgt_event_id: 'h5_ACT_privilege_catdh',
           tgt_name: 'h5-ACT-成长权益-权益猫动画',
           param2: 'feeder',
           param3:'null'
       })
        this.partTransTion.group = {
            takeBack: [
                {
                    name: 'position.x',
                    component: this.lib.transform,
                    values: [
                        {
                            time: 0,
                            value: this.lib.transform.position.y,
                            tween: 'ease-out'
                        },
                        {
                            time: 100,
                            value: this.lib.transform.position.y + 5,
                            tween: 'ease-out'
                        }
                    ]

                }
            ],
            stretchOut: [
                {
                    name: 'rotation',
                    component: this.part.transform,
                    values: [
                        {
                            time: 0,
                            value: -0.6,
                            tween: 'ease-out'
                        },
                        {
                            time: 900,
                            value: 0,
                            tween: 'ease-out'
                        }
                    ]

                }
            ]
        };
        this.libTransTion.group = {
            shake: [
                {
                    name: 'position.y',
                    component: this.lib.transform,
                    values: [
                        {
                            time: 0,
                            value: this.lib.transform.position.y,
                            tween: 'ease-out'
                        },
                        {
                            time: 100,
                            value: this.lib.transform.position.y + 5,
                            tween: 'ease-out'
                        },
                        {
                            time: 200,
                            value: this.lib.transform.position.y,
                            tween: 'ease-out'
                        }
                    ]

                }
            ]
        };

    }

    // 盖子的实例
    // @ts-ignore
    get transition() {
        return this.libTransTion;
    }

    // 掉落鱼的动画
   public dropFishAction() {
        // 喷嘴动画
        if (!this.partStatus) {
            // 准备好鱼🐟
            // this.readyFish()
            // 播放伸出动画
            this.partTransTion.play('stretchOut', 1);
            // 监听动画的结束
            this.partTransTion.on('finish', (name) => {
                // 喷嘴生出
                if (name === 'stretchOut') {
                    Fish.fallFish();
                    this.partStatus = true;
                }
            });
        } else {
            Fish.fallFish();
        }

    }

  public  load() {
        RenderAni.renderGame(this.container,51);
        // 播放数字动画
        // setTimeout(() => {
        this.numbers = new ScrollNumber();
        // }, 500);
        return Promise.resolve(true);
    }

         // 准备好鱼
   private _readyFish() {
       // @ts-ignore
        Fish.initFishGame();
        // 添加鱼掉落game
        for (const i of ['fall', 'fish']) {
            this.container.addChild(Fish.getFish[i]);
        }
    }

   private _removeFish() {
        // 添加鱼掉落game
        for (const i of ['fish', 'fall']) {
            this.container.removeChild(Fish.getFish[i]);
        }
    }

}

const Feeder:any = new FeederInstance();
// @ts-ignore
export default Feeder;
