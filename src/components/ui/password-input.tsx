import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';

import { Input } from '@/components/ui/input.tsx';
import { cn } from '@/lib/utils';

import { Button } from './button';

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, 'type'>;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className={cn('relative rounded-md', className)}>
        <Input ref={ref} disabled={disabled} type={showPassword ? 'text' : 'password'} {...props} />
        <Button
          className='absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md text-muted-foreground'
          disabled={disabled}
          size='icon'
          type='button'
          variant='ghost'
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
