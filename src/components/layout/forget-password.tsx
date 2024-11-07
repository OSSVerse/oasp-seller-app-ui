import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { type FieldValues, useForm } from "react-hook-form";
import { EMAIL_REGEX } from "@/lib/constant";
import { useModal } from "@/store/modal-store";
import { forgetPassword } from "@/services/authentication-services";

const ForgetPassword = ({
  className,
  close,
  backtoLogin,
}: { className?: string; close: () => void; backtoLogin: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { onOpen, onClose } = useModal();

  const onSubmit = async (data: FieldValues) => {
    const res = await forgetPassword(data.email);
    if (res) {
      onOpen("confirmationDialog", {
        confirmationDialog: {
          title: "Reset Password",
          content:
            "A link has been sent to your email. Please check your inbox and follow the instructions.",
          onConfirm: () => {
            onClose();
            close();
          },
        },
      });
    }
  };
  return (
    <div
      className={cn(
        "fixed page-root top-0 left-0 z-30 w-full h-16  !py-0 bg-white flex justify-between items-center",
        className,
      )}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" h-full flex gap-8 items-center"
      >
        <div>
          <Input
            type="text"
            placeholder="Enter email address"
            className="w-60"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">
              {errors?.email?.message as string}
            </p>
          )}
        </div>
        <Button type="submit">Reset Password</Button>
      </form>
      <div className=" flex space-x-3 items-center text-sm">
        <button
          type="button"
          onClick={backtoLogin}
          className=" cursor-pointer "
        >
          Back to Login
        </button>

      </div>
    </div>
  );
};

export default ForgetPassword;
