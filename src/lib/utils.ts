import type { MutableRefObject, RefCallback } from 'react';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';

import { AxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatPhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3 $4 $5');

export const formatPrice = (price: number) =>
  price.toLocaleString('uz-UZ', { style: 'currency', currency: 'UZS' });

export const calculateIELTSBand = (scores: number[]) => {
  if (scores.length === 0) {
    throw new Error('At least one score is required.');
  }

  const total = scores.reduce((sum, score) => sum + score, 0);
  const average = total / scores.length;

  // Round to nearest 0.5
  return Math.round(average * 2) / 2;
};

export type MutableRefList<T> = Array<MutableRefObject<T> | RefCallback<T> | null | undefined>;

export function mergeRefs<T>(...refs: MutableRefList<T>): RefCallback<T> {
  return (val: T) => {
    setRef(val, ...refs);
  };
}
export function setRef<T>(val: T, ...refs: MutableRefList<T>): void {
  refs.forEach((ref) => {
    if (typeof ref === 'function') {
      ref(val);
    } else if (ref != null) {
      ref.current = val;
    }
  });
}

export function handleFormServerErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
) {
  if (error instanceof AxiosError) {
    const serverErrors = error.response?.data?.error;

    if (serverErrors && typeof serverErrors === 'object') {
      // For each server error, set it to the corresponding field in the form.
      Object.entries(serverErrors).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          setError(field as Path<T>, {
            type: 'server',
            message: messages[0] // Use the first error message
          });
        } else if (typeof messages === 'string') {
          setError(field as Path<T>, {
            type: 'server',
            message: messages
          });
        }
      });
    } else if (typeof serverErrors === 'string') {
      toast.error(serverErrors);
    }
  } else {
    toast.error('Occurred unexpected error, refresh the page and try again!');
  }
}
