import { BandsContext } from "@/contexts/bands.context";
import { useContext } from "react"

export const useBands = () => {
    const context = useContext(BandsContext);
    if(!context) {
        throw new Error('useBands must be used within an BandsProvider');
    }
    return context;
}