import { Link } from '@inertiajs/react';
import { Icon } from '@/components/icon';
import { Contact, PartyPopper, House, Users, CircleHelp, MessageCircle } from 'lucide-react';

export function Footer() {
    return (
        <div className="bg-[#f58f9a] text-neutral-700 py-6">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col lg:flex-row justify-between items-center lg:space-x-12 space-y-4 lg:space-y-0">
                    {/* Sección de navegación adicional */}
                    <div className="text-center lg:text-left">
                        <h5 className="font-semibold text-lg text-[#333]">Navegación</h5>
                        <ul className=" gap-y-2 mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-x-2">
                            {mainNavItems.map((item) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center justify-start lg:justify-start text-sm hover:underline text-left"
                                    >
                                        <Icon iconNode={item.icon} className="mr-2 h-5 w-5" />
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sección de contacto */}
                    <div className="text-center lg:text-left">
                        <h5 className="font-semibold text-lg text-[#333]">Contáctanos</h5>
                        <ul className="space-y-2 mt-4">
                            <li>
                                <a
                                    href={`https://api.whatsapp.com/send/?phone=${import.meta.env.VITE_TELEFONO_WHAT}&text=Hola+me+interesa+una+piñata&type=phone_number&app_absent=0`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors hover:cursor-pointer mb-2"
                                >
                                    Mandanos un whatsapp
                                    <MessageCircle className="w-5 h-5" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Sección de redes sociales */}
                    {/* <div className="text-center lg:text-left">
                        <h5 className="font-semibold text-lg text-[#333]">Síguenos</h5>
                        <ul className="flex space-x-6 justify-center lg:justify-start mt-4">
                            <li>
                                <Link
                                    href="https://facebook.com"
                                    target="_blank"
                                    className="text-sm hover:underline"
                                >
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://instagram.com"
                                    target="_blank"
                                    className="text-sm hover:underline"
                                >
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://twitter.com"
                                    target="_blank"
                                    className="text-sm hover:underline"
                                >
                                    Twitter
                                </Link>
                            </li>
                        </ul>
                    </div> */}
                </div>

                {/* Información de derechos */}
                <div className="text-center mt-6 md:mt-2">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Piñatas Brillantes. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
}

const mainNavItems = [
    {
        title: 'Inicio',
        href: '/',
        icon: House,
    },
    {
        title: 'Nosotros',
        href: '/nosotros',
        icon: Users,
    },
    {
        title: 'Piñatas',
        href: '/pinatas?page=1',
        icon: PartyPopper,
    },
    {
        title: 'Preguntas frecuentes',
        href: '/preguntas-frecuentes',
        icon: CircleHelp,
    },
    {
        title: 'Contacto',
        href: '/contacto',
        icon: Contact,
    },
];
