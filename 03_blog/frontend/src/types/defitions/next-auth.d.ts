// this is only being created, so we can extend the existing User, JWT and session type definitions of auth.js
import "next-auth";
import "@auth/core/jwt";

// module augmentation - extends existing auth.js types
declare module "next-auth" {
  // here we extend the default auth.js session interface
  interface Session {
    accessToken: string; // add custom property accessToken to the session type
    username: string; // add custom property username to the session type
  }

  // here we extend the default auth.js user interface
  interface User {
    accessToken: string; // add custom property accessToken to the user type
    username: string; // add custom property username to the user type
  }
}

// module augmentation - extends existing auth.js jwt type
declare module "@auth/core/jwt" {
  // here we extend the default auth.js jwt interface
  interface JWT {
    accessToken: string; // add custom property accessToken to the user type
    username: string; // add custom property username to the user type
  }
}
