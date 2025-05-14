import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function MapHouse() {
    return (
        <motion.section
            className="px-4 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
        >
            <div className="text-center">
                <h3 className="text-3xl font-semibold text-[#f58f9a] mb-2">
                    Donde estamos ubicados
                </h3>
                <div className="flex justify-center md:justify-end mb-2">
                    <a href="https://maps.app.goo.gl/mVYgcBuihi8nL3aM9?g_st=aw" target="_blank"
                        rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium outline-none focus-visible:border-ring focus-visible:ring-ring/50 bg-black h-9 px-8 py-3 mt-2 md:mt-0 mb-2 md:mb-0 text-white hover:bg-black/80">Abrir en Maps <MapPin className="size-5" /> </a>
                </div>
                <div className='h-[380px] md:h-[450px] w-[100%]'>
                    <MapContainer
                        center={[20.527717, -103.240337]}
                        zoom={13}
                        style={{ height: '100%', width: '100%', zIndex: 2 }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[20.527717, -103.240337]}>
                            <Popup>
                                Piñatas Brillantes - Tu tienda de piñatas personalizadas.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </motion.section>
    )
}
