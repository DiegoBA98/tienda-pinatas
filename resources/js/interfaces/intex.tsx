export interface Category {
    id: number;
    nombre: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface Pinata {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    tags: string[] | null;
    category_id: number;
    created_at: string | null;
    updated_at: string | null;
    precio: string;
    category: Category;
    is_favorite?: boolean;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PinatasType {
    current_page: number;
    data: Pinata[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
