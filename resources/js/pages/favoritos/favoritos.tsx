import ButtonHeart from '@/components/buttonHeart';
import Pagination from '@/components/pagination';
import { Pinata, PinatasType } from '@/interfaces/intex';
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { formatCurrency } from '@/utils';
import { Head, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { MessageCircle, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';



export default function Favoritos({ pinatas }: { pinatas: PinatasType }) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Piñatas Favoritas',
            href: '/mis-favoritos',
        },
    ];

    const toogleLikePinata = (pinata: Pinata) => {
        if (auth.user) {
            if (pinata.is_favorite) {
                router.delete(`/pinatas/favorites/${pinata.id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        pinata.is_favorite = false;
                    },
                });
            } else {
                router.post('/pinatas/favorites', { pinata_id: pinata.id }, {
                    preserveScroll: true,
                    onSuccess: () => {
                        pinata.is_favorite = true;
                    },
                });
            }
        }
    };

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

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <Head title="Piñatas Favoritas" />
            <motion.div
                className="container mx-auto px-8 md:px-6 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <motion.h1
                    className="text-3xl font-extrabold text-center text-gray-800 mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <Star className="inline-block text-yellow-500 mr-2" /> Mis Piñatas Favoritas
                </motion.h1>
                <motion.p
                    className="text-center text-lg text-gray-700 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut", delay: 0.2 }}
                >
                    <MessageCircle className="inline-block text-blue-500 mr-2" />
                    ¡Genial elección! Las piñatas que más te gustan están aquí,
                    ¡y ahora es el momento de elegir la que hará de tu fiesta un evento inolvidable!
                    Haz que tu celebración sea única con una de nuestras opciones favoritas.
                </motion.p>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 bg-white p-6 rounded-lg shadow-md"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
                >
                    {pinatas.data.map((pinata, index) => (
                        <motion.div
                            key={pinata.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transform flex flex-col justify-between transition duration-500"
                            initial={{ opacity: 0.4, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.1, delay: index * 0.1, ease: "easeInOut" }}
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
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{pinata.nombre}</h3>
                                    <p className="text-gray-600 text-sm">{pinata.descripcion}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center px-4">
                                    <span className="text-sm text-gray-500">Precio:</span>
                                    <span className="text-lg font-semibold text-pink-600">
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
                                    {/* Corazón */}
                                    <ButtonHeart pinata={pinata} toogleLikePinata={toogleLikePinata} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
            <Pagination pinatas={pinatas} />
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
        </AppLayoutTemplate>
    );
}
