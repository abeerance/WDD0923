"use client";

import { signupAction } from "@/actions/sign-up/sign-up-action";
import { NavLink } from "@/components/nav-link/nav-link";
import { Button } from "@/components/ui/button/button";
import { Grid, GridItem } from "@/components/ui/grid/grid";
import { Input } from "@/components/ui/input/input";
import { Text } from "@/components/ui/text/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// this is used for the formstate so we can change the form context
type FormState = "login" | "sign-up";

// this is the login schema which is being used for the login validation
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// this is the signup schema which is being used for the signup validation
const signupSchema = z
  .object({
    email: z.string().email("Invalid E-Mail address"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    // here we define where the refine should take place to observe if the passwords are the same
    path: ["password_confirmation"],
  });

// now we need to define the formdata types so we can infer and add the previously created scemas to a type
type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupLoginPage() {
  const [state, setState] = useState<FormState>("login");

  // now we create two different forms, one for the login form and one for the signup form, both of them have a unique form-context, because we are adding the schema and the formData to the context
  // react hook form is primarily used for the state in the form, aka. form data handling
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit", // this means that the validation will only trigger when we submit the form
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit", // this means that the validation will only trigger when we submit the form
  });

  // here we now create two different submits in how the form should be handled on a submit
  const onLoginSubmit = async (data: LoginFormData) => {
    console.log("Login data: ", data);

    // we call the signIn() function of auth.js here so that we can log in the user
    try {
      // call the signIn() function which calls the authorize function in auth.ts
      const result = await signIn("login", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      console.log(result);
    } catch {}
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    // we call on the sign up server action
    const result = await signupAction(data);

    if (result.success) {
      // post a success toast with the message provided below
      toast.success("Successful, you can login now");
      setState("login");
      // reset the form so that we don't have any stale data
      signupForm.reset();
    } else {
      console.error("Signup failed: ", result.error);
    }
  };

  if (state === "login") {
    return (
      <form
        key="login-form" // needed for the unique form
        className="flex flex-col min-h-svh items-center justify-center"
        // here we connect the form with all the previous stuff of the loginForm with the help of the onSubmit property
        onSubmit={loginForm.handleSubmit(onLoginSubmit)}
      >
        <Grid>
          <GridItem
            span={{ lg: 6, md: 8, sm: 12 }}
            offset={{ lg: 3, md: 2, sm: 0 }}
            className="flex flex-col gap-l"
          >
            <div className="relative max-w-[60px] min-w-[30px] w-full aspect-video">
              <Image src="/logo/wandrstay-logo.svg" alt="wandrstay logo" fill />
            </div>
            <Text>Welcome Back!</Text>
            <Input
              // here we spread the whole loginform object, and connect it specifically to the username. Now the input knows, that is has the state management of loginForm specifically for username
              {...loginForm.register("username")}
              id="username"
              name="username"
              label="Username"
              placeholder="Username"
              // here we connect the formState to the error of the input. Once we have an error in the formState of username, the error will be shown
              error={loginForm.formState.errors.username?.message}
            />
            <Input
              // here we spread the whole loginform object, and connect it specifically to the password. Now the input knows, that is has the state management of loginForm specifically for password
              {...loginForm.register("password")}
              id="password"
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              // here we connect the formState to the error of the input. Once we have an error in the formState of password, the error will be shown
              error={loginForm.formState.errors.password?.message}
            />
          </GridItem>
          <GridItem
            span={{ lg: 6, md: 8, sm: 12 }}
            offset={{ lg: 3, md: 2, sm: 0 }}
            className="flex flex-col gap-l"
          >
            <NavLink
              href="/password-reset"
              className="underline font-bold self-end"
              textVariant="body-micro"
            >
              Forgot Password?
            </NavLink>
            <Button label="Login" type="submit" textVariant="label-small" />
          </GridItem>
          <GridItem
            span={{ lg: 6, md: 8, sm: 12 }}
            offset={{ lg: 3, md: 2, sm: 0 }}
            className="flex gap-1"
          >
            <Text variant="body-micro">Don&apos;t have an account?</Text>
            <Button
              variant="ghost"
              label="Sign up"
              textVariant="body-micro"
              onClick={() => setState("sign-up")}
            />
          </GridItem>
        </Grid>
      </form>
    );
  }

  return (
    <form
      key="signup-form" // needed for the unique form
      className="flex flex-col min-h-svh items-center justify-center"
      // here we connect the form with all the previous stuff of the signupForm with the help of the onSubmit property
      onSubmit={signupForm.handleSubmit(onSignupSubmit)}
    >
      <Grid>
        <GridItem
          span={{ lg: 6, md: 8, sm: 12 }}
          offset={{ lg: 3, md: 2, sm: 0 }}
          className="flex flex-col gap-l"
        >
          <div className="relative max-w-[60px] min-w-[30px] w-full aspect-video">
            <Image src="/logo/wandrstay-logo.svg" alt="wandrstay logo" fill />
          </div>
          <Text>Sign up and Wandr!</Text>
          <Input
            {...signupForm.register("email")}
            id="email"
            name="email"
            label="E-Mail"
            placeholder="E-Mail"
            error={signupForm.formState.errors.email?.message}
          />
          <Input
            {...signupForm.register("username")}
            id="username"
            name="username"
            label="Username"
            placeholder="Username"
            error={signupForm.formState.errors.username?.message}
          />
          <Input
            {...signupForm.register("password")}
            id="password"
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            error={signupForm.formState.errors.password?.message}
          />
          <Input
            {...signupForm.register("password_confirmation")}
            id="password_confirmation"
            name="password_confirmation"
            label="Repeat Password"
            placeholder="Repeat Password"
            type="password"
            error={signupForm.formState.errors.password_confirmation?.message}
          />
        </GridItem>
        <GridItem
          span={{ lg: 6, md: 8, sm: 12 }}
          offset={{ lg: 3, md: 2, sm: 0 }}
          className="flex flex-col mt-s"
        >
          <Button type="submit" label="Sign up" textVariant="label-small" />
        </GridItem>
        <GridItem
          span={{ lg: 6, md: 8, sm: 12 }}
          offset={{ lg: 3, md: 2, sm: 0 }}
          className="flex gap-1"
        >
          <Text variant="body-micro">Already have an account?</Text>
          <Button
            variant="ghost"
            label="Sign up"
            textVariant="body-micro"
            onClick={() => setState("login")}
          />
        </GridItem>
      </Grid>
    </form>
  );
}
