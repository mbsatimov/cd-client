import parse, { type DOMNode } from 'html-react-parser';
import React from 'react';

interface DynamicContentReplacerProps {
  content: string;
  searchValue: string;
  replacer: (index: number) => React.ReactNode;
}

export const DynamicContentReplacer: React.FC<DynamicContentReplacerProps> = ({
  content,
  searchValue,
  replacer
}) => {
  let componentIndex = 0;

  const options = {
    replace: (domNode: DOMNode) => {
      if (domNode.type === 'text' && domNode.data.includes(searchValue)) {
        const splitContent = domNode.data.split(searchValue);

        return (
          <>
            {splitContent.map((part, index) => (
              <React.Fragment key={`${componentIndex}-${index}`}>
                {part}
                {index !== splitContent.length - 1 && replacer(componentIndex++)}
              </React.Fragment>
            ))}
          </>
        );
      }
      return undefined; // Keep all other nodes intact
    }
  };

  return <>{parse(content, options)}</>;
};
