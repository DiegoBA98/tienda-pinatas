import { BreadcrumbItem } from "@/types";
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Nosotros() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Nosotros',
            href: '/nosotros',
        },
    ];

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <Head title="Nosotros" />
            <motion.div
                className="flex h-full flex-1 flex-col gap-4 rounded-xl p-6 my-6 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <motion.div
                    className="flex justify-center gap-2 md:gap-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                >
                    <motion.img
                        src="/img/nosotros2.jpg"
                        alt="Piñatas brillantes"
                        className="w-48 md:w-52 object-cover rounded-md shadow-sm"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                    <motion.img
                        src="/img/nosotros1.jpg"
                        alt="Nuestra pareja emprendedora"
                        className="w-48 md:w-52 object-cover rounded-md shadow-sm"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.3 }}
                    />
                </motion.div>

                <motion.h2
                    className="text-3xl font-semibold text-center text-[#f58f9a]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                >
                    Nosotros
                </motion.h2>

                <motion.div
                    className="text-lg leading-7 text-center text-[#3c363b]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                >
                    <p className="mb-4">
                        ¡Bienvenidos a Piñatas Brillantes! Somos una pareja emprendedora que decidió comenzar este emocionante viaje en el mundo de las piñatas el 2025. Con mucho amor y dedicación, nos enfocamos en crear piñatas únicas, brillantes y llenas de magia para todas las ocasiones especiales.
                    </p>
                    <p className="mb-4">
                        Nuestro objetivo es que cada piñata que vendemos no solo sea un accesorio para las fiestas, sino también una pieza artística que ilumine y haga brillar el día de quienes la reciban. Queremos llevar la alegría y la diversión a todos los rincones de México y más allá, con productos de alta calidad y con un toque personalizado para cada cliente.
                    </p>
                    <p className="mb-4">
                        Como emprendedores, nos apasiona el proceso creativo de las piñatas y nos encanta ver cómo nuestros diseños llenan de sonrisas a grandes y chicos. Si estás buscando algo especial para tu próxima fiesta o celebración, ¡estamos aquí para hacerlo realidad!
                    </p>
                    <p>
                        Gracias por ser parte de esta aventura. ¡Esperamos que nuestras piñatas brillantes agreguen magia a tus momentos más especiales!
                    </p>
                </motion.div>
            </motion.div>
        </AppLayoutTemplate>
    );
}
