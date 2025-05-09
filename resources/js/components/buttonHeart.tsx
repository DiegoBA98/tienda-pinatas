import { Pinata } from "@/interfaces/intex";
import { motion } from 'framer-motion';
import { Heart } from "lucide-react";

type ButtonHeartProps = {
    toogleLikePinata : (pinata: Pinata) => void;
    pinata : Pinata;
}

export default function ButtonHeart({toogleLikePinata, pinata} : ButtonHeartProps) {
    return (
        <button
            className="flex items-center gap-2 px-4 py-2 text-black rounded hover:cursor-pointer hover:scale-110 transition"
            onClick={() => {
                toogleLikePinata(pinata);
            }}
        >
            <motion.div
                initial={{ scale: 1 }}
                animate={{
                    scale: pinata.is_favorite ? 1.3 : 1,
                    transition: { duration: 0.3, ease: "easeInOut" },
                }}
            >
                {pinata.is_favorite ? (
                    <Heart
                        className={`size-8 fill-red-500`}
                    />
                ) : (
                    <Heart
                        className={`size-8 text-gray-300 hover:text-black`}
                    />
                )}

            </motion.div>
        </button>
    )
}
