import React, { createContext, useRef, ReactNode } from 'react';

interface TestPanelContextType {
  testPanelRef: React.RefObject<any>;
}

export const TestPanelContext = createContext<TestPanelContextType | undefined>(undefined);

export function TestPanelProvider({ children }: { children: ReactNode }) {
  const testPanelRef = useRef<any>(null);

  return (
    <TestPanelContext.Provider value={{ testPanelRef }}>
      {children}
    </TestPanelContext.Provider>
  );
}

export function useTestPanel() {
  const context = React.useContext(TestPanelContext);
  if (!context) {
    throw new Error('useTestPanel must be used within TestPanelProvider');
  }
  return context;
}
