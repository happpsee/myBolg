/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2025-12-29 20:25:34
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2025-12-29 22:32:05
 * @FilePath: \myBolg\utils\eventEmitter
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

class EventEmitter {

  static isOnce = Symbol("IS_ONCE");

  constructor() {
    this.events = new Map();
  }


  listener(type, fn) {
    if (!this.events.has(type)) {
      this.events.set(type, []);
    }
    this.events.get(type).push(fn); 
  }

  emit(eventName, ...args) {
    if (!this.events.has(eventName)) {
      console.log(`没有${eventName}事件`);
      return false;
    }

    const fns = this.events.get(eventName);

    fns.forEach(fn => {
      if (fn[EventEmitter.isOnce]) {
        
        fn && fn(...args);
        //将删除操作放在forEach执行完毕之后
        Promise.resolve().then(() => {
          this.off(eventName, fn);
        });
        
        return false;
      }
      fn && fn(...args);
    });


  }

  off(eventName, fn) {
    
    if (!this.events.has(eventName)) {
      console.log(`没有${eventName}事件`);
      return false;
    }

    if (!fn) {
      this.events.delete(eventName);

      return false;
    }

    const fns = this.events.get(eventName);

    const idx = fns.indexOf(fn);

    fns.splice(idx, 1);
  }

  once(eventName, fn) {
    const newFn = (...args) => {
      fn(...args);
    };

    newFn[EventEmitter.isOnce] = true;
    this.listener(eventName, newFn);

  }

}

export const emitter = new EventEmitter();