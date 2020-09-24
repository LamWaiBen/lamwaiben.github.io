## 记录用过的语法

### 常见的约定字母
- T Type泛型
- K Key
- V Number
- E Element
- P Parameter
- R return
- F Function
- A Arg
- S,U,V etc. - 2nd, 3rd, 4th types


#### interface
1. 继承多个interface
使用逗号分隔
```typescript
interface A {}
interface B {}
interface AB extends A, B
```

#### infer
相当于占位符, 用于在类型声明中临时建立泛型关系
```typescript
type T1 = { name: string };
type T2 = { age: number };
  
type UnionToIntersection<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never;
type T3 = UnionToIntersection<{ a: (x: T1) => void; b: (x: T2) => void }>; // T1 & T2
```

示例: 
1. [EffectModule](./exercises/EffectModule.ts)


#### 常见语法糖

1. Pick, 在T中选取属于K的类型
```typescript
type Pick<T, K extends keyof T> = { 
    [P in K]: T[P]; 
}
```

2. Exclude, 从T中排除可以分配给U的类型
```typescript
type Exclude<T, U> = T extends U ? never : T
```


3. Partial, 把属性全部都变为可选
```typescript
type Partial<T> = { 
    [P in keyof T]?: T[P] | undefined; 
}
```

4. Omit, 生成排除某个字段的类型
```typescript
type Omit<T, K extends string | number | symbol> = { 
    [P in Exclude<keyof T, K>]: T[P]; 
}
```

5. ReturnType, 把函数作为泛型, 取其返回类型作为类型
```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
```
6. Parameters, 把函数作为泛型, 取其参数类型作为类型
```typescript
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never 
```