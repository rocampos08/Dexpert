// components/EasyReadButton.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

export default function EasyReadButton() {
  const [isReading, setIsReading] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null); // Reference to the current utterance
  const isCanceledIntentionally = useRef(false); // Flag to know if cancellation was intentional

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      setSpeechSynthesis(synth);

      // (Optional, for voice debugging, not the cause of this error)
      // const checkVoices = () => {
      //   const voices = synth.getVoices();
      //   if (voices.length > 0) {
      //     console.log("Available Voices:", voices.map(v => ({ name: v.name, lang: v.lang, default: v.default })));
      //   } else {
      //     setTimeout(checkVoices, 100);
      //   }
      // };
      // checkVoices();
      // synth.onvoiceschanged = () => {
      //   console.log("Voices changed. New Available Voices:", synth.getVoices().map(v => ({ name: v.name, lang: v.lang, default: v.default })));
      // };

    } else {
      console.warn("Speech Synthesis API not supported in this browser.");
      toast.error("The read-aloud feature is not supported by your browser.");
    }

    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, [speechSynthesis]);

  const handleReadContent = () => {
    if (!speechSynthesis) {
      toast.error("The speech synthesizer is not available.");
      return;
    }

    if (isReading) {
      // Logic to stop reading
      isCanceledIntentionally.current = true; // Mark cancellation as intentional
      speechSynthesis.cancel(); // This triggers onend and (sometimes) onerror
      setIsReading(false);
      toast.info("Reading stopped.");
      if (utteranceRef.current) {
        // Clear the utterance from the ref to prevent potential leaks
        utteranceRef.current.onend = null;
        utteranceRef.current.onerror = null;
        utteranceRef.current = null;
      }
    } else {
      // Logic to start reading
      const contentToRead = document.body.innerText; // Capture all visible text

      if (!contentToRead) {
        toast.info("No content to read on this page.");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(contentToRead);
      utteranceRef.current = utterance; // Save reference to the utterance
      isCanceledIntentionally.current = false; // Reset the flag

      utterance.lang = 'en-US'; // Or 'es-ES' if your content is primarily Spanish
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsReading(false);
        if (!isCanceledIntentionally.current) { // Only if it was not an intentional cancellation
          toast.success("Reading completed.");
        }
        utteranceRef.current = null; // Clear the reference
      };

      utterance.onerror = (event) => {
        setIsReading(false);
        if (!isCanceledIntentionally.current) { // Only show the error if it was not an intentional cancellation
          console.error('SpeechSynthesisUtterance.onerror', event);
          toast.error("Error during reading.");
        } else {
          // If it was an intentional cancellation, you can log it internally
          // console.log('Utterance intentionally canceled:', event);
        }
        utteranceRef.current = null; // Clear the reference
      };

      speechSynthesis.speak(utterance);
      setIsReading(true);
      toast.info("Starting reading...");
    }
  };

  const isDisabled = !speechSynthesis;

  return (
    <Button
      onClick={handleReadContent}
      disabled={isDisabled}
      className="bg-[#0A2342] hover:bg-[#1A3F6D] text-white flex items-center gap-2"
    >
      {isReading ? (
        <>
          <VolumeX className="w-5 h-5" /> Stop Reading
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5" /> Easy Read
        </>
      )}
    </Button>
  );
}