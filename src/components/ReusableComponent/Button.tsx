import { LoaderCircle } from "lucide-react";
import type { ButtonProps } from "../../type";


const Button = ({ children, className, isLoading, onClick, disabled, type }: ButtonProps) => {
  return (
    <button className={`px-12 py-4 rounded-full transition-all duration-300 cursor-pointer ${className}`} onClick={onClick} disabled={disabled} type={type}>
     {isLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : children}
    </button>
  )
}

export default Button;