export type Product = {
  id: string;
  name: string;
  description?: string | null;
  weight?: string | null;
  price?: number | null;
  image?: string | null;
  categoryId?: string | null;
  active: boolean;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: string;
    name: string;
  } | null;
};

export type GalleryImage = {
  id: string;
  title: string;
  image: string;
  category?: string | null;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  id: string;
  customerName: string;
  customerPhone?: string | null;
  productName?: string | null;
  productId?: string | null;
  message?: string | null;
  status: string;
  whatsappSent: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Setting = {
  id: string;
  key: string;
  value: string;
  updatedAt: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};