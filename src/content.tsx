import { FC, HTMLAttributes, ReactNode, RefCallback } from 'react';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  contentRef: RefCallback<HTMLDivElement>;
  scrollRef: RefCallback<HTMLDivElement>;
  children: ReactNode;
}

export const Content: FC<Props> = ({ children, scrollRef, contentRef, ...props }) => {
  return (
    <div
      ref={scrollRef}
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <div {...props} ref={contentRef}>
        {children}
      </div>
    </div>
  );
};
