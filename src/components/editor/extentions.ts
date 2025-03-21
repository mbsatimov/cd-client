import {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Color,
  ColumnActionButton,
  FontSize,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Image,
  Italic,
  LineHeight,
  MoreMark,
  OrderedList,
  Strike,
  Table,
  TextAlign,
  Underline
} from 'reactjs-tiptap-editor/extension-bundle';

import 'reactjs-tiptap-editor/style.css';

export const myExtensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true
    },
    characterCount: {
      limit: 50_000
    }
  }),
  History,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
  LineHeight,
  Image.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files));
        }, 500);
      });
    },
    resourceImage: 'upload'
  }),
  Blockquote.configure({ spacer: true }),
  HorizontalRule,
  ColumnActionButton,
  Table.configure({
    resizable: true
  })
];
