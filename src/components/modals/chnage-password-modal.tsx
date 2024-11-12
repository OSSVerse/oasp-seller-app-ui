"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/store/modal-store";
import { type FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { ChangePasswordPayload } from "@/store/auth-store";
import { changePassword } from "@/services/authentication-services";

const ChangePasswordModal = () => {
    const { isOpen, onClose, type } = useModal();


    const isModalOpen = isOpen && type === "changePassword";
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },

    } = useForm();
    const onSubmit = async (data: FieldValues) => {
        try {

            await changePassword(data as ChangePasswordPayload);
            onClose();

        } catch (error) {
            console.log(error);
        }
    };

    if (!isModalOpen) return null;
    return (
        <Dialog test-id="change-password-modal" open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="">
                        Change Password
                    </DialogTitle>
                    <DialogDescription className=" ">
                        Please enter your current password and the new password you want to set.
                    </DialogDescription>


                </DialogHeader>
                <DialogDescription>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="  flex flex-col gap-8 items-stretch p-8"
                    >
                        <div>
                            <Input
                                type="text"
                                placeholder="Username or Email"
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
                        <div>
                            <Input
                                type="password"
                                placeholder="New Password"
                                {...register("newPassword", {
                                    required: {
                                        value: true,
                                        message: "New Password is required",
                                    },
                                })}
                            />
                            {errors.newPassword && (
                                <p className="text-red-500 text-xs">
                                    {errors?.newPassword?.message as string}
                                </p>
                            )}
                        </div>


                        <DialogFooter>
                            <Button disabled={isSubmitting} type="submit">

                                {isSubmitting ? "Changing..." : "Change Password"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogDescription>

            </DialogContent>
        </Dialog>
    );
};

export default ChangePasswordModal;
