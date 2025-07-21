import { Link } from "react-router-dom";
import Button from "../components/ReusableComponent/Button";
import type { LoginFormData } from "../hooks/FetchingAndPost";
import { useLogin } from "../hooks/useRegisterAndLogin";

const Login = () => {
  const { register, handleSubmit, errors, loginUserMutation, isPending } = useLogin();
  const onSubmit = (data: LoginFormData) => {
    loginUserMutation(data);
  };
 
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Login to your account
          </h2>
          <p className="text-white/70">
            Welcome back! Please enter your details.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  type="password"
                  className={`
                    w-full px-4 py-3 pr-12 rounded-lg border transition-all duration-200
                    bg-white/10 backdrop-blur-sm text-white placeholder-white/50
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    ${errors.password ? 'border-red-400' : 'border-white/20 hover:border-white/30'}
                  `}
                  placeholder="Create a strong password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>
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
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </Button>
          </form>
              

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/60">Already have an account?</span>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;