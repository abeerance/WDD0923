/*
	TypeScript is a statically typed language, built on top of JavaScript (superset).
	This means you define the types of variables, function parameters, etc.
*/

// 1. Boolean
// boolean type represents a true/false value
const isDone1: boolean = true; // isDone1 has now the value of boolean true
let isPending = false; // boolean is false
let hasCompleted: boolean = !!1; // !! forces a value to be of type boolean => converts to boolean => boolean is true

// 2. Number
// the number type is used for both integers and floating point numbers
let decimal: number = 6.5;
let hex: number = 0xff;
let largeNumber: number = 1_000_000_000; // large numbers with underscore increases readability => this translates to 1'000'000'000

// 3. Strings
// string types is used for representing text values
let color1: string = "blue";
let fullName: string = "John Doe";
let sentence: string = `Hello, my name is ${fullName} and I am ${decimal} years old and my favourit color is ${color1}`;

// 4. Arrays
// The array type is a collection of values of a single type
// Arrays can be declaures using the `type[]` syntax or the `Array<type>` syntax
// Both declarations are functionally equivalent
let list1: number[] = [1, 2, 3, 4, 5, 6];
let list2: string[] = ["one", "two", "three", "four"];
let list3: Array<boolean> = [true, false, true, false]; // is the same as boolean[]

// 5. Tuples
// A tuple type allows you to express an array with a fixed numbers of elements
// where each element may have a different type
let tuple1: [string, number] = ["hello", 10];
let tuple2: [number, string, boolean] = [1, "world", true];

// 6. Enums
// Enums are a way of giving more friendly names to sets of numeric values
// The enum name is always of uppercase at the first character
enum Color {
  RED = "#BF4E30",
  GREEN = "#C2F8CB",
  BLUE = "#735CDD",
}

let c1: Color = Color.RED; // c1 is now a Color.RED with the value of "#BF4E30"
let c2: Color = Color.BLUE; // c2 is now a Color.Blue with the value of "#735CDD"
let colorname: string = Color.GREEN; // colorName is now a string with the value of "#C2F8CB"
// Enums allow you to define a set of named constants

// by default, enums are numeric, starting at 0, but you can assign different values to each
enum Onboarding {
  StartedOnboarding, // this has the index value of 0
  MiddleOnboarding, // this has the index value of 1
  EndOnboarding, // this has the index value of 2
}

// 7. any
// The any type is a powerful, but not good, way to describe types. Do not use it, if possible, because it is too borad and it will disable all kinds of type checking in TypeSCript
let notSure: any = 4; // type is number
notSure = "hello"; // now the type is string
notSure = { color: "blue" }; // now the type is an object with a property of color and it's value "blue"
// Take a jenga for example. Whenever you use the type any, you take out one of the blocks of the jenga tower. When you use too many "any", it will destabilize your whole project and make it more error prone

// 8. Void
// The void type is used for functions, that DO NOT return a value
function warnUser(): void {
  console.log("This function does not return a value");
  // return 42; This will cause a compiler error, because we can't return anything in a void function
}
// The void function is primarily used to process some logics and doesn't return anything. If you want to return something, for example a status of "OK", just use a normal function, else it is a void function => prime example is a button which is used to start something, but doesn't expect anything in return
// The void function is very important when using modern frameworks such as React, Vue, Svelte, Solid, Angular, etc.

// 9. null & undefined
// TypeScript has two special types: null and undefined
// The have their respective uses:
// The null type is used to represent the absence of a value
// the undefine type is used to represent a variable that has not yet been assigne a value
let u1: undefined; // Explicitly setting the variable as undefined, because the variable is of type "any" if we don't type assign the undefined
let u2: undefined | string;
u2 = "hello"; // now it works, because u2 can be either undefined or string
// undefined is usually used in libraries and not in combination with databases
// let u3: null;
// u3 = 2 is not valid, because u3 is of only type null
let u3: null | string;
u3 = "world"; // now it is valid, because we have a union type, which is either null or string
// this is used primarily when working with databases

// 10. Objects
// The object type represents any non-primitive type
// that means it's neither a string, number, boolean, symbol, null or undefined
let oldSyntax: {} = { name: "John" }; // the old syntax, which will cause an error with some linters such as Biome.js out of the box
let newSyntax: object = { surname: "Doe" }; // the newer version which is a bit more concise
// let object: { name: string; age: number } = { name: "John", age: 25, surname: "Doe" }; This will throw an error because we did not define the surname property
let object: { name: string; age: number; surname: string } = {
  name: "John",
  age: 25,
  surname: "Doe",
};

// 11. Union Types
// Union types allow you to combine multiple types into a single type.
// A variable with a union type can hold a value of any of the types specified in the union.
let id: number | string;
id = 101; // id is now a number
id = "asd293-asd03-asd"; // id is now a string

// Union types are a powerful way to combine multiple types into a single type.
// For example in a web form, the input can be either a string or a number
// TypeScript will enforce that the value assigned to a union type that matches one of the types in the union
