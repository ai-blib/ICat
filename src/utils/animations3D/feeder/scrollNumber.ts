import {
    GameObject,
} from '@eva/eva.js';
import { Mask, MASK_TYPE } from '@eva/plugin-renderer-mask';
import { Event } from '@eva/plugin-renderer-event';
import { Img } from '@eva/plugin-renderer-img'; // 引入渲染图片所需要的组件和系统
import Coins from '../goldCoin';
import RenderAni from '../render';
import { Transition } from '@eva/plugin-transition';
import InteractiveController from '../controller'
export default class ScrollNumber {
    static componentName = 'ScrollNumber';
    public numberInstances: any = [];
    private mask: any = null;
    private event: any = null;
    private revArr: any=[];
    private first:boolean = false;
    private timer:any=null;
    constructor(parmams = [{ x: 5 }, { x: 17 }, { x: 29}, { x: 41 }]) {
        // 创建外部遮罩
        this.mask = new GameObject('box', {
            size: { width: 200, height: 50 },
            position: { x: 298, y: 226 },
            anchor: { x: 0, y: 0 }, // 锚点，相对于父级的宽高的比率的一个点，物体的原点会相对于这个点进行位移
        });
        this.mask.addComponent(new Mask({
            type: MASK_TYPE.Rect,
            style: {
                x: 0,
                y: 0,
                width: 200,
                height: 20,
            },
        }));
        this.event = this.mask.addComponent(new Event());
        // RenderAni.onResume(()=>{
        this.numberInstances = parmams.map((item: { x: number }, index: number) => {
            const number = new Number(item, index);
            this.mask.addChild(number.text);
            return number;
        });
        RenderAni.renderGame(this.mask,52);
        // });
        this.event.on('tap', () => {
            InteractiveController.coinFallOve({x:0,y:0}, 0, 'record');
        })

        // @ts-ignores
        return (arr = [0, 0, 0, 0]) => {
            const instance = arr.length < 4 ? this.numberInstances.slice(-(4 - arr.length)) : [];
            if (arr.length <= 4) {
                let x = 0
                // 298 1-314  2-311 3 302 4 290
                if (arr.length==4){
                    x =297
                }else if (arr.length==3){
                    x = 302
                }else if (arr.length==2){
                    x = 310
                }else if (arr.length==1){
                    x = 314
                }
                this.mask.transform.position.x =x;

            }

            for (const index in arr){
                const _item = arr[index];

                const instance = this.numberInstances[index];
                if (_item==0&&instance.status&&instance.currentValue ===0){
                    continue;
                }
                instance.show();
                if (this.revArr && this.revArr[index] !== _item) {
                    instance.play(_item);
                }
            };
            this.revArr = arr;
            instance.forEach((i: any) => {
                i.hide();
            })
        };
    }
}


class Number {
    public text: GameObject | any;
    private animation: any = null;
    private textStyle: Img | any;
    private first: any;
    private timer: number|any;
    public status:boolean =false;
    public currentValue:number|any;
    constructor(item, index) {
        this.init(item, index);
    }
    init({ x, y }, index) {
        this.text = new GameObject('text', {
            size: { width: 12, height: 220 },
            position: {
                x,
                y: 0
            },
        });
        this.textStyle = this.text.addComponent(
            new Img({
                resource: 'number'
            })
        );
        this.animation = this.text.addComponent(new Transition());
        this.animation.group = {
            idle: [
                {
                    name: 'position.y',
                    component: this.text.transform,
                    values: [
                        {
                            time: 0,
                            value: 0,
                            tween: 'linear',
                        },
                        {
                            time: 1000,
                            value: -100,
                        },
                    ],
                },
            ],
            stop: [
                {
                    name: 'position.y',
                    component: this.text.transform,
                    values: [
                        {
                            time: 0,
                            value: 0,
                            tween: 'ease-out',
                        },
                        {
                            time: 700,
                            value: 0,
                            tween: 'ease-out',
                        }
                    ],
                },
            ]
        };
        // // 开始转动
        // this.play(0);
    }
    stop() {
        this.animation.stop('idle');
    }
    hide() {
        this.status = false;
        this.text.transform.scale = { x: 0, y: 0 };
    }
    show() {
        this.text.transform.scale = { x: 1, y: 1 };
        this.status = true;
    }
    play(index) {
        const base = 22;
        this.animation.play('idle', Infinity);
        const stopNumber = (index);
        const value = -(stopNumber * base);
        this.currentValue = value;
            if (this.timer){
                clearInterval(this.timer);
            }
        this.timer = setTimeout((that) => {
            that.animation.stop('idle');

            that.animation.group.stop[0].values[1].value = value;
            // // 新增动画组不要和之前的动画组重名，覆盖无效
            // that.animation.group.stop = [
            //
            // ];

            that.animation.play('stop');

        }, 500, this);

    }
    setText(text) {
        console.log(this.textStyle);
    }
}
