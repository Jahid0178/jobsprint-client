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
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "@/validation/validations";
import { useDispatch, useSelector } from "react-redux";
import { resetState, userRegister } from "@/features/auth/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import toast from "react-hot-toast";
import { useEffect } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { success, error } = useSelector((state: RootState) => state.auth);
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof registerFormSchema>) => {
    dispatch(userRegister(data));
  };

  useEffect(() => {
    if (success && !error) {
      toast.success("User registered successfully");
      dispatch(resetState());
      navigate("/auth/login");
    }
  }, [success, error]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <div className="container">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
            <Card className="w-96 mx-auto bg-white">
              <CardHeader>
                <CardTitle>Register to JobSprint</CardTitle>
                <CardDescription>
                  Enter your details below to register your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
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
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="font-semibold"
                  >
                    Login
                  </Link>
                </p>
                <Button type="submit">Register</Button>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default RegisterPage;
