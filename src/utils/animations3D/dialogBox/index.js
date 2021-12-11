import { resource, RESOURCE_TYPE, Component, Game, GameObject } from '@eva/eva.js';
import { Img, ImgSystem } from '@eva/plugin-renderer-img'; // 引入渲染图片所需要的组件和系统
import { RendererSystem } from '@eva/plugin-renderer';
import { NinePatch, NinePatchSystem } from '@eva/plugin-renderer-nine-patch';
import { Text, TextSystem } from '@eva/plugin-renderer-text';
import { Transition, TransitionSystem } from '@eva/plugin-transition';

import RenderAni from '../render';
// 资源
export const Source = [{
    name: 'model',
    type: RESOURCE_TYPE.IMAGE,
    src: {
        image: {
            type: 'png',
            url: '././public/resource3d/model/model.png'
        }
    },
    preload: true
}];
class DialogBox {
     model= null;
     textSpan = null;
     line = null;
     textComponent = null;
     instanceDialogBox = null;
     interval = null;
     modelWidth = 105;
     modelHeight= 56;
     constructor() {
         this.initResource();
         this.modelGame();
     }
     static get instance() {
         this.instanceDialogBox = this.instanceDialogBox || new DialogBox();
         return this.instanceDialogBox;
     }
     initResource() {
         RenderAni.addResource(Source).addSystem([new ImgSystem(), new NinePatchSystem(), new TextSystem(), new TransitionSystem()]);
     }
     lineGame() {
         this.line = new GameObject('line', {
             position: {
                 x: (this.modelWidth / 5) + 10,
                 y: (this.modelHeight / 3) + 5
             },
             origin: {
                 x: 0.5,
                 y: 0.5
             },
             anchor: {
                 x: 0.5,
                 y: 0.5
             }
         });
         this.line.addComponent(new Text({
             text: '|',
             style: {
                 fontFamily: 'Arial',
                 fontSize: 36,
                 fontStyle: 'italic',
                 fontWeight: 'bold',
                 fill: ['#b35d9e', '#84c35f', '#ebe44f'], // gradient
                 fillGradientType: 1,
                 fillGradientStops: [0.1, 0.4],
                 stroke: '#4a1850',
                 strokeThickness: 5,
                 dropShadow: true,
                 dropShadowColor: '#000000',
                 dropShadowBlur: 4,
                 dropShadowAngle: Math.PI / 6,
                 dropShadowDistance: 6,
                 wordWrap: true,
                 wordWrapWidth: 400,
                 breakWords: true
             }
         }));
     }
     modelGame() {
         // 创建 game object
         this.model = new GameObject('patch', {
             size: { width: this.modelWidth, height: this.modelHeight },
             origin: { x: 0, y: 0 },
             position: {
                 x: 100,
                 y: 10
             },
             anchor: {
                 x: 0,
                 y: 0
             }
         });
         this.model.addComponent(new Img({
             resource: 'model'
         }));
         this.model.addChild(this.textSpan);
     }
     textGame() {
         this.textSpan = new GameObject('text', {
             position: {
                 x: this.modelWidth / 5,
                 y: this.modelHeight / 3
             },
             origin: {
                 x: 0,
                 y: 0
             },
             anchor: {
                 x: 0.5,
                 y: 0.5
             }
         });
         this.textComponent = this.textSpan.addComponent(new Text({
             text: '123131313131',
             style: {
                 fontFamily: 'Arial',
                 fontSize: 36,
                 fontStyle: 'italic',
                 fontWeight: 'bold',
                 fill: ['#002A3C'], // gradient
                 fillGradientType: 1,
                 fillGradientStops: [0.1, 0.4],
                 stroke: '#4a1850',
                 strokeThickness: 5,
                 dropShadow: true,
                 dropShadowColor: '#000000',
                 dropShadowBlur: 4,
                 dropShadowAngle: Math.PI / 6,
                 dropShadowDistance: 6,
                 wordWrap: true,
                 wordWrapWidth: 400,
                 breakWords: true
             }
         }));
     }
     load() {
         return this.model;
     }
     setContainer({ width, height }) {
         this.model.position = {
             x: width,
             y: height
         };
         this.textSpan.position = {
             x: width / 4,
             y: height / 3
         };
     }
     remove() {
         RenderAni.game.removeGameObject(this.model);
         RenderAni.game.removeGameObject(this.textSpan);
     }
     destroy() {
         RenderAni.game.scene.destroy();
     }
}
export default DialogBox.instance;
