'use client';

import { BandsProvider } from "@/contexts/bands.context";

interface BandsProviderProps {
    children: React.ReactNode;
}

export default function ProviderBands({ children }: BandsProviderProps) {
    return (
        <BandsProvider>
            {children}
        </BandsProvider>
    )
}