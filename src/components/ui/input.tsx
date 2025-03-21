import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full text-sm rounded-md bg-transparent px-3 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border border-input bg-background shadow-sm focus-visible:ring-1 focus-visible:ring-ring',
        ghost: 'focus-visible:bg-accent hover:bg-accent/80'
      },
      size: {
        default: 'h-9 py-1',
        sm: 'h-8 text-sm',
        lg: 'h-11'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input ref={ref} className={cn(inputVariants({ size, variant }), className)} {...props} />
    );
  }
);
Input.displayName = 'Input';

export { Input };
