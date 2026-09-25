"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { faqData, FAQStructure } from "@/src/data/faqData";
import { useLanguage } from "@/context/LanguageContext";

type CategoryKey = keyof FAQStructure;

export type ChatMessage =
  | { id: string; role: "bot"; type: "greeting" }
  | { id: string; role: "bot"; type: "faqAnswer"; categoryId: string; itemId: string }
  | { id: string; role: "user"; type: "faqQuestion"; categoryId: string; itemId: string }
  | { id: string; role: "user"; type: "categorySelect"; categoryId: string }
  | { id: string; role: "bot"; type: "categoryPrompt"; categoryId: string }
  | { id: string; role: "user"; type: "backToMenu" }
  | { id: string; role: "bot"; type: "menuPrompt" };

interface ChatbotWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper to dynamically look up translated message text based on active locale & faqData
function getMessageText(
  msg: ChatMessage,
  locale: "id" | "en",
  currentFaqData: FAQStructure
): string {
  switch (msg.type) {
    case "greeting":
      return locale === "en"
        ? "Hi! 👋 Welcome to SIBERMU ASSISTANT.\nHow can I help you with information about Universitas Siber Muhammadiyah?"
        : "Halo! 👋 Selamat datang di SIBERMU ASSISTANT.\nAda yang bisa saya bantu seputar informasi Universitas Siber Muhammadiyah?";

    case "categorySelect": {
      const cat = currentFaqData[msg.categoryId];
      return cat ? cat.topic : msg.categoryId;
    }

    case "categoryPrompt": {
      const cat = currentFaqData[msg.categoryId];
      const topic = cat ? cat.topic : msg.categoryId;
      return locale === "en"
        ? `Here are popular questions regarding ${topic}:`
        : `Berikut pertanyaan populer seputar ${topic}:`;
    }

    case "faqQuestion": {
      const cat = currentFaqData[msg.categoryId];
      const item = cat?.items.find((i) => i.id === msg.itemId);
      return item ? item.question : msg.itemId;
    }

    case "faqAnswer": {
      const cat = currentFaqData[msg.categoryId];
      const item = cat?.items.find((i) => i.id === msg.itemId);
      return item ? item.answer : msg.itemId;
    }

    case "backToMenu":
      return locale === "en" ? "← Back to Main Menu" : "← Kembali ke Menu Utama";

    case "menuPrompt":
      return locale === "en"
        ? "Please select another topic:"
        : "Silakan pilih topik informasi lainnya:";

    default:
      return "";
  }
}

export default function ChatbotWidget({ isOpen, onClose }: ChatbotWidgetProps) {
  const { locale } = useLanguage();
  const currentFaqData: FAQStructure = faqData[locale] || faqData.id;

  // Store structured messages referencing IDs so text is dynamically looked up on render
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "initial-greeting",
      role: "bot",
      type: "greeting",
    },
  ]);
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastBotMessageRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  // Auto-dismiss confirmation after 5 seconds or on click outside
  useEffect(() => {
    if (!isConfirmingReset) return;

    const timer = setTimeout(() => {
      setIsConfirmingReset(false);
    }, 5000);

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        confirmRef.current &&
        !confirmRef.current.contains(event.target as Node)
      ) {
        setIsConfirmingReset(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isConfirmingReset]);

  // Reset confirmation state when popup closes
  useEffect(() => {
    if (!isOpen) {
      setIsConfirmingReset(false);
    }
  }, [isOpen]);

  // Auto-scroll precisely to top of latest bot message bubble after full DOM paint & reflow
  useIsomorphicLayoutEffect(() => {
    if (!isOpen) return;

    let timerId: NodeJS.Timeout;
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        timerId = setTimeout(() => {
          if (chatContainerRef.current && lastBotMessageRef.current) {
            const container = chatContainerRef.current;
            const target = lastBotMessageRef.current;

            const containerRect = container.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const relativeTop = targetRect.top - containerRect.top;

            container.scrollTo({
              top: Math.max(0, container.scrollTop + relativeTop - 12),
              behavior: "smooth",
            });
          }
        }, 60);
      });
      return () => cancelAnimationFrame(raf2);
    });

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(timerId);
    };
  }, [messages, activeCategory, isOpen]);

  // Handle category selection
  const handleSelectCategory = (catKey: CategoryKey) => {
    const cat = currentFaqData[catKey];
    if (!cat) return;

    const userMsg: ChatMessage = {
      id: `user-cat-${Date.now()}`,
      role: "user",
      type: "categorySelect",
      categoryId: catKey as string,
    };

    const botMsg: ChatMessage = {
      id: `bot-cat-${Date.now()}`,
      role: "bot",
      type: "categoryPrompt",
      categoryId: catKey as string,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setActiveCategory(catKey);
  };

  // Handle question item selection
  const handleSelectQuestion = (itemId: string) => {
    if (!activeCategory) return;

    const userMsg: ChatMessage = {
      id: `user-q-${Date.now()}`,
      role: "user",
      type: "faqQuestion",
      categoryId: activeCategory as string,
      itemId,
    };

    const botMsg: ChatMessage = {
      id: `bot-a-${Date.now()}`,
      role: "bot",
      type: "faqAnswer",
      categoryId: activeCategory as string,
      itemId,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  // Return to main topic menu
  const handleBackToMenu = () => {
    const userMsg: ChatMessage = {
      id: `user-back-${Date.now()}`,
      role: "user",
      type: "backToMenu",
    };

    const botMsg: ChatMessage = {
      id: `bot-menu-${Date.now()}`,
      role: "bot",
      type: "menuPrompt",
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setActiveCategory(null);
  };

  // Reset entire chat
  const handleResetChat = () => {
    setMessages([
      {
        id: `initial-greeting-${Date.now()}`,
        role: "bot",
        type: "greeting",
      },
    ]);
    setActiveCategory(null);
  };

  const handleResetClick = () => {
    setIsConfirmingReset(true);
  };

  const executeReset = () => {
    handleResetChat();
    setIsConfirmingReset(false);
  };

  const cancelReset = () => {
    setIsConfirmingReset(false);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={popupRef}
      className="fixed bottom-20 right-4 sm:right-6 lg:bottom-8 lg:right-8 z-[120] w-[calc(100vw-2rem)] sm:w-[375px] h-[530px] max-h-[82vh] bg-white rounded-none border-[3.5px] border-black shadow-[8px_8px_0px_#000000] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 ease-out"
      aria-label="SIBERMU ASSISTANT FAQ Chatbot Window"
    >
      {/* 1. HEADER (NEOBRUTALISM STYLING & BILINGUAL) */}
      <div className="bg-[#1A2A5B] text-white p-3.5 border-b-[3.5px] border-black flex items-center justify-between shrink-0 rounded-none">
        <div className="flex items-center space-x-3 min-w-0">
          {/* Avatar Icon (Square Neobrutalist) */}
          <div className="relative w-9 h-9 rounded-none bg-[#FF9E44] border-2 border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center text-[#1A2A5B] shrink-0">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.386-1 1.732V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.732A2.001 2.001 0 0 1 12 2zm-4.5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 17h8a1 1 0 1 0 0-2H8a1 1 0 1 0 0 2z" />
            </svg>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-none border border-black" />
          </div>
          {/* Title & Subtitle */}
          <div className="min-w-0">
            <h3 className="font-extrabold text-sm leading-tight text-white uppercase tracking-wide truncate">
              SIBERMU ASSISTANT
            </h3>
            <p className="text-[11px] text-[#FF9E44] font-semibold leading-none mt-0.5 truncate">
              {locale === "en"
                ? "Online • Automated Replies"
                : "Online • Jawaban Otomatis"}
            </p>
          </div>
        </div>

        {/* Header Action Buttons / Inline Confirmation */}
        <div ref={confirmRef} className="flex items-center space-x-1.5 shrink-0 ml-2">
          {!isConfirmingReset ? (
            <>
              {/* Reset Chat Button */}
              <button
                type="button"
                onClick={handleResetClick}
                title={locale === "en" ? "Reset Chat" : "Reset Chat"}
                className="w-7 h-7 rounded-none bg-[#120e36] border border-white/30 hover:border-black hover:bg-[#FF9E44] text-white hover:text-black flex items-center justify-center transition-all duration-150 cursor-pointer shadow-none hover:shadow-[2px_2px_0px_#000000]"
                aria-label="Reset percakapan"
              >
                <svg
                  className="w-3.5 h-3.5 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                title={locale === "en" ? "Close Chat" : "Tutup Chat"}
                className="w-7 h-7 rounded-none bg-[#120e36] border border-white/30 hover:border-black hover:bg-[#FF9E44] text-white hover:text-black flex items-center justify-center transition-all duration-150 cursor-pointer shadow-none hover:shadow-[2px_2px_0px_#000000]"
                aria-label="Tutup window chatbot"
              >
                <svg
                  className="w-4 h-4 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-1.5 animate-in fade-in zoom-in-95 duration-150">
              {/* Ya, Reset Button (Orange Accent) */}
              <button
                type="button"
                onClick={executeReset}
                title={locale === "en" ? "Yes, Reset Chat" : "Ya, Reset Chat"}
                className="h-7 px-2 rounded-none bg-[#FF9E44] border-2 border-black text-black font-extrabold text-xs shadow-[2px_2px_0px_#000000] hover:bg-[#e88d37] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150 flex items-center space-x-1 cursor-pointer"
                aria-label="Konfirmasi reset percakapan"
              >
                <svg
                  className="w-3.5 h-3.5 stroke-current shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="whitespace-nowrap">{locale === "en" ? "Yes, Reset" : "Ya, Reset"}</span>
              </button>
              {/* Batal Button */}
              <button
                type="button"
                onClick={cancelReset}
                title={locale === "en" ? "Cancel" : "Batal"}
                className="h-7 px-2 rounded-none bg-[#120e36] border border-white/40 text-white font-bold text-xs shadow-[2px_2px_0px_#000000] hover:border-black hover:bg-white hover:text-black active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150 flex items-center space-x-1 cursor-pointer"
                aria-label="Batal reset percakapan"
              >
                <svg
                  className="w-3.5 h-3.5 stroke-current shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                <span className="whitespace-nowrap">{locale === "en" ? "Cancel" : "Batal"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. CHAT AREA (NEOBRUTALISM STYLING & FULL DYNAMIC RE-TRANSLATION) */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-100/70 text-slate-900 text-xs sm:text-sm"
      >
        {messages.map((msg, index) => {
          const isLastMessage = index === messages.length - 1;
          const isLastBotMessage = isLastMessage && msg.role === "bot";
          const messageText = getMessageText(msg, locale, currentFaqData);

          return (
            <div
              key={msg.id}
              ref={isLastBotMessage ? lastBotMessageRef : null}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "bot" && (
                <div className="w-7 h-7 rounded-none bg-[#FF9E44] text-black border border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center shrink-0 mr-2 mt-0.5">
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.386-1 1.732V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.732A2.001 2.001 0 0 1 12 2zm-4.5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 17h8a1 1 0 1 0 0-2H8a1 1 0 1 0 0 2z" />
                  </svg>
                </div>
              )}

              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-none border-2 border-black shadow-[3px_3px_0px_#000000] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#1A2A5B] text-white font-medium"
                    : "bg-white text-[#1A2A5B] font-medium"
                }`}
              >
                <p className="whitespace-pre-line text-xs sm:text-[13px]">
                  {messageText}
                </p>
              </div>
            </div>
          );
        })}

        {/* QUICK REPLIES INTERACTIVE OPTIONS */}
        <div className="pt-2 flex flex-col space-y-2.5">
          {/* STATE A: Topic Selection */}
          {activeCategory === null && (
            <div className="flex flex-wrap gap-2 pt-1">
              {(Object.keys(currentFaqData) as CategoryKey[]).map((catKey) => {
                const cat = currentFaqData[catKey];
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => handleSelectCategory(catKey)}
                    className="bg-white hover:bg-[#FF9E44] text-[#1A2A5B] hover:text-black text-xs font-bold px-3.5 py-2 rounded-none border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all duration-150 text-left cursor-pointer"
                  >
                    {cat.topic}
                  </button>
                );
              })}
            </div>
          )}

          {/* STATE B: Questions List under selected Category */}
          {activeCategory !== null && (
            <div className="flex flex-col gap-2.5 pt-1">
              {currentFaqData[activeCategory]?.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectQuestion(item.id)}
                  className="bg-white hover:bg-[#FF9E44] text-[#1A2A5B] hover:text-black text-xs font-bold px-3.5 py-2.5 rounded-none border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all duration-150 text-left cursor-pointer leading-snug"
                >
                  {item.question}
                </button>
              ))}

              {/* Back to main menu option */}
              <button
                type="button"
                onClick={handleBackToMenu}
                className="mt-1 bg-[#FF9E44] hover:bg-[#e88d37] text-black text-xs font-black px-3.5 py-2.5 rounded-none border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all duration-150 text-center cursor-pointer uppercase tracking-wider"
              >
                {locale === "en" ? "← Back to Main Menu" : "← Kembali ke Menu Utama"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. PERSISTENT FOOTER CTA (WhatsApp Fallback - Neobrutalism) */}
      <div className="p-3 bg-amber-50/90 border-t-[3.5px] border-black flex items-center justify-between shrink-0 rounded-none">
        <span className="text-[11px] text-slate-800 font-bold uppercase tracking-tight">
          {locale === "en"
            ? "Need direct help from admin?"
            : "Perlu bantuan langsung admin?"}
        </span>
        <a
          href="https://api.whatsapp.com/send/?phone=%2B6289531851105&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs font-black px-3 py-1.5 rounded-none border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all duration-150 cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.555 4.109 1.525 5.835L0 24l6.335-1.497A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.878 0-3.644-.51-5.168-1.398l-.37-.216-3.834.906.924-3.72-.239-.38C2.39 15.617 1.8 13.864 1.8 12 1.8 6.376 6.376 1.8 12 1.8s10.2 4.576 10.2 10.2S17.624 22 12 22z" />
          </svg>
          <span>Chat WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
