"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Button,
  Input,
  Card,
  TextField,
  Label,
  FieldError,
  Form,
} from "@heroui/react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiImage,
  FiUserPlus,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { BsGoogle } from "react-icons/bs";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

    return passwordRegex.test(password);
  };

  const inputClassNames = {
    inputWrapper:
      "bg-white/60 rounded-xl border border-stone-200 group-hover:border-stone-300 focus-within:border-amber-500 transition-all h-11 min-h-11 shadow-none px-3",
    input: "text-sm",
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());

    console.log(user);

    if (!validatePassword(user.password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number, special character and minimum 6 characters."
      );

      return;
    }

    const { data, error } = await authClient.signUp.email({
      email: user.email,

      password: user.password,

      name: user.fullName,

      image: user.imageUrl,
    });

    if (data) {
      redirect("/");
    }

    if (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
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

      transition: {
        duration: 0.6,

        ease: "easeOut",

        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },

    visible: {
      opacity: 1,

      y: 0,

      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-100 via-rose-50 to-white min-h-screen w-full text-stone-700 font-sans flex items-center justify-center pt-28 pb-16 px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md z-10 my-10"
      >

        <div className="text-center mb-8 group cursor-default">
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-serif text-stone-900 mb-2 tracking-wide"
          >
            Create Account
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-sm text-stone-500 font-light"
          >
            Join us to curate your personal luxury collection.
          </motion.p>
        </div>

        <Card className="border-none bg-white/40 backdrop-blur-md shadow-xl shadow-stone-200/50 rounded-3xl overflow-hidden">
          <div className="p-0">
            <Form onSubmit={onSubmit} className="px-8 pt-10 pb-4 space-y-5">

              <motion.div
                variants={itemVariants}
                className="group transition-all duration-300 w-full"
              >
                <TextField isRequired type="text" className="w-full">
                  <Label className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-500 mb-2 group-focus-within:text-amber-600 transition-colors">
                    <FiUser className="text-stone-400" />
                    Full Name
                  </Label>

                  <Input
                    name="fullName"
                    placeholder="Enter your name"
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
                <TextField type="email" isRequired className="w-full">
                  <Label className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-500 mb-2 group-focus-within:text-amber-600 transition-colors">
                    <FiMail className="text-stone-400" />
                    Email Address
                  </Label>

                  <Input
                    name="email"
                    type="email"
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
                <TextField type="url" className="w-full">
                  <Label className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-500 mb-2 group-focus-within:text-amber-600 transition-colors">
                    <FiImage className="text-stone-400" />
                    Profile Image URL
                  </Label>

                  <Input
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
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
                <TextField type="password" isRequired className="w-full">
                  <Label className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-500 mb-2 group-focus-within:text-amber-600 transition-colors">
                    <FiLock className="text-stone-400" />
                    Password
                  </Label>

                  <div className="relative w-full">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full"
                      classNames={{
                        inputWrapper:
                          "bg-white/60 rounded-xl border border-stone-200 group-hover:border-stone-300 focus-within:border-amber-500 transition-all h-11 min-h-11 shadow-none px-3",
                        input: "text-sm pr-10",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-600 transition-colors z-10"
                    >
                      {showPassword ? (
                        <FiEyeOff className="text-lg" />
                      ) : (
                        <FiEye className="text-lg" />
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-400 mt-2 leading-relaxed">
                    Password must contain at least 1 uppercase, 1 lowercase, 1
                    number, 1 special character and minimum 6 characters.
                  </p>

                  <FieldError className="text-[10px] text-rose-500 mt-1" />
                </TextField>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2 w-full">
                <Button
                  type="submit"
                  className="w-full h-11 bg-amber-600 hover:bg-amber-500 text-white font-semibold tracking-widest uppercase text-xs rounded-xl transition-all duration-300 shadow-md shadow-amber-600/10"
                  endContent={<FiUserPlus className="text-sm" />}
                >
                  Create Account
                </Button>
              </motion.div>
            </Form>

            <div className="px-8 pb-10 space-y-6 text-center">
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <div className="h-px flex-1 bg-stone-200" />

                <span className="text-xs text-stone-400 font-light tracking-wider uppercase">
                  Or
                </span>

                <div className="h-px flex-1 bg-stone-200" />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  onClick={handleGoogleSignUp}
                  variant="bordered"
                  className="w-full h-11 bg-white/60 border border-stone-200 hover:border-stone-300 text-stone-700 font-medium text-sm rounded-xl transition-all duration-300 shadow-sm"
                  startContent={<FcGoogle className="text-xl" />}
                >
                  <BsGoogle />
                  Sign up with Google
                </Button>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-center text-sm text-stone-500 font-light pt-2"
              >
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="group inline-flex items-center gap-1 font-semibold text-amber-600 hover:text-amber-500 transition-colors"
                >
                  <FiArrowLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" />
                  Sign In
                </Link>
              </motion.p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUpPage;