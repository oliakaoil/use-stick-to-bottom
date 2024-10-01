import { createContext, useContext } from 'react';
import { ScrollToBottom } from './useStickToBottom.js';

export interface StickToBottomSettings {
  scrollToBottom: ScrollToBottom;
  isAtBottom: boolean;
}

export const StickToBottomContext = createContext<StickToBottomSettings>({
  scrollToBottom: () => false,
  isAtBottom: false,
});

export const useScrollControl = () => useContext<StickToBottomSettings>(StickToBottomContext);
