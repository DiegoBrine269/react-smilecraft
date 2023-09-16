import { useContext } from "react";
import SmilecraftContext from "../context/SmilecraftProvider";

const useSmilecraft = () => {
    return useContext(SmilecraftContext)
}

export default useSmilecraft