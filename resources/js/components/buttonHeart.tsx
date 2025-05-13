import { useState } from "react"; // Importa useState
import { Pinata } from "@/interfaces/intex";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { SharedData } from "@/types";

type ButtonHeartProps = {
    toogleLikePinata: (pinata: Pinata) => void;
    pinata: Pinata;
};

export default function ButtonHeart({ toogleLikePinata, pinata }: ButtonHeartProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const [isLiked, setIsLiked] = useState(pinata.is_favorite);

    const handleClick = () => {
        console.log(auth.user)
        if(auth.user) setIsLiked(!isLiked);
        toogleLikePinata(pinata);
    };

    return (
        <button
            className="flex items-center gap-2 px-4 py-2 text-black rounded hover:cursor-pointer hover:scale-110 transition"
            onClick={handleClick}
        >
            <motion.div
                initial={{ scale: 1 }}
                animate={{
                    scale: isLiked ? 1.2 : 1,
                    transition: { duration: 0.3, ease: "easeInOut" },
                }}
            >
                {isLiked ? (
                    <Heart className={`size-10 fill-red-500`} />
                ) : (
                    <Heart className={`size-10 text-gray-300 hover:text-black`} />
                )}
            </motion.div>
        </button>
    );
}
