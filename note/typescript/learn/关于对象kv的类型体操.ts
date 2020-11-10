// case 无法为key制定对应的value类型
type t = { a: string; b: 1 | 2; c: 'zzz'; d: 123 };

export interface IOption<FieldsType extends Record<any, any>, T extends keyof FieldsType> {
  field: T;
  label?: (value: FieldsType[T]) => string;
}

const options1: IOption<t, keyof t>[] = [
  {
    field: 'b',
    label: (b) => '123', // 此处的b 并没有收缩为 1｜2
  },
];

/**
 * 原因分析：
 * 直接把整个t作为范型， 最终T拿到的是包含所有key的类型， 所以FieldsType[T] 得到的也是所有value的类型
 */
///////////////////////////////////////////


// 方案1
//通过类型收缩（extends）把T从所有的key变为 某一个key， T extends keyof t ? IOption<t,T>:never
type OptionItem<T = keyof t> = T extends keyof t ? IOption<t,T>:never

const options2: OptionItem[] = [
  {
    field: 'b',
    label: (b) => '123',  // b 参数的类型推导为 1｜2
  },
  {
    field: 'a',
    label:(a)=>''       // a 参数的类型推到为 string
  }

];


// 方案2
// 思路与方案1类似， 借助 K in keyof T，distributive 获取某一个key， 而不是一个数组
type Filter<T> = {
    [K in keyof T] : {
        field: K;
        label?: (value: T[K]) => string
    }
}[keyof T]

type FilterForModel = Filter<t>

const options3: FilterForModel[] = [
    {
        field: 'b',
        label: (b) => '123',  // b 参数的类型推导为 1｜2
      },
      {
        field: 'a',
        label:(a)=>''       // a 参数的类型推到为 string
      }
]
