
import AppLogo from '@/components/app-logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div
            className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-[#f9ebf2]"
            style={{
                background: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 800 800\" opacity=\"0.3\" role=\"img\" aria-label=\"Blue Purple Red Bubbles\"%3E%3Ctitle%3EBlue Purple Red Bubbles%3C/title%3E%3Cdesc%3EA decorative SVG with blue, purple, and red bubbles.%3C/desc%3E%3Cdefs%3E%3Cfilter id=\"bbblurry-filter-2\" x=\"-100%\" y=\"-100%\" width=\"400%\" height=\"400%\" filterUnits=\"objectBoundingBox\" primitiveUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\"%3E%3CfeGaussianBlur stdDeviation=\"127\" x=\"0%\" y=\"0%\" width=\"100%\" height=\"100%\" in=\"SourceGraphic\" edgeMode=\"none\" result=\"blur\"%3E%3C/feGaussianBlur%3E%3C/filter%3E%3C/defs%3E%3Cg filter=\"url(%23bbblurry-filter-2)\"%3E%3Cellipse rx=\"150\" ry=\"150\" cx=\"195.07575212882972\" cy=\"489.54354010245856\" fill=\"%23ff5e92\"%3E%3C/ellipse%3E%3Cellipse rx=\"150\" ry=\"150\" cx=\"411.24331807088123\" cy=\"210.89381150171187\" fill=\"%23df4cfe\"%3E%3C/ellipse%3E%3Cellipse rx=\"150\" ry=\"150\" cx=\"630.9035196778707\" cy=\"172.32006381312212\" fill=\"%23008dff\"%3E%3C/ellipse%3E%3C/g%3E%3C/svg%3E') no-repeat center center",
                backgroundSize: "cover",
                position: "relative",
                zIndex: 0
            }}
        >
            <div className="flex w-full max-w-md flex-col gap-6">
                <Link href={route('home')} className="flex items-center gap-2 self-center font-medium">
                    <div className="flex size-16 items-center justify-center">
                        <AppLogo />
                    </div>
                </Link>

                <div className="flex flex-col gap-6">
                    <Card className="rounded-xl">
                        <CardHeader className="px-10 pt-8 pb-0 text-center">
                            <CardTitle className="text-xl">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-10 py-8">{children}</CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
