import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // secred which is being used to encrypt/decrypt JWT tokens and session data
  secret: process.env.AUTH_SECRET,

  // custom paages configruation - redirects login attemts to /signup-login instead of the usual api/auth/signin
  pages: { signIn: "/signup-login" },

  providers: [
    Credentials({
      // provider configuration for id/name
      id: "login",
      name: "login",

      // define what credentials are expected from the client
      credentials: {
        username: {},
        password: {},
      },

      // async function that is being called when we are calling the signIn() function from a component
      authorize: async (credentials) => {
        // validate if the input of the credentials exists
        if (!credentials.username || !credentials.password) {
          throw new Error("Missing credential information");
        }

        // Make API call to the backend authentication endpoint
        const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        // we save the response to another variable
        const data = await response.json();

        // handle failed authentication
        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        // the returned data object from the backend shoul be stored in a JWT/session in auth.js. This return will ensure, that if the response is correct, that it will store the information in the cookies of the web-browser. This MUST match your User interface definition
        return {
          id: data.user.id.toString(),
          username: data.user.username,
          email: data.user.email,
          accessToken: data.token,
        };
      },
    }),
  ],
});
