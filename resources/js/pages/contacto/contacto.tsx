import { BreadcrumbItem } from "@/types";
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { MessageCircle } from "lucide-react";
import MapHouse from "@/components/mapHouse";

export default function Contacto() {
    const [result, setResult] = useState("");
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Contacto',
            href: '/contacto',
        },
    ];

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("Enviando....");

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        formData.append("access_key", import.meta.env.VITE_EMAIL_API_KEY!);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            form.reset();
        } else {
            setResult(data.message);
        }
    };

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <Head title="Contacto" />
            <motion.div
                className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 mt-6 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <motion.div
                    className="flex justify-center gap-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                >
                    <motion.img
                        src="/img/contacto.webp"
                        alt="Imagen de contacto"
                        className="w-60 md:w-2/3 object-cover rounded-md shadow-sm"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                </motion.div>

                <motion.div
                    className="text-lg leading-7 text-center text-[#3c363b]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                >
                    <p className="mb-2">
                        ¿Tienes alguna pregunta o necesitas más información sobre nuestros productos? ¡Estamos aquí para ayudarte!
                    </p>
                    <div className="flex justify-center">
                        <a
                            href={`https://api.whatsapp.com/send/?phone=${import.meta.env.VITE_TELEFONO_WHAT}&text=Hola+tengo+dudas&type=phone_number&app_absent=0`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors hover:cursor-pointer mb-2"
                        >
                            Mandanos un whatsapp
                            <MessageCircle className="w-5 h-5" />
                        </a>
                    </div>
                    <p className="">
                       O puedes contactarnos a través del siguiente formulario.
                    </p>
                </motion.div>

                {/* form */}
                <motion.form
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                    onSubmit={onSubmit}
                    method="POST"
                >
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Tu nombre"
                        className="p-4 border rounded-md shadow-sm bg-white"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Tu correo electrónico"
                        className="p-4 border rounded-md shadow-sm bg-white"
                        required
                    />
                    <textarea
                        placeholder="Tu mensaje"
                        name="message"
                        id="message"
                        className="p-4 border rounded-md shadow-sm bg-white"
                        rows={5}
                        required
                    />
                    <button
                        type="submit"
                        className={`px-6 py-3 bg-[#f58f9a] text-white rounded-md shadow-lg hover:cursor-pointer ${result
                            ? " cursor-not-allowed opacity-50"
                            : "hover:bg-black dark:hover:bg-dark-hover"
                            }`}
                    >
                        Enviar mensaje
                    </button>
                </motion.form>
                {result && (
                    <motion.p
                        className="text-center mt-4 text-sm text-black dark:text-white font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {result}
                    </motion.p>
                )}

                {/* <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: "easeInOut" }}
                >
                    <p>También puedes encontrarnos en nuestras redes sociales:</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <a href="https://facebook.com" className="text-[#f58f9a]">Facebook</a>
                        <a href="https://instagram.com" className="text-[#f58f9a]">Instagram</a>
                    </div>
                </motion.div> */}

                {/* mapa */}
            </motion.div>
            <MapHouse />

        </AppLayoutTemplate>
    );
}
