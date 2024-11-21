import { Band } from "@/types/types";
import { createContext, useMemo, useState } from "react"

interface IBandsContext {
    bands: Band[];
    setBands: React.Dispatch<React.SetStateAction<Band[]>>;
}

export const BandsContext = createContext<IBandsContext | undefined>(undefined);

export const BandsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bands, setBands] = useState<Band[]>([]);

    const value = useMemo(() => ({ bands, setBands }), [bands]);

    return (
        <BandsContext.Provider value={value}>
            {children}
        </BandsContext.Provider>
    );
}