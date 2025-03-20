const userName: string = "My username";

const age: number = 26;

const isActive: boolean = true;

const hobbies: string[] = ["Music", "Gaming", "Reading"];

const userInformation: [number, string, boolean] = [6, userName, isActive];

const greetUser = (userName: string) => {
  console.log(`Hello ${userName}, welcome to the webapp`);
};

greetUser(userName);

const numberOrNull: number | null = null;
