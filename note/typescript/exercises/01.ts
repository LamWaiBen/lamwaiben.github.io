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

function logPerson(user: Person) {
  console.log(` - ${chalk.green(user.name)}, ${user.age}`)
}

persons.forEach(logPerson)