import { PinatasType } from '@/interfaces/intex';
import { router } from '@inertiajs/react';

export default function Pagination({ pinatas }: { pinatas: PinatasType }) {
    const currentPage = pinatas.current_page;
    const lastPage = pinatas.last_page;
    const nextPage = pinatas.next_page_url;
    const prevPage = pinatas.prev_page_url;

    const goToPage = (page: number) => {
        if (page < 1 || page > lastPage) return;
        router.visit(`/pinatas?page=${page}`);
    };

    return (
        <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between mb-12">

            {/* movil */}
            <div className="flex justify-between flex-1 sm:hidden px-8">
                {prevPage ? (
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 rounded-md hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 cursor-pointer"
                    >
                        Anterior
                    </button>
                ) : (
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-md">
                        Anterior
                    </span>
                )}

                {nextPage ? (
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 rounded-md hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 cursor-pointer"
                    >
                        Siguiente
                    </button>
                ) : (
                    <span className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-md">
                        Siguiente
                    </span>
                )}
            </div>

            {/* tamaño grande */}
            <div className="hidden sm:flex-1 sm:flex sm:flex-col sm:gap-4 sm:items-center sm:justify-between ">
                <div>
                    <p className="text-sm text-gray-700">
                        Mostrando{' '}
                        <span className="font-medium">{pinatas.from}</span> a{' '}
                        <span className="font-medium">{pinatas.to}</span> de{' '}
                        <span className="font-medium">{pinatas.total}</span> resultados
                    </p>
                </div>

                <div>
                    <span className="relative z-0 inline-flex shadow-sm rounded-md gap-1">
                        {prevPage ? (
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md leading-5 hover:text-gray-400 hover:cursor-pointer"
                            >
                                <svg className="size-7" fill="text-gray-200" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    />
                                </svg>
                            </button>
                        ) : (
                            <span
                                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-l-md leading-5"
                            >
                                <svg className="size-7" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    />
                                </svg>
                            </span>
                        )}
                        {pinatas.links.slice(1, -1).map((link) => (
                            <button
                                key={link.label}
                                onClick={() => link.url && goToPage(Number(link.label))}
                                className={`relative inline-flex items-center px-4 py-2 text-sm ${
                                    link.active
                                        ? 'text-gray-700 bg-white border-2 border-gray-300 cursor-default scale-105 font-extrabold'
                                        : 'text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 cursor-pointer hover:scale-105 transition'
                                }`}
                            >
                                {link.label}
                            </button>
                        ))}

                        {nextPage ? (
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md leading-5 hover:text-gray-400 hover:cursor-pointer"
                            >
                                <svg className="size-7" fill="text-gray-200" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    />
                                </svg>
                            </button>
                        ) : (
                            <span
                                className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-r-md leading-5"
                            >
                                <svg className="size-7" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    />
                                </svg>
                            </span>
                        )}
                    </span>
                </div>
            </div>
        </nav>
    );
}

