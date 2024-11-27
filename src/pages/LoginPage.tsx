import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/validation/validations";

const LoginPage = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => console.log(data))}>
            <Card className="w-96 mx-auto bg-white">
              <CardHeader>
                <CardTitle>Login to JobSprint</CardTitle>
                <CardDescription>
                  Enter your email below to login your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="johndoe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p>
                  Don't have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="font-semibold"
                  >
                    Sign up
                  </Link>
                </p>
                <Button type="submit">Login</Button>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default LoginPage;
