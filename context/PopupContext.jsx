"use client";
import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);

  const openPopup = (title , popupContent) => {
    setTitle(title);
    setContent(popupContent);
    setIsOpen(true);
  };

  const closePopup = () => {
    setContent(null);
    setIsOpen(false);
  };

  return (
    <PopupContext.Provider value={{ isOpen, content, title , openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
