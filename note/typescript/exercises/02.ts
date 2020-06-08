import chalk from "chalk";

interface User {
  name: string
  age: number
  occupation: string
}

interface Admin {
  name: string
  age: number
  role: string
}

type Person = User | Admin

const persons: Person[] /* <- Person[] */ = [
  {
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  {
    name: "Jane Doe",
    age: 32,
    role: "Administrator",
  },
  {
    name: "Kate Müller",
    age: 23,
    occupation: "Astronaut",
  },
  {
    name: "Bruce Willis",
    age: 64,
    role: "World saver",
  },
]

function logPerson(person: Person) {
  let additionalInformation: string
    // 类型守卫的三种方式
    // 1. key in value
    // 2. typeof value === basicType
    // 3. a instanceof A
    // 4. 函数返回值的 is 推断

//   if ("role" in person) {     
  if (isAdmin(person)) {     
    // ❌ 报错 Person 类型中不一定有 role 属性
    additionalInformation = person.role
  } else {
    // ❌ 报错 Person 类型中不一定有 occupation 属性
    additionalInformation = person.occupation
  }
  console.log(
    ` - ${chalk.green(person.name)}, ${person.age}, ${additionalInformation}`,
  )
}
persons.forEach(logPerson)


// 方法4: is推断, 返回值控制推断结果
function isAdmin(user: Person): user is Admin {
    return user.hasOwnProperty('role')
}