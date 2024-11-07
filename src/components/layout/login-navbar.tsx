import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { type FieldValues, useForm } from "react-hook-form";
import useAuthStore, { type LoginPayload } from "@/store/auth-store";
import { useState } from "react";
import ForgetPassword from "./forget-password";

const LoginNavbar = ({
  className,
  close,
}: { className?: string; close: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuthStore((state) => state);
  const onSubmit = (data: FieldValues) => {
    login(data as LoginPayload, rememberMe);
    console.log("rached here");
    close();
  };
  const [forgetPassword, setForgetPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <div
      className={cn(
        "fixed page-root top-0 left-0 z-20 w-full h-16  !py-0 bg-white flex justify-between shadow items-center",
        className,
      )}
    >
      {forgetPassword && (
        <ForgetPassword
          close={close}
          backtoLogin={() => setForgetPassword(false)}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" h-full flex gap-8 items-center"
      >
        <div>
          <Input
            type="text"
            placeholder="Username or Email"
            className="w-60"
            {...register("email", {
              required: {
                value: true,
                message: "Username or Email is required",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">
              {errors?.email?.message as string}
            </p>
          )}
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            className="w-60"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">
              {errors?.password?.message as string}
            </p>
          )}
        </div>
        <Button type="submit">Login</Button>
      </form>
      <div className=" flex space-x-3 items-center text-sm">
        <div className=" flex items-center gap-2">
          <Checkbox
            id="terms"
            checked={rememberMe}
            onClick={() => setRememberMe(!rememberMe)}
          />
          <label
            htmlFor="terms"
            className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <div className="w-px h-6 bg-gray-300" />
        <button
          type="button"
          onClick={() => setForgetPassword(true)}
          className=" cursor-pointer "
        >
          Forgot Password
        </button>
        {/* <div className="w-px h-6 bg-gray-300" /> */}
      </div>
    </div>
  );
};

export default LoginNavbar;
