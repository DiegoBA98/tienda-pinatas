import { BreadcrumbItem } from "@/types";
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function PreguntasFrecuentes() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Preguntas Frecuentes',
            href: '/preguntas-frecuentes',
        },
    ];

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <Head title="Preguntas Frecuentes" />
            <motion.div
                className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 mt-4 mb-6 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <motion.h2
                    className="text-3xl font-semibold text-center text-[#f58f9a]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" }}
                >
                    Preguntas Frecuentes
                </motion.h2>

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                >
                    <motion.div
                        className="border-b-2 border-gray-200 pb-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3, ease: "easeInOut" }}
                    >
                        <h3 className="text-xl font-semibold text-[#3c363b]">¿Cuál es el tiempo de anticipación mínimo?</h3>
                        <p className="mt-2 text-gray-600">
                            El tiempo mínimo de anticipación para piñatas personalizadas es de 5 días hábiles, dependiendo de la disponibilidad en nuestra agenda.{' '}
                            <a
                                href={`https://api.whatsapp.com/send/?phone=${import.meta.env.VITE_TELEFONO_WHAT}&text=Hola+me+interesa+saber+sobre+la+agenda&type=phone_number&app_absent=0`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" text-black rounded font-bold underline hover:cursor-pointer"
                            >
                                Consulta la disponibilidad aquí
                            </a>
                        </p>
                    </motion.div>

                    <motion.div
                        className="border-b-2 border-gray-200 pb-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4, ease: "easeInOut" }}
                    >
                        <h3 className="text-xl font-semibold text-[#3c363b]">¿Puedo personalizar colores o detalles para mi piñata?</h3>
                        <p className="mt-2 text-gray-600">
                            ¡Claro! Puedes personalizar los colores de tu piñata sin costo adicional. Si prefieres colores pasteles o cualquier otra combinación, podemos hacerlo.
                        </p>
                    </motion.div>

                    <motion.div
                        className="border-b-2 border-gray-200 pb-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6, ease: "easeInOut" }}
                    >
                        <h3 className="text-xl font-semibold text-[#3c363b]">¿Hacen envíos?</h3>
                        <p className="mt-2 text-gray-600">
                            Sí, realizamos entregas dentro de la ZMG o El Salto, Jalisco, con un costo adicional de 50 pesos.
                        </p>
                    </motion.div>

                    <motion.div
                        className="border-b-2 border-gray-200 pb-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8, ease: "easeInOut" }}
                    >
                        <h3 className="text-xl font-semibold text-[#3c363b]">¿La temática o idea de piñata que busco no está en la tienda, qué hago?</h3>
                        <p className="mt-2 text-gray-600">
                            Si no encuentras la piñata que buscas, contáctanos por WhatsApp para recibir información personalizada.{' '}
                            <a
                                href={`https://api.whatsapp.com/send/?phone=${import.meta.env.VITE_TELEFONO_WHAT}&text=Hola+quiero+una+piñata+personalizada&type=phone_number&app_absent=0`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" text-black rounded font-bold underline hover:cursor-pointer"
                            >
                                Envíanos un mensaje aquí
                            </a>
                        </p>
                    </motion.div>

                    <motion.div
                        className="border-b-2 border-gray-200 pb-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1, ease: "easeInOut" }}
                    >
                        <h3 className="text-xl font-semibold text-[#3c363b]">¿Tienen local o algún lugar para poder comprar presencialmente?</h3>
                        <p className="mt-2 text-gray-600">
                            Sí, contamos con un taller en Parques del Castillo, en El Salto, Jalisco, donde puedes recoger tus compras previa coordinación.
                        </p>
                    </motion.div>

                </motion.div>
            </motion.div>
        </AppLayoutTemplate>
    );
}
