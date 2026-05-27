"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TextField, Label, Input, FieldError, Form } from "@heroui/react";
import {
  FiMail,
  FiLock,
  FiLogIn,
  FiArrowRight,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Verifying credentials...");

    const formData = new FormData(e.currentTarget);

    const userCredentials = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userCredentials.email,

      password: userCredentials.password,
    });

    if (data) {
      toast.success("Welcome back!", { id: loadingToast });

      redirect("/");
    }

    if (error) {
      toast.error(error.message || "Invalid email or password", {
        id: loadingToast,
      });
    }
  };

  const handleGoogleLogin = async () => {
    const loadingToast = toast.loading("Redirecting to Google...");

    try {
      await authClient.signIn.social({
        provider: "google",

        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google Login Error:", error);

      toast.error("Failed to connect with Google.", { id: loadingToast });
    }
  };


  const containerVariants = {
    hidden: { opacity: 0, y: 30 },

    visible: {
      opacity: 1,

      y: 0,

      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },

    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const inputClassNames = {
    inputWrapper:
      "bg-white/60 rounded-xl border border-stone-200 group-hover:border-amber-200 focus-within:border-amber-500 transition-all h-12 min-h-12 shadow-none px-4",
    input: "text-sm",
  };

  return (

    <div className="bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-100 via-rose-50 to-white min-h-screen text-stone-700 font-sans flex items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden">

      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md bg-white/40 backdrop-blur-md border border-white p-8 md:p-10 rounded-3xl shadow-xl shadow-stone-200/50 relative z-10"
      >

        <div className="text-center mb-8">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-serif text-stone-900 mb-2 tracking-wide"
          >
            Welcome Back
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-sm text-stone-500 font-light"
          >
            Sign in to access your luxury scent sanctuary.
          </motion.p>
        </div>

        <Form onSubmit={onSubmit} className="px-0 py-0 space-y-5 w-full">

          <motion.div
            variants={itemVariants}
            className="group transition-all duration-300 w-full"
          >
            <TextField name="email" type="email" isRequired className="w-full">
              <Label className="flex items-center gap-2 text-xs font-bold text-gray-800 mb-2 group-focus-within:text-amber-600 transition-colors tracking-widest uppercase">
                <FiMail className="text-stone-500" /> Email Address
              </Label>

              <Input
                placeholder="name@example.com"
                className="w-full"
                classNames={inputClassNames}
              />

              <FieldError className="text-[10px] text-rose-500 mt-1" />
            </TextField>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="group transition-all duration-300 w-full"
          >
            <TextField
              name="password"
              type="password"
              isRequired
              className="w-full"
            >
              <div className="flex justify-between items-center mb-2">
                <Label className="flex items-center gap-2 text-xs font-bold text-gray-800 group-focus-within:text-amber-600 transition-colors tracking-widest uppercase">
                  <FiLock className="text-stone-500" /> Password
                </Label>
              </div>

              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full"
                  classNames={{
                    inputWrapper:
                      "bg-white/60 rounded-xl border border-stone-200 group-hover:border-amber-200 focus-within:border-amber-500 transition-all h-12 min-h-12 shadow-none px-4",
                    input: "text-sm pr-10",
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-600 transition-colors z-10"
                >
                  {showPassword ? (
                    <FiEyeOff className="text-lg" />
                  ) : (
                    <FiEye className="text-lg" />
                  )}
                </button>
              </div>

              <FieldError className="text-[10px] text-rose-500 mt-1" />
            </TextField>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold tracking-widest uppercase text-xs py-3.5 rounded-xl shadow-md shadow-amber-600/10 transition-all duration-300 hover:cursor-pointer"
            >
              <span>Sign In</span>

              <FiLogIn className="text-sm" />
            </motion.button>
          </motion.div>
        </Form>

        {/* Divider Bar */}

        <motion.div
          variants={itemVariants}
          className="relative flex py-5 items-center"
        >
          <div className="grow border-t border-stone-200"></div>

          <span className="shrink mx-4 text-stone-400 text-xs font-light tracking-wider uppercase">
            or
          </span>

          <div className="grow border-t border-stone-200"></div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.button
            onClick={handleGoogleLogin}
            whileHover={{
              scale: 1.02,

              backgroundColor: "rgba(255,255,255,0.9)",
            }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="flex items-center justify-center gap-3 w-full bg-white/60 border border-stone-200 hover:border-stone-300 text-stone-700 font-medium text-sm py-3 rounded-xl transition-all duration-300 shadow-sm cursor-pointer"
          >
            <FcGoogle className="text-xl" />

            <span>Continue with Google</span>
          </motion.button>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-center text-sm text-stone-500 font-light mt-8"
        >
          Do not have an account?{" "}
          <Link
            href="/register"
            className="group inline-flex items-center gap-1 font-semibold text-amber-600 hover:text-amber-500 transition-colors"
          >
            Create one{" "}
            <FiArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
