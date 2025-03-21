import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'flex w-full rounded-md bg-transparent px-3 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-sm',
  {
    variants: {
      variant: {
        default:
          'border border-input bg-background shadow-sm focus-visible:ring-1 focus-visible:ring-ring',
        ghost: 'focus-visible:bg-accent hover:bg-accent/80'
      },
      size: {
        default: 'py-2 min-h-9',
        sm: 'py-1 text-sm min-h-8',
        lg: 'min-h-11'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ size, variant }), className)}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
