import type React from 'react';

import { cn } from '@/lib/utils.ts';

interface Props extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

export const EditorPreview = ({ className, ...props }: Props) => {
  return <div className={cn('ProseMirror', className)} {...props} />;
};
