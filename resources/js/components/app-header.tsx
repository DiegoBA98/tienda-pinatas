import { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookHeart, CircleHelp, Contact, House, KeyRound, Menu, PartyPopper, Users } from 'lucide-react';
import AppLogo from './app-logo';
import { Tooltip } from './ui/tooltip';
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';

const mainNavItems: NavItem[] = [
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

const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div
                className={`border-sidebar-border/80 border-b bg-[#f58f9a] sticky top-0 z-50 transition-all duration-300`}
            >
                <div className={`mx-auto flex items-center px-4 md:max-w-7xl transition-all duration-300 ${isScrolled ? 'py-0' : 'py-2'}`}>
                    <div className="w-full flex justify-between">

                        {/* logo */}
                        <Link href="/dashboard" prefetch className="flex items-center">
                            <img src="/logo.png" alt="Logo piñatas brillantes" className={`size-16 transition-all ${isScrolled ? 'scale-75' : 'scale-100'} duration-300`} />
                        </Link>

                        {/* menu desktop */}
                        <div className="hidden items-center space-x-6 lg:flex">
                            <NavigationMenu className="flex h-full items-stretch">
                                <NavigationMenuList className="flex h-full items-stretch space-x-1">
                                    {mainNavItems.map((item, index) => (
                                        <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    page.url === item.href && activeItemStyles,
                                                    'h-9 cursor-pointer px-3',
                                                )}
                                                prefetch
                                            >
                                                {item.icon && <Icon iconNode={item.icon} className={`mr-2 h-4 w-4 transition-all ${isScrolled ? 'scale-75' : 'scale-100'} duration-300`} />}
                                                <span className={`transition-all ${isScrolled ? 'text-xs' : 'text-base'} duration-300`}>{item.title}</span>
                                            </Link>
                                            {page.url === item.href && (
                                                <div className={`absolute ${isScrolled ? 'bottom-2' : 'bottom-0' }  left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white`}></div>
                                            )}
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        {/* barra y autenticado */}
                        <div className="flex">
                            {auth.user ? (
                                <Tooltip>
                                <TooltipTrigger>
                                    <motion.div
                                        animate={{ rotate: [0, 1, -1, 0] }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Link href='/mis-favoritos' className='flex items-center mr-2 hover:underline'>
                                        <BookHeart />
                                            <span className='hover:cursor-pointer p-0 mr-1'>Mis favoritos</span>
                                        </Link>
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent className='bg-gray-800 text-white rounded-lg p-1' sideOffset={-2}>
                                    Ver mis piñatas favoritas
                                </TooltipContent >
                                </Tooltip>

                            ) : null }

                            {/* iniciales */}
                            <div className="flex items-center space-x-2">
                                {auth.user ?
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="size-10 rounded-full p-1">
                                                <Avatar className={`size-8 overflow-hidden rounded-full hover:cursor-pointer transition-all ${isScrolled ? 'scale-75' : 'scale-100'} duration-300`}>
                                                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                        {getInitials(auth.user.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="end">
                                            {auth.user ? <UserMenuContent user={auth.user} /> : null}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    : <Link href="/login" className='flex items-center group'>
                                        <Icon iconNode={KeyRound} className="h-4 w-4 group-hover:underline" />
                                        <Button size={'sm'} variant={'link'} className='group-hover:underline px-1 hover:cursor-pointer'>
                                            Iniciar Sesión
                                        </Button>
                                    </Link>
                                }
                            </div>

                            {/* barra */}
                            <div className="flex items-center lg:hidden ">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon" className=" h-[34px] w-[34px]">
                                            <Menu className="h-5 w-5" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="bg-sidebar flex h-full w-64 flex-col items-stretch justify-between">
                                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                        <SheetHeader className="flex justify-start text-left">
                                            <AppLogo />
                                        </SheetHeader>
                                        <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                            <div className="flex h-full flex-col justify-between text-sm">
                                                <div className="flex flex-col space-y-4">
                                                    {mainNavItems.map((item) => (
                                                        <Link key={item.title} href={item.href} className="flex items-center space-x-2 font-medium">
                                                            {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {breadcrumbs.length > 1 && (
                <div className="border-sidebar-border/70 flex w-full border-b">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
