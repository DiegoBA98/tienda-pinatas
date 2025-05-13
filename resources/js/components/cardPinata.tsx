import { Pinata } from "@/interfaces/intex"
import { formatCurrency } from "@/utils"
import { MessageCircle } from "lucide-react"
import ButtonHeart from "./buttonHeart"

type CardPinataProps = {
    pinata: Pinata;
    openModal: (pinata : Pinata) => void;
    toogleLikePinata: (pinata: Pinata) => void
}

export default function CardPinata({ pinata, openModal, toogleLikePinata }: CardPinataProps) {

    return (
        <div
            key={pinata.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform flex flex-col justify-between hover:scale-[101%] transition duration-500"

        >
            <div>
                <div className="w-full h-80 md:h-72 overflow-hidden">
                    <img
                        src={`/storage/${pinata.imagen}`}
                        alt={pinata.nombre}
                        className="w-full h-full object-cover hover:cursor-pointer"
                        onClick={() => openModal(pinata)}
                    />
                </div>
                <div className="px-4 py-2">
                    <h3 className="text-lg font-semibold text-gray-800">{pinata.nombre}</h3>
                    <p className="text-gray-600 text-sm text-left h-16 line-clamp-3">{pinata.descripcion}</p>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center px-4">
                    <span className="text-sm text-gray-500">Precio:</span>
                    <span className="text-lg font-bold text-pink-600">
                        {formatCurrency(+pinata.precio)}
                    </span>
                </div>
                <div className="flex justify-between items-center mt-2 px-4 pb-4">
                    <a
                        href={`https://api.whatsapp.com/send/?phone=${import.meta.env.VITE_TELEFONO_WHAT}&text=Hola+me+interesa+la+pinata+${import.meta.env.VITE_APP_URL}/pinatas/${pinata.id}&type=phone_number&app_absent=0`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Me interesa
                        <MessageCircle className="w-5 h-5" />
                    </a>
                    <ButtonHeart pinata={pinata} toogleLikePinata={toogleLikePinata} />
                </div>
            </div>
        </div>
    )
}
