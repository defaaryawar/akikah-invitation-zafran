export interface CoverScreenProps {
    isCoverOpen: boolean;
    openInvitation: () => void;
}

export interface BrandingScreenProps {
    onComplete: () => void;
}

export interface InvitationScreenProps {
    isOpen: boolean;
    onOpen: () => void;
}

export interface ParentCardProps {
    name: string;
    role: string;
    image: string;
    alt: string;
    delay: number;
}

export interface InfoItemProps {
    label: string;
    value: string;
    delay: number;
}