/**
 * 声明
 * 
 * 1. 声明语句: 为引入的全局变量定义类型,使编译器知道全局变量的类型
 * 
 * 2. 声明文件: 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
 *        一般以 *.d.ts 结尾命名, 如果无法解析则可以检查tsconfig.json 中的 files、include 和 exclude 配置
 * 
 * 3. 第三方声明文件: 绝大多数第三方声明文件社区已经帮我们定义好, 我们可以直接使用 @types 管理声明文件
 *        使用方法:  npm install @types/jquery --save-dev
 * 
 * 4. 书写声明文件: 有下面几种场景:
 *                  1. 全局变量: 通过 <script> 标签引入第三方库, 注入全局变量
 *                  2. npm包: 通过 import foo from 'foo'导入, 符合ES6模块规范
 *                  3. UMD库: 既可以通过<script>标签引入
 *                  4. 直接扩展全局变量
 *                  5. 在npm包或UMD库中扩展全局变量
 *                  6. 模块插件
 * 
 * 5. 声明语法:  
 * 
 *         declare  只能用于定义类型, 不能用来定义具体的实现
 *         用法:  declare "变量类型" "变量名" "数据类型"
 *         eg:   declare let jQuery: (selector: string) => any;
 *               declare function jQuery(selector: string): any;
 * 
 * 6. 自动生成声明文件:  如果源码是由ts编写的, 那么在使用 tsc 命令编译的时候, 添加 -d 指令 可以自动生成声明文件
 */


// 全局变量的声明

declare let jQuery_let: (selector: string) => any


declare function jQuery_fn(selector: string): any
declare function jQuery_fn(domCallback: () => any): any


declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}


declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
// Directions 为第三方库定义好的全局变量, 
// 编译后的结果为 
// var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];


// 命名空间 可以为 jQuery对象的属性定义类型
declare namespace jQuery {
    function ajax(url: string, settings?:any):void;
    const version: number;

    class Event {
		blur(eventType: EvenType): void     // enum 中定义的类型
	}
    enum EvenType {
        CustomClick
    }

    namespace fn {          //namespack嵌套,  编译后为 jQuery.fn.extend
        function extend(object: any): void 
    }
}

// 三斜线指令
// 在书写一个全局变量的声明文件时, 或需要依赖一个全局变量的声明文件时 可以使用三斜线指令, 其余情况建议使用 import


export {}