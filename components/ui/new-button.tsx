import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-white mx-auto text-center rounded-full",
    {
        variants: {
            variant: {
                default: "border-blue-500/20 text-white",
                solid: "bg-blue-500 hover:bg-blue-600 text-white border-transparent hover:border-blue-400/50 transition-all duration-200",
                ghost: "border-transparent bg-transparent text-white hover:border-zinc-600 hover:bg-white/10",
                outline: "bg-transparent border border-gray-600 text-white hover:bg-gray-800/50 hover:border-blue-400 transition-all duration-200",
            },
            size: {
                default: "px-7 py-1.5 ",
                sm: "px-4 py-0.5 ",
                lg: "px-10 py-2.5 ",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { neon?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                <span className={cn("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-500 to-transparent hidden", neon && "block")} />
                {children}
                <span className={cn("absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-500 to-transparent hidden", neon && "block")} />
            </button>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };