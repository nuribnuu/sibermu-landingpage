"use client";

import React, { useState, useEffect, useRef } from "react";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  // Close FAB menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Close FAB menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Listen for close-chatbot-popup event (e.g. when tapping "Lainnya" bottom nav on mobile)
  useEffect(() => {
    const handleCloseChatbotPopup = () => {
      setIsChatbotOpen(false);
      setIsOpen(false);
    };
    window.addEventListener("close-chatbot-popup", handleCloseChatbotPopup);
    return () => {
      window.removeEventListener("close-chatbot-popup", handleCloseChatbotPopup);
    };
  }, []);

  // Open / Toggle Chatbot popup and collapse FAB menu
  const handleOpenChatbot = () => {
    if (isChatbotOpen) {
      setIsChatbotOpen(false);
    } else {
      setIsChatbotOpen(true);
      setIsOpen(false);
    }
  };

  // Toggle Chatbot or FAB state on main button click
  const handleMainToggle = () => {
    if (isChatbotOpen) {
      setIsChatbotOpen(false);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <>
      {/* FAQ CHATBOT POPUP WIDGET */}
      <ChatbotWidget
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />

      {/* FLOATING ACTION BUTTON (FAB) CONTAINER */}
      <div
        ref={fabRef}
        className={`fixed bottom-24 right-5 sm:right-6 lg:bottom-8 lg:right-8 z-[110] flex flex-col items-end pointer-events-auto select-none ${
          isChatbotOpen ? "hidden lg:flex" : "flex"
        }`}
        aria-label="Floating Contact Menu"
      >
        {/* Sub-buttons Container (Vertical stack with staggered entrance animation) */}
        <div
          className={`flex flex-col items-end gap-3 mb-3 transition-all duration-300 ease-out ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {/* 1. Chatbot Button (Top position in stack) */}
          <div
            className={`flex items-center gap-2.5 transition-all duration-300 ease-out ${
              isOpen
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-3 scale-90"
            }`}
            style={{ transitionDelay: isOpen ? "160ms" : "0ms" }}
          >
            {/* Label Badge */}
            <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-none border-2 border-black shadow-[2px_2px_0px_#000000] whitespace-nowrap uppercase tracking-wider">
              SIBERMU ASSISTANT
            </span>

            {/* Action Button */}
            <button
              type="button"
              onClick={handleOpenChatbot}
              aria-label="Tanya SIBERMU FAQ Chatbot"
              className="w-12 h-12 sm:w-13 sm:h-13 bg-[#1A2A5B] hover:bg-[#121e42] text-white rounded-full flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all duration-150 cursor-pointer"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.386-1 1.732V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.732A2.001 2.001 0 0 1 12 2zm-4.5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 17h8a1 1 0 1 0 0-2H8a1 1 0 1 0 0 2z" />
              </svg>
            </button>
          </div>

          {/* 2. WhatsApp Button (Middle position in stack) */}
          <div
            className={`flex items-center gap-2.5 transition-all duration-300 ease-out ${
              isOpen
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-3 scale-90"
            }`}
            style={{ transitionDelay: isOpen ? "80ms" : "80ms" }}
          >
            {/* Label Badge */}
            <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-none border-2 border-black shadow-[2px_2px_0px_#000000] whitespace-nowrap uppercase tracking-wider">
              WhatsApp
            </span>

            {/* Action Button */}
            <a
              href="https://api.whatsapp.com/send/?phone=%2B6289531851105&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat via WhatsApp"
              className="w-12 h-12 sm:w-13 sm:h-13 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all duration-150 cursor-pointer"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.555 4.109 1.525 5.835L0 24l6.335-1.497A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.878 0-3.644-.51-5.168-1.398l-.37-.216-3.834.906.924-3.72-.239-.38C2.39 15.617 1.8 13.864 1.8 12 1.8 6.376 6.376 1.8 12 1.8s10.2 4.576 10.2 10.2S17.624 22 12 22z" />
              </svg>
            </a>
          </div>

          {/* 3. Telegram Button (Bottom sub-button position in stack) */}
          <div
            className={`flex items-center gap-2.5 transition-all duration-300 ease-out ${
              isOpen
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-3 scale-90"
            }`}
            style={{ transitionDelay: isOpen ? "0ms" : "160ms" }}
          >
            {/* Label Badge */}
            <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-none border-2 border-black shadow-[2px_2px_0px_#000000] whitespace-nowrap uppercase tracking-wider">
              Telegram
            </span>

            {/* Action Button */}
            <a
              href="https://t.me/+6281919071707"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat via Telegram"
              className="w-12 h-12 sm:w-13 sm:h-13 bg-[#229ED9] hover:bg-[#1f8ebc] text-white rounded-full flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all duration-150 cursor-pointer"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Main Toggle Button */}
        <button
          type="button"
          onClick={handleMainToggle}
          aria-expanded={isOpen || isChatbotOpen}
          aria-label={
            isOpen || isChatbotOpen ? "Tutup Menu Kontak" : "Buka Menu Kontak"
          }
          className={`w-14 h-14 sm:w-15 sm:h-15 rounded-full flex items-center justify-center bg-[#FF9E44] text-[#1A2A5B] border-[3.5px] border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:bg-[#f59238] transition-all duration-300 transform active:scale-95 cursor-pointer ${
            isOpen || isChatbotOpen ? "rotate-90" : "hover:-translate-y-0.5"
          }`}
        >
          {isOpen || isChatbotOpen ? (
            /* X (Close) Icon */
            <svg
              className="w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            /* Chat Bubble Icon */
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
