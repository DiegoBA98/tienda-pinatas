import { BreadcrumbItem } from "@/types";
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { Head } from "@inertiajs/react";
import {  Pinata,  } from "@/interfaces/intex";
import PinataDetalle from "@/components/pinataDetalle";

interface PinatasProps {
    pinata: Pinata;
}

export default function Pinatas({ pinata }: PinatasProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Joyas',
            href: '/pinata/{pinata}',
        },
    ];

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <Head title="Piñatas" />
            <PinataDetalle pinata={pinata} />
        </AppLayoutTemplate>
    );
}
