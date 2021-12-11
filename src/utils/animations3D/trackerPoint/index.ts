class TrackerPoint {
      POINT:any;
      common:Object|any={};
      constructor() {

      }
      setPoint(point:Function) {
          this.POINT = point;
      }
      setCommonParam(key, value) {
          this.common[key] = value;
      }
      click(param) {
         return
      }

      imp(param) {
          return
      }

}



export const POINT = new TrackerPoint();
