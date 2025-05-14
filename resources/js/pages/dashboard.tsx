import { BreadcrumbItem, SharedData } from "@/types";
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { Head, Link, router, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pinata } from "@/interfaces/intex";
import { formatCurrency } from "@/utils";
import { MessageCircle } from "lucide-react";
import ModalContainer from "@/components/ui/modalContainer";
import { useState } from "react";
import 'leaflet/dist/leaflet.css';
import MapHouse from "@/components/mapHouse";
import ButtonHeart from "@/components/buttonHeart";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import CardPinata from "@/components/cardPinata";

type HomePageProps = {
    pinatasInmediatas: Pinata[];
    pinatasNoInmediatas: Pinata[];
}

export default function HomePage({ pinatasInmediatas, pinatasNoInmediatas }: HomePageProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Inicio',
            href: '/',
        },
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [nameModal, setNameModal] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPinata, setSelectedPinata] = useState<null | Pinata>(null);
    const openModal = (pinata: Pinata) => {
        setSelectedPinata(pinata);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setSelectedPinata(null);
    };

    const toogleLikePinata = (pinata: Pinata) => {
        if (auth.user) {
            if (pinata.is_favorite) {
                router.delete(`/pinatas/favorites/${pinata.id}`, {
                    preserveScroll: true,
                    // onSuccess: () => {
                    //     pinata.is_favorite = false;
                    // },
                });
            } else {
                router.post('/pinatas/favorites', { pinata_id: pinata.id }, {
                    preserveScroll: true,
                    // onSuccess: () => {
                    //     pinata.is_favorite = true;
                    // },
                });
            }
        } else {
            setIsModalVisible(true);
            setNameModal('NoLogin');
            closeModal();
        }
    };

    return (
        <>
            <AppLayoutTemplate breadcrumbs={breadcrumbs}>
                <Head title="Inicio - Piñatas Brillantes" />
                {/* Sección de bienvenida */}
                <motion.section
                    className="flex flex-col text-center items-center pt-6 px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}

                >
                    <motion.div
                        className="relative z-10 px-6 flex justify-start pb-6 items-center"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <motion.img
                            src="/img/papel-picado.png"
                            alt="Imagen de confetti"
                            className="size-12 hidden md:block"
                            animate={{
                                x: ["-50%", "50%", "-50%"],
                                rotate: [0, 180, 360]
                            }}
                            transition={{
                                duration: 5,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "loop"
                            }}
                        />
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                            ¡Haz que tu fiesta brille con nuestras piñatas únicas!
                        </h1>
                        <motion.img
                            src="/img/papel-picado.png"
                            alt="Imagen de confetti"
                            className="size-12 hidden md:block"
                            animate={{
                                x: ["50%", "-50%", "50%"],
                                rotate: [0, -180, -360]
                            }}
                            transition={{
                                duration: 5,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "loop"
                            }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="w-52">
                        <img src="/logo.png" alt="Logo pagina" />
                    </motion.div>
                </motion.section>

                {/* Sección de Piñatas de Entrega Inmediata */}
                <motion.section
                    className="pt-2 px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div className="text-center">
                        <motion.h2
                            className="text-4xl font-bold text-[#f58f9a] mb-4"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Piñatas de Entrega Inmediata
                        </motion.h2>

                        <motion.p
                            className="text-xl text-gray-700"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            ¿Tienes una fiesta de última hora? ¡Aquí tienes algunas opciones listas para entregar hoy mismo!
                        </motion.p>

                        {/* Slider placeholder para Piñatas de Entrega Inmediata */}
                        <motion.div
                            className="mt-8 px-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                        >
                            <Swiper
                                spaceBetween={30}
                                loop={true}
                                autoplay={{
                                    delay: 7000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true
                                }}
                                navigation
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Autoplay, Navigation, Pagination]}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                    },
                                    480: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                    },
                                }}
                                className="mySwiper"
                            >
                                {pinatasInmediatas.map((pinata) => (
                                    <SwiperSlide key={pinata.id}>
                                        <CardPinata pinata={pinata} openModal={openModal} toogleLikePinata={toogleLikePinata} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </motion.div>
                    </div>
                    <motion.div
                        className="flex justify-center mt-5"
                        animate={{ rotate: [0, 1, -1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Link href="/pinatas?entrega_inmediata=1&page=1" className=" hover:cursor-pointer bg-pink-600 text-white font-bold rounded-lg px-7 py-3 hover:bg-black/80 transition">Ver mas piñatas de entrega inmediata</Link>
                    </motion.div>
                </motion.section>

                {/* Sección de Piñatas que no son de Entrega Inmediata */}
                <motion.section
                    className="py-8 px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <div className="text-center">
                        <motion.h2
                            className="text-4xl font-bold text-[#f58f9a] mb-4"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Variedad de piñatas con tiempo de entrega
                        </motion.h2>

                        <motion.p
                            className="text-xl text-gray-700 "
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            En esta seccion encontraras variedad de piñatas que necesitan tiempo de elaboración.
                        </motion.p>

                        {/* Slider placeholder para Piñatas que no son de Entrega Inmediata */}
                        <motion.div
                            className="mt-8 px-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                        >
                            <Swiper
                                spaceBetween={30}
                                loop={true}
                                autoplay={{
                                    delay: 7000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true
                                }}
                                navigation
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Autoplay, Navigation, Pagination]}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                    },
                                    480: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                    },
                                }}
                                className="mySwiper"
                            >
                                {pinatasNoInmediatas.map((pinata) => (
                                    <SwiperSlide key={pinata.id}>
                                        <CardPinata pinata={pinata} openModal={openModal} toogleLikePinata={toogleLikePinata} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </motion.div>
                    </div>
                    <motion.div
                        className="flex justify-center mt-5"
                        animate={{ rotate: [0, 1, -1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Link
                            href="/pinatas?entrega_inmediata=0&page=1"
                            className="hover:cursor-pointer bg-pink-600 text-white font-bold rounded-lg px-6 py-3 hover:bg-black/80 transition"
                        >
                            Ver más modelos de piñatas
                        </Link>
                    </motion.div>
                </motion.section>

                {/* Texto*/}
                <motion.section
                    className="px-2 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div className="text-center">
                        <motion.h3
                            className="text-3xl font-semibold text-[#f58f9a] mb-4"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            ¿Por qué elegir nuestras piñatas?
                        </motion.h3>
                        <motion.p
                            className="text-lg text-gray-700 mx-auto max-w-3xl"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            En Piñatas Brillantes, nos especializamos en crear piñatas únicas y personalizadas para que tu fiesta sea inolvidable. Ya sea que busques algo tradicional o totalmente original, tenemos opciones para todos los gustos.
                            <br />
                            Nuestras piñatas están hechas con materiales de alta calidad y podemos personalizarlas a tu gusto. Además, ofrecemos opciones de entrega inmediata para que siempre tengas la piñata perfecta, incluso si tu celebración es a último momento.
                            <br />
                            ¡Haz que tu evento brille con una piñata !
                        </motion.p>
                    </div>
                </motion.section>

                {/* Sección de Testimonios */}
                {/* <motion.section
                    className="py-8 px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div className="text-center">
                        <motion.h2
                            className="text-4xl font-bold text-[#f58f9a] mb-4"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            ¿Qué dicen nuestros clientes?
                        </motion.h2>

                        <motion.p
                            className="text-xl text-gray-700"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            ¡Nuestros clientes felices son la mejor prueba de la calidad de nuestras piñatas!
                        </motion.p>

                        <motion.div
                            className="mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <div className="bg-gray-300 h-64 rounded-lg w-full">
                                <p className="text-center text-xl text-gray-700 pt-28">Aquí irá el slider de Testimonios</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.section> */}

                {/* Mapa */}
                <MapHouse />
                {/* Modal ver piñata */}
                {modalOpen && selectedPinata && (
                    <Dialog open={modalOpen} onOpenChange={closeModal}>
                        <DialogContent>
                            <DialogTitle>{selectedPinata.nombre}</DialogTitle>
                            <DialogDescription asChild>
                                <div>
                                    <div className="h-96 overflow-hidden mb-2 flex justify-center">
                                        <img
                                            src={`/storage/${selectedPinata.imagen}`}
                                            alt={selectedPinata.nombre}
                                            className="h-[100%] object-cover"
                                        />
                                    </div>
                                    <div>{selectedPinata.descripcion}</div>
                                    <div className="mt-4">
                                        <span className="text-lg font-bold text-pink-600">
                                            {formatCurrency(+selectedPinata.precio)}
                                        </span>
                                    </div>
                                    <div className="mt-2 flex justify-between">
                                        <a
                                            href={`https://api.whatsapp.com/send/?phone=${import.meta.env.VITE_TELEFONO_WHAT}&text=Hola+me+interesa+la+pinata+${import.meta.env.VITE_APP_URL}/pinatas/${selectedPinata.id}&type=phone_number&app_absent=0`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            Me interesa
                                            <MessageCircle className="w-5 h-5" />
                                        </a>
                                        <ButtonHeart pinata={selectedPinata} toogleLikePinata={toogleLikePinata} />
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogContent>
                    </Dialog>
                )}
                {/* modal aviso login */}
                <ModalContainer isModalVisible={isModalVisible} nameModal={nameModal} setIsModalVisible={setIsModalVisible} />
            </AppLayoutTemplate>
        </>
    );
}
