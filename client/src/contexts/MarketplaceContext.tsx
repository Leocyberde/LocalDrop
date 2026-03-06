import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'seller' | 'customer';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: string;
  storeId: string;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  products: Product[];
  rating: number;
  reviews: number;
  owner: string;
}

export interface MarketplaceContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  stores: Store[];
  addStore: (store: Store) => void;
  updateStore: (storeId: string, store: Partial<Store>) => void;
  deleteStore: (storeId: string) => void;
  addProduct: (storeId: string, product: Product) => void;
  updateProduct: (storeId: string, productId: string, product: Partial<Product>) => void;
  deleteProduct: (storeId: string, productId: string) => void;
  getStoreById: (storeId: string) => Store | undefined;
  getProductsByStore: (storeId: string) => Product[];
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

// Mock data for demonstration
const mockStores: Store[] = [
  {
    id: '1',
    name: 'TechPhone',
    category: 'Celulares',
    description: 'Loja especializada em celulares e acessórios',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663099927454/UoDTDRMwjf2rgTvCCJgtqg/store-showcase-L7VKTyVsXsV5u3BNQg7kJ8.webp',
    products: [
      {
        id: 'p1',
        name: 'iPhone 15 Pro',
        price: 5999,
        description: 'Smartphone topo de linha com câmera profissional',
        category: 'Celulares',
        storeId: '1',
      },
      {
        id: 'p2',
        name: 'Samsung Galaxy S24',
        price: 4999,
        description: 'Smartphone com tela AMOLED e bateria de longa duração',
        category: 'Celulares',
        storeId: '1',
      },
    ],
    rating: 4.8,
    reviews: 234,
    owner: 'João Silva',
  },
  {
    id: '2',
    name: 'ElectroMax',
    category: 'Eletrônicos',
    description: 'Eletrônicos e eletrodomésticos de qualidade',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663099927454/UoDTDRMwjf2rgTvCCJgtqg/store-showcase-L7VKTyVsXsV5u3BNQg7kJ8.webp',
    products: [
      {
        id: 'p3',
        name: 'Notebook Dell XPS 13',
        price: 7999,
        description: 'Notebook ultraportátil com processador Intel i7',
        category: 'Eletrônicos',
        storeId: '2',
      },
      {
        id: 'p4',
        name: 'Smart TV 55"',
        price: 2499,
        description: 'TV 4K com sistema operacional Android',
        category: 'Eletrônicos',
        storeId: '2',
      },
    ],
    rating: 4.6,
    reviews: 156,
    owner: 'Maria Santos',
  },
  {
    id: '3',
    name: 'Paper & More',
    category: 'Papelaria',
    description: 'Papelaria completa para escritório e escola',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663099927454/UoDTDRMwjf2rgTvCCJgtqg/store-showcase-L7VKTyVsXsV5u3BNQg7kJ8.webp',
    products: [
      {
        id: 'p5',
        name: 'Caderno 200 folhas',
        price: 45,
        description: 'Caderno com capa dura e papel de qualidade',
        category: 'Papelaria',
        storeId: '3',
      },
      {
        id: 'p6',
        name: 'Caneta Pilot 0.7mm',
        price: 15,
        description: 'Caneta esferográfica com tinta azul',
        category: 'Papelaria',
        storeId: '3',
      },
    ],
    rating: 4.7,
    reviews: 89,
    owner: 'Carlos Oliveira',
  },
  {
    id: '4',
    name: 'Vinhos & Bebidas',
    category: 'Adega',
    description: 'Seleção premium de vinhos e bebidas importadas',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663099927454/UoDTDRMwjf2rgTvCCJgtqg/store-showcase-L7VKTyVsXsV5u3BNQg7kJ8.webp',
    products: [
      {
        id: 'p7',
        name: 'Vinho Tinto Reserva',
        price: 189,
        description: 'Vinho tinto de qualidade premium, safra 2018',
        category: 'Adega',
        storeId: '4',
      },
      {
        id: 'p8',
        name: 'Champagne Francês',
        price: 299,
        description: 'Champagne importado da região de Champagne',
        category: 'Adega',
        storeId: '4',
      },
    ],
    rating: 4.9,
    reviews: 112,
    owner: 'Ana Costa',
  },
];

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [stores, setStores] = useState<Store[]>(mockStores);

  const addStore = (store: Store) => {
    setStores([...stores, store]);
  };

  const updateStore = (storeId: string, updates: Partial<Store>) => {
    setStores(stores.map(store =>
      store.id === storeId ? { ...store, ...updates } : store
    ));
  };

  const deleteStore = (storeId: string) => {
    setStores(stores.filter(store => store.id !== storeId));
  };

  const addProduct = (storeId: string, product: Product) => {
    setStores(stores.map(store =>
      store.id === storeId
        ? { ...store, products: [...store.products, product] }
        : store
    ));
  };

  const updateProduct = (storeId: string, productId: string, updates: Partial<Product>) => {
    setStores(stores.map(store =>
      store.id === storeId
        ? {
            ...store,
            products: store.products.map(product =>
              product.id === productId ? { ...product, ...updates } : product
            ),
          }
        : store
    ));
  };

  const deleteProduct = (storeId: string, productId: string) => {
    setStores(stores.map(store =>
      store.id === storeId
        ? { ...store, products: store.products.filter(p => p.id !== productId) }
        : store
    ));
  };

  const getStoreById = (storeId: string) => {
    return stores.find(store => store.id === storeId);
  };

  const getProductsByStore = (storeId: string) => {
    const store = getStoreById(storeId);
    return store ? store.products : [];
  };

  const value: MarketplaceContextType = {
    userRole,
    setUserRole,
    stores,
    addStore,
    updateStore,
    deleteStore,
    addProduct,
    updateProduct,
    deleteProduct,
    getStoreById,
    getProductsByStore,
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
