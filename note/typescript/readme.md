## 记录用过的语法

#### interface
1. 继承多个interface
使用逗号分隔
```typescript
interface A {}
interface B {}
interface AB extends A, B
```


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