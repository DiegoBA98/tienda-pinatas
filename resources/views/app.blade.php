<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="icon" href="{{ asset('favicon-new.ico') }}" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased bg-[#f9ebf2]"
    style="
    background: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' viewBox=\'0 0 800 800\' opacity=\'0.1\' role=\'img\' aria-label=\'Blue Purple Red Bubbles\'%3E%3Ctitle%3EBlue Purple Red Bubbles%3C/title%3E%3Cdesc%3EA decorative SVG with blue, purple, and red bubbles.%3C/desc%3E%3Cdefs%3E%3Cfilter id=\'bbblurry-filter-2\' x=\'-100%\' y=\'-100%\' width=\'400%\' height=\'400%\' filterUnits=\'objectBoundingBox\' primitiveUnits=\'userSpaceOnUse\' color-interpolation-filters=\'sRGB\'%3E%3CfeGaussianBlur stdDeviation=\'127\' x=\'0%\' y=\'0%\' width=\'100%\' height=\'100%\' in=\'SourceGraphic\' edgeMode=\'none\' result=\'blur\'%3E%3C/feGaussianBlur%3E%3C/filter%3E%3C/defs%3E%3Cg filter=\'url(%23bbblurry-filter-2)\'%3E%3Cellipse rx=\'150\' ry=\'150\' cx=\'195.07575212882972\' cy=\'489.54354010245856\' fill=\'%23ff5e92\'%3E%3C/ellipse%3E%3Cellipse rx=\'150\' ry=\'150\' cx=\'411.24331807088123\' cy=\'210.89381150171187\' fill=\'%23df4cfe\'%3E%3C/ellipse%3E%3Cellipse rx=\'150\' ry=\'150\' cx=\'630.9035196778707\' cy=\'172.32006381312212\' fill=\'%23008dff\'%3E%3C/ellipse%3E%3C/g%3E%3C/svg%3E') no-repeat center center;
    background-size: cover;
    position: relative;
    z-index: 0; /* Asegúrate de que el contenido se muestre por encima */
">
    @inertia
</body>

</html>
