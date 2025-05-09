import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { CircleHelp, Contact, House, PartyPopper, Users } from 'lucide-react';
import AppLogo from './app-logo';

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



export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className='ml-2 size-24' >
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
