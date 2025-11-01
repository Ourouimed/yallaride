"use client";
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { usePopup } from "@/context/PopupContext";

export function Popup() {
  const { isOpen, title , content, closePopup} = usePopup();

    if (!isOpen) return null;


  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed w-full h-screen flex justify-center items-center top-0 inset-0 z-50 bg-black/50"
      onClick={closePopup} 
    >
      {/* Popup */}
      <div
        className="bg-background border shadow-lg rounded-lg w-4/5 sm:max-w-lg"
        onClick={handleContentClick}
      >
        {/* Popup Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button size="sm" variant="ghost" onClick={closePopup}>
            <X />
          </Button>
        </div>

        {/* Popup Content */}
        <div className="p-4">{content}</div>
      </div>
    </div>
  );
}
