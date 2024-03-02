import { useContext } from "react";
import { SampleContext } from "../../context/Services/Sample";

export const useSample = () => {
        const context = useContext(SampleContext);
        if (!context) {
            throw new Error("useMenu should be used inside MenuContext provider");
        }
        return context;
}
