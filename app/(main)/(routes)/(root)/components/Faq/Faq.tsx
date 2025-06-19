"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react"; 

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Dexpert?",
      answer:
        "Dexpert is a web platform that connects young people without work experience to small businesses that need help with real projects. It offers a simple and inclusive way to gain hands-on experience and build a professional portfolio."
    },
    {
      question: "Who can use Dexpert?",
      answer:
        "Dexpert is designed for young people, including those with disabilities, who want to gain experience and improve their job readiness. Small and medium-sized businesses can also use Dexpert to get affordable support for their projects."
    },
    {
      question: "Do I need experience to join?",
      answer:
        "No experience is required. Dexpert is made for beginners. Our AI assistant helps guide you through each step so you can learn and grow with real feedback."
    },
    {
      question: "How does Dexpert help small businesses?",
      answer:
        "Small businesses can post their project ideas with help from our AI assistant, even if they’re not tech-savvy. They get support from motivated young people and can choose service plans that fit their budget."
    },
    {
      question: "Is Dexpert accessible to people with disabilities?",
      answer:
        "Yes. Dexpert is fully inclusive. Users can describe their ideas by voice, and the platform is built to ensure equal access, respect, and participation for all users."
    },
    {
      question: "What do students get from the experience?",
      answer:
        "Students gain practical experience, mentorship through AI, and a certificate that proves their contribution to real-world projects. This helps them build a portfolio and confidence for future jobs."
    },
    {
      question: "How much does it cost for businesses?",
      answer:
        "We offer three affordable plans: $4.99 for posting a project, $14.99 for guided setup and recommendations, and $24.99 for full support and project management."
    },
    {
      question: "Where is Dexpert available?",
      answer:
        "Dexpert is currently focused on El Salvador but aims to expand across Latin America to unlock talent and opportunity everywhere."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 text-[#0a2243]">
      <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border rounded-lg p-4 transition-shadow cursor-pointer flex flex-col gap-2 ${
                isOpen ? "border-[#2196f3] shadow-lg" : "hover:shadow-md"
              }`}
              onClick={() =>
                setOpenIndex(isOpen ? null : index)
              }
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#2196f3]" : "text-gray-400"
                  }`}
                />
              </div>
              {isOpen && (
                <p className="mt-2 text-[#0a2243]">{faq.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
