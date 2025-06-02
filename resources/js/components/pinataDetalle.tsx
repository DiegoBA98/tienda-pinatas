import { Pinata } from "@/interfaces/intex"
import { formatCurrency } from "@/utils"
import { MessageCircle } from "lucide-react"
import { Link } from "@inertiajs/react"

type PinataDetalleProps = {
    pinata: Pinata;
}

export default function PinataDetalle({ pinata }: PinataDetalleProps) {
    return (
        <div className="max-w-5xl mx-auto my-10 px-4">
            {/* Botón Volver afuera del card */}
            <div className="mb-4">
                <Link
                    href="/pinatas?page=1"
                    className="inline-block text-pink-600 font-semibold hover:underline"
                >
                    ← Ver todas las piñatas
                </Link>
            </div>

            {/* Card grande */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex">
                <div className="md:w-1/2 h-[600px]">
                    <img
                        src={`/storage/${pinata.imagen}`}
                        alt={pinata.nombre}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-8 flex flex-col justify-between md:w-1/2">
                    <div>
                        <h2 className="uppercase tracking-wide text-xl text-pink-600 font-bold">{pinata.nombre}</h2>
                        <p className="mt-2 text-gray-500 text-justify">{pinata.descripcion}</p>
                    </div>
                    <div className="mt-6">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-lg">Precio:</span>
                            <span className="text-2xl font-bold text-pink-600">
                                {formatCurrency(+pinata.precio)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <a
                                href={`https://api.whatsapp.com/send/?phone=${import.meta.env.VITE_TELEFONO_WHAT}&text=Hola+me+interesa+la+pinata+${import.meta.env.VITE_APP_URL}/pinatas/${pinata.id}&type=phone_number&app_absent=0`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            >
                                Me interesa
                                <MessageCircle className="w-5 h-5" />
                            </a>
                            {/* <ButtonHeart pinata={pinata} toogleLikePinata={toogleLikePinata} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
