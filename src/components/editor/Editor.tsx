import React from 'react';
import RichTextEditor from 'reactjs-tiptap-editor';

import { useTheme } from '@/utils/context';

import { myExtensions } from './extentions';

import 'reactjs-tiptap-editor/style.css';
import './custom-styles.css';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface Props
  extends PartialBy<React.ComponentProps<typeof RichTextEditor>, 'extensions' | 'output'> {}

export const Editor = ({ extensions = myExtensions, output = 'html', ...props }: Props) => {
  const { theme } = useTheme();
  return (
    <RichTextEditor
      contentClass='mx-auto max-w-7xl w-full'
      extensions={extensions}
      output={output}
      {...props}
      dark={theme === 'dark'}
    />
  );
};
