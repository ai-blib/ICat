import InteractiveController from './controller';
import { LOAD_EVENT, resource } from '@eva/eva.js';
// import ControlResource from './controlResource';
let first:any = null;
export default class Cat3d {
     isMounted:Boolean=false;
     recordCoinInfo:any;
     POINT:any;
     constructor() {

     }
     start() {
         try {
             this.firsScreen();
         } catch (e) {

         }
     }
     //
     enable3d(gray) {
         // return InteractiveController.cat3dGrayscale(gray);
     }

     // 设置滚动的值
     set setVitalityValue(totalScore) {
         const _arr = String(totalScore).split('');
         this.feeder.numbers(_arr);
     }
     set setAllScore(value) {
     }
     // 修改金币数值
     setGoldCoinInfo(data:[any]) {
         this.recordCoinInfo = data;
         if (this.isMounted) {
             InteractiveController.setGoldCoinInfo(data);
         }
     }
     // 点击的回调
     addEvenListenterCoinFallOver(callBack:Function) {
         InteractiveController.registerFunction(callBack);
     }
     async firsScreen() {
         await this.cat.load('loop');
         this.animationVisibility();
         await this.goldCoin.createCoin();
         // this.model.load();
         await this.feeder.load();
         await this.sofa.load();
         await this.ball.load();
         this.isMounted = true;
         this.recordCoinInfo && InteractiveController.setGoldCoinInfo(this.recordCoinInfo);

         resource.on(LOAD_EVENT.COMPLETE, (name) => {
             // 动画可以正常显示
             InteractiveController.setStatus(true);
             // console.log(InteractiveController.setStatus(true), 90);
         }); // 加载完成
         resource.preload();
         // this.setVitalityValue = [4, 6, 8, 3];
     }
     // 动画可见
     async animationVisibility() {
         // @ts-ignore
         if (window.PPDWebUI && window.PPDWebUI.os.inApp) {
             // @ts-ignore
             // window.PPDWebUI.ListenerService.pauseListener(async () => {
             //     if (!first) {
             //         await this.goldCoin.coinAnimation();
             //         // this.cat.catSpriteAnimation.play(Infinity);
             //         first = true;
             //     }
             // });
             // @ts-ignore
             window.PPDWebUI && window.PPDWebUI.H5VisibleService.isVisible(async (visible) => {
                 if (visible) {
                     InteractiveController.timeStart = new Date().getTime();
                     console.log('isVisible', 1);
                     if (!first) {
                         this.cat.catSpriteAnimation.play(Infinity);
                         first = true;
                     }
                 }

             });
             // @ts-ignore
             window.PPDWebUI.ListenerService.resumeListener(async () => {
                 InteractiveController.timeStart = new Date().getTime();
                 console.log('resumeListener', 1);
                 if (!first) {
                     this.cat.catSpriteAnimation.play(Infinity);
                     first = true;
                 }
             });

         } else {
             // await this.goldCoin.coinAnimation();
             this.cat.catSpriteAnimation.play(Infinity);

         }
     }
     // @ts-ignore
     get dialogBox() {
         return require('./dialogBox/index').default;
     }
     // @ts-ignore
     get goldCoin() {
         return require('./goldCoin').default;
     }
     // @ts-ignore
     get feeder() {
         return require('./feeder').default;
     }
     get cat() {
         return require('./cat/index').default;
     }
     get sofa() {
         return require('./sofa').default;
     }
     get ball() {
         return require('./ball').default;

     }
     get model() {
         return require('./dialogBox').default;
     }

}
