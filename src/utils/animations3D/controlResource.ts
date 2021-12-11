import { resource } from '@eva/eva.js';
export default class ControlResource {
    static resourceNames =['ball', 'cat', 'render.js']
    static firstLoadResource():void {
        const te = async () => {
            // console.log(this.resourceNames)
            let sourceArr = [];
            for (const i of this.resourceNames) {
                const { Source } = await import('./' + i);
                if (Source) {
                    // @ts-ignore
                    sourceArr.push(...Source);
                }
            }
            console.log(sourceArr, 90);
            resource.addResource([
                ...sourceArr
            ]);
        };
        te();
    }

}
