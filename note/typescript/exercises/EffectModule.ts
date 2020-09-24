// question  https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md


interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";

  delay(input: Promise<number>): Promise<Action<string>> {
    return input.then(i => ({
      payload: `hello ${i}!`,
      type: 'delay'
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message"
    };
  }
}


/********************************** */
// 修改 Connect 的类型，让 connected 的类型变成预期的类型
// type Connect = (module: EffectModule) => any

// 为了获取函数类型的字符串集合
type MethodName<T> = {
    [F in keyof T]: T[F] extends Function ? F : never
}[keyof T]      // 类型为never时, 不会返回

type EE = MethodName<EffectModule>

type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>
type syncMethod<T, U> = (action: Action<T>) => Action<U>

type asyncMethodConnect<T, U> = (input: T) => Action<U>
type syncMethodConnect<T, U> = (action: T) => Action<U>

// 利用占位符 取出 U, V, 然后再根据类型分发, 选择不同的类型
type EffectModuleAssign<T> = T extends asyncMethod<infer U, infer V> ? 
                                    asyncMethodConnect<U, V>
                                : T extends syncMethod<infer U, infer V> 
                                ? syncMethodConnect<U, V>
                                : never


type Connect = (module: EffectModule) => {
    // [K in EE]: EffectModule[K]
    [K in EE]: EffectModuleAssign<EffectModule[K]>
};
/********************************/

const connect: Connect = m => ({
  delay: (input: number) => ({
    type: 'delay',
    payload: `hello ${input}`
  }),
  setMessage: (input: Date) => ({
    type: "set-message",
    payload: input.getMilliseconds()
  })
});

type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
};

const effect = new EffectModule();
export const connected: Connected = connect(effect);
