import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import Button from "../components/ReusableComponent/Button";
import { useRegister } from "../hooks/useRegisterAndLogin";
import { registerSchema } from "../Schema/registerAndLoginSchema";
import { getPasswordStrength } from "../utls/strongPassword";

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, errors, registerUserMutation, isPending } = useRegister();
  const onSubmit = (data: RegisterFormData) => {
    console.log("data -->", data);
    registerUserMutation(data);
  };

  const watchedPassword = watch("password");
  const passwordStrength = getPasswordStrength(watchedPassword || "");

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Create Your Account
          </h2>
          <p className="text-white/70">
            Join us to discover amazing events and book your spot
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                First Name
              </label>
              <input
                id="firstName"
                {...register("firstName")}
                type="text"
                className={`
                  w-full px-4 py-3 rounded-lg border transition-all duration-200
                  bg-white/10 backdrop-blur-sm text-white placeholder-white/50
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                  ${errors.firstName ? 'border-red-400' : 'border-white/20 hover:border-white/30'}
                `}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                {...register("lastName")}
                type="text"
                className={`
                  w-full px-4 py-3 rounded-lg border transition-all duration-200
                  bg-white/10 backdrop-blur-sm text-white placeholder-white/50
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                  ${errors.lastName ? 'border-red-400' : 'border-white/20 hover:border-white/30'}
                `}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                id="email"
                {...register("email")}
                type="email"
                className={`
                  w-full px-4 py-3 rounded-lg border transition-all duration-200
                  bg-white/10 backdrop-blur-sm text-white placeholder-white/50
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                  ${errors.email ? 'border-red-400' : 'border-white/20 hover:border-white/30'}
                `}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
            
           <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className={`
                    w-full px-4 py-3 pr-12 rounded-lg border transition-all duration-200
                    bg-white/10 backdrop-blur-sm text-white placeholder-white/50
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    ${errors.password ? 'border-red-400' : 'border-white/20 hover:border-white/30'}
                  `}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {watchedPassword && (
                <div className="mt-2 flex items-center justify-between">
                  <span className={`text-sm ${passwordStrength.color}`}>
                    {passwordStrength.strength}
                  </span>
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1 w-8 rounded-full transition-all ${
                          passwordStrength.strength === "Weak" && level === 1
                            ? "bg-red-400"
                            : passwordStrength.strength === "Medium" && level <= 2
                            ? "bg-yellow-400"
                            : passwordStrength.strength === "Strong" && level <= 3
                            ? "bg-green-400"
                            : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className={`
                w-full py-3 px-4 rounded-lg font-semibold text-white
                transition-all duration-300 ease-out
                ${(isPending)
                  ? 'bg-gray-500/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl hover:scale-105'
                }
              `}
            >
              {(isPending) ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/60">Already have an account?</span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Sign in to your account
            </Link>
          </div>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center text-white/60 text-sm">
          <p>
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-purple-400 hover:text-purple-300 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;