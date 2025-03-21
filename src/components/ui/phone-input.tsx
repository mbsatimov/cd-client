'use client';
import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';

import { Input } from '@/components/ui';
import { cn } from '@/lib/utils';

type PhoneInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, ...props }, ref) => {
  return (
    <RPNInput.default
      limitMaxLength
      ref={ref}
      className={cn('flex', className)}
      countries={['UZ']}
      countrySelectComponent={() => null}
      inputComponent={Input}
      onChange={(value) => onChange?.(value as RPNInput.Value)}
      {...props}
    />
  );
});
PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
