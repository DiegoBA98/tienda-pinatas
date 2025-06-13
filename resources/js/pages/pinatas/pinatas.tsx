import { BreadcrumbItem, SharedData } from "@/types";
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { Head, router, usePage } from "@inertiajs/react";
import { Category, Pinata, PinatasType } from "@/interfaces/intex";
import { formatCurrency } from "@/utils";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Pagination from "@/components/pagination";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ModalContainer from "@/components/ui/modalContainer";
import ButtonHeart from "@/components/buttonHeart";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import CardPinata from "@/components/cardPinata";

interface PinatasProps {
    categories: Category[];
    pinatas: PinatasType;
    search: string;
    category: string;
}

export default function Pinatas({ pinatas, categories, search, category }: PinatasProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const [searchTerm, setSearchTerm] = useState(search || "");
    const [selectedCategory, setSelectedCategory] = useState(category || "");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [nameModal, setNameModal] = useState('');
    const [entregaInmediata, setEntregaInmediata] = useState<null | number>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    //modal para ver piñatas
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

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const entregaInmediataParam = queryParams.get('entrega_inmediata');
        if (entregaInmediataParam !== null) {
            setEntregaInmediata(Number(entregaInmediataParam));
        }

        const pageActually = queryParams.get('page');
        const lastPage = pinatas?.last_page || 1;
        if (!pageActually || +pageActually > lastPage || isNaN(+pageActually) || +pageActually < 1) {
            router.visit('/pinatas?page=1');
        }

        setIsInitialLoad(false);
    }, [pinatas.last_page]);

    const queryParams = new URLSearchParams(window.location.search);
    const pageActually = queryParams.get('page');
    const lastPage = pinatas?.last_page || 1;
    if (!pageActually || +pageActually > lastPage || isNaN(+pageActually) || +pageActually < 1) {
        router.visit('/pinatas?page=1');
    }

    // const toogleLikePinata = (pinata: Pinata) => {
    //     if (auth.user) {
    //         if (pinata.is_favorite) {
    //             router.delete(`/pinatas/favorites/${pinata.id}`, {
    //                 preserveScroll: true,
    //                 onSuccess: () => {
    //                     pinata.is_favorite = false;
    //                 },
    //             });
    //         } else {
    //             router.post('/pinatas/favorites', { pinata_id: pinata.id }, {
    //                 preserveScroll: true,
    //                 onSuccess: () => {
    //                     pinata.is_favorite = true;
    //                 },
    //             });
    //         }
    //     } else {
    //         setIsModalVisible(true);
    //         setNameModal('NoLogin');
    //         closeModal();
    //     }
    // };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Piñatas',
            href: '/pinatas',
        },
    ];

    useEffect(() => {
        if (isInitialLoad) return;

        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        if (searchTerm) {
            if (searchTerm.length > 0) params.set('search', searchTerm);
        } else {
            params.delete('search');
        }

        if (selectedCategory) {
            params.set('category', selectedCategory);
        } else {
            params.delete('category');
        }

        if (entregaInmediata !== null) {
            params.set('entrega_inmediata', entregaInmediata.toString());
        } else {
            params.delete('entrega_inmediata');
        }

        // Mantener el parámetro de página si existe
        if (!params.has('page')) {
            params.set('page', '1');
        }

        const newQuery = params.toString();
        if (window.location.search !== `?${newQuery}`) {
            router.visit(`/pinatas?${newQuery}`, { preserveState: true, preserveScroll: true });
        }
    }, [searchTerm, selectedCategory, entregaInmediata, isInitialLoad]);

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
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <Head title="Piñatas" />
            <motion.div
                className="container mx-auto px-8 md:px-4 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >

                {/* titulos */}
                <motion.h1
                    className="text-3xl font-semibold text-center text-[#f58f9a]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    Joyeria
                </motion.h1>
                {/* <motion.p
                    className="text-center text-lg text-gray-700 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut", delay: 0.2 }}
                >
                    En esta sección encontrarás una amplia variedad de piñatas. Explora nuestras opciones y elige la más adecuada para tu evento.
                </motion.p> */}

                {/* Buscador input */}
                <motion.div
                    className="w-full flex justify-center mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4, ease: "easeInOut" }}
                >
                    <input
                        className="bg-white px-6 py-3 w-full md:max-w-1/2 rounded-lg text-center shadow-lg border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
                        type="text"
                        placeholder="Escribe aquí si deseas buscar una piñata"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </motion.div>

                {/* tipo de entrega */}
                <motion.p
                    className="text-center mt-3 text-lg text-gray-700 font-bold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
                >
                    Selecciona una opción para filtrar tipo de entrega
                </motion.p>
                <motion.div
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex justify-center gap-4"
                >
                    <Button
                        variant="default"
                        className={`cursor-pointer hover:bg-pink-600 ${entregaInmediata === 1 ? 'bg-pink-600 text-white scale-110 transition' : ''}`}
                        onClick={() => setEntregaInmediata(entregaInmediata === 1 ? null : 1)}
                    >
                        Entrega Inmediata
                    </Button>
                    <Button
                        variant="default"
                        className={`cursor-pointer hover:bg-pink-600 ${entregaInmediata === 0 ? 'bg-pink-600 text-white scale-110 transition' : ''}`}
                        onClick={() => setEntregaInmediata(entregaInmediata === 0 ? null : 0)}
                    >
                        Sobre Pedido
                    </Button>
                </motion.div>

                {/* Seleccionar categoria */}
                <motion.p
                    className="text-center mt-3 text-lg text-gray-700 font-bold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
                >
                    Selecciona una opción para filtrar por alguna categoría
                </motion.p>
                {/* Select para pantallas pequeñas */}
                <div className="flex justify-center mb-6 md:hidden">
                    <select
                        className="border border-gray-300 rounded px-4 py-2 text-gray-700"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((category) => (
                            <option key={category.nombre} value={category.id.toString()}>
                                {category.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Botones para pantallas medianas en adelante */}
                <div className="hidden md:flex justify-center gap-4 flex-wrap mb-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeInOut" }}
                        >
                            <Button
                                variant="default"
                                className={`cursor-pointer hover:bg-pink-600 ${selectedCategory === category.id.toString() ? 'bg-pink-600 text-white scale-110 transition' : ''}`}
                                onClick={() => setSelectedCategory(selectedCategory === category.id.toString() ? "" : category.id.toString())}
                            >
                                {category.nombre}
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* Categoría seleccionada */}
                {/* <motion.p
                    className="text-center mt-3 mb-4 text-lg text-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4, ease: "easeInOut" }}
                >
                    Categoría seleccionada: <span className="font-bold">{categories.find(c => c.id.toString() === selectedCategory)?.nombre ?? 'Ninguna'}</span>
                </motion.p> */}

                {/* piñatas */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 mb-6 mt-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
                >
                    {pinatas.data.map((pinata) => (
                        <CardPinata
                            key={pinata.id}
                            pinata={pinata}
                            openModal={openModal}
                            toogleLikePinata={toogleLikePinata}
                        />
                    ))}
                </motion.div>

                {/* Modal para ver piñata */}
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

            </motion.div>
            <Pagination pinatas={pinatas} />
            {/* ModalContainer se pasa el estado de visibilidad */}
            {isModalVisible && <ModalContainer isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} nameModal={nameModal} />}
        </AppLayoutTemplate>
    );
}
