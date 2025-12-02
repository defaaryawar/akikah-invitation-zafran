import { useState } from "react";
import { BrandingScreen } from "./BrandingScreen";
import InvitationScreen from "./InvitationScreen";
import type { CoverScreenProps } from "../types";
import { AnimatePresence } from "framer-motion";

export default function CoverScreen({ isCoverOpen, openInvitation }: CoverScreenProps) {
  const [showBranding, setShowBranding] = useState(true);

  const handleBrandingComplete = () => {
    setShowBranding(false);
  };

  return (
    <div className="relative">
      {/* Invitation Screen - SELALU RENDER dari awal di belakang (z-10) */}
      <InvitationScreen isOpen={isCoverOpen} onOpen={openInvitation} />
      
      {/* Branding Screen - Di depan (z-50), hilang setelah animasi selesai */}
      <AnimatePresence>
        {showBranding && <BrandingScreen onComplete={handleBrandingComplete} />}
      </AnimatePresence>
    </div>
  );
}
