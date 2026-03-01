import React, { createContext, useContext, useState, ReactNode } from "react";

type LegalPageType = "impressum" | "datenschutz" | "agb";

interface LegalModalContextType {
  openModal: (page: LegalPageType) => void;
  closeModal: () => void;
  currentModal: LegalPageType | null;
}

const LegalModalContext = createContext<LegalModalContextType | null>(null);

export function LegalModalProvider({ children }: { children: ReactNode }) {
  const [currentModal, setCurrentModal] = useState<LegalPageType | null>(null);

  const openModal = (page: LegalPageType) => {
    setCurrentModal(page);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  return (
    <LegalModalContext.Provider value={{ openModal, closeModal, currentModal }}>
      {children}
    </LegalModalContext.Provider>
  );
}

export function useLegalModal() {
  const ctx = useContext(LegalModalContext);
  if (!ctx) {
    throw new Error("useLegalModal must be used within LegalModalProvider");
  }
  return ctx;
}
