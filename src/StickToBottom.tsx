import { createContext, FC, HTMLAttributes, ReactNode, RefCallback, useContext, useLayoutEffect } from 'react';
import { ScrollToBottom, StickToBottomOptions, useStickToBottom } from './useStickToBottom.js';
import { Content } from './content.js';

export interface StickToBottomContext {
  contentRef: RefCallback<HTMLDivElement>;
  scrollRef: RefCallback<HTMLDivElement>;
  scrollToBottom: ScrollToBottom;
  isAtBottom: boolean;
  isNearBottom: boolean;
  escapedFromLock: boolean;
}

const StickToBottomContext = createContext<StickToBottomContext>({
  contentRef: () => {},
  scrollRef: () => {},
  scrollToBottom: () => false,
  isAtBottom: false,
  isNearBottom: false,
  escapedFromLock: false,
});

export const useStickToBottomContext = () => useContext<StickToBottomContext>(StickToBottomContext);

export interface StickToBottomProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>, StickToBottomOptions {
  children: ReactNode;
}

export const StickToBottom: FC<StickToBottomProps> = ({
  children,
  resize,
  initial,
  mass,
  damping,
  stiffness,
  targetScrollTop,
  ...props
}) => {
  const { scrollRef, contentRef, scrollToBottom, isAtBottom, isNearBottom, escapedFromLock } = useStickToBottom({
    mass,
    damping,
    stiffness,
    resize,
    initial,
    targetScrollTop,
  });

  useLayoutEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    if (getComputedStyle(scrollRef.current).overflow === 'visible') {
      scrollRef.current.style.overflow = 'auto';
    }
  }, []);

  console.log('render');

  return (
    <StickToBottomContext.Provider
      value={{ scrollRef, contentRef, scrollToBottom, isAtBottom, isNearBottom, escapedFromLock }}
    >
      <div {...props}>
        <Content scrollRef={scrollRef} contentRef={contentRef}>
          {children}
        </Content>
      </div>
    </StickToBottomContext.Provider>
  );
};
