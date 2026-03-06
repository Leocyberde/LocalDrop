import { useState } from 'react';
import { useMarketplace } from '@/contexts/MarketplaceContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingBag, Star, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function CustomerDashboard() {
  const { stores } = useMarketplace();
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Todos', 'Celulares', 'Eletrônicos', 'Papelaria', 'Adega'];

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          store.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Todos' || store.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedStore = stores.find(s => s.id === selectedStoreId);

  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} adicionado ao carrinho!`);
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold font-bold text-foreground">
            Lojas & Produtos
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore as melhores lojas da região
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {!selectedStore ? (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar lojas ou produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === 'Todos' ? '' : category)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors duration-200 font-medium font-medium ${
                      (category === 'Todos' && selectedCategory === '') ||
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white text-foreground border border-border hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Stores Grid */}
            {filteredStores.length === 0 ? (
              <Card className="p-12 bg-white border border-border text-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Nenhuma loja encontrada com esses critérios
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStores.map((store) => (
                  <Card
                    key={store.id}
                    className="overflow-hidden bg-white border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedStoreId(store.id)}
                  >
                    {/* Store Image */}
                    <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      {store.image && (
                        <img
                          src={store.image}
                          alt={store.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Store Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold font-bold text-foreground">
                        {store.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {store.category}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {store.description}
                      </p>

                      {/* Rating and Products */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium font-semibold text-foreground">
                            {store.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({store.reviews})
                          </span>
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {store.products.length} produtos
                        </span>
                      </div>

                      {/* View Button */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStoreId(store.id);
                        }}
                        className="w-full mt-4 bg-primary hover:bg-primary/90"
                      >
                        Ver Loja
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Back Button */}
            <Button
              variant="outline"
              onClick={() => setSelectedStoreId(null)}
              className="mb-4"
            >
              ← Voltar para Lojas
            </Button>

            {/* Store Header */}
            <Card className="p-6 bg-white border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold font-bold text-foreground">
                    {selectedStore.name}
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    {selectedStore.description}
                  </p>
                  <div className="flex gap-8 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Categoria</p>
                      <p className="font-bold font-bold text-foreground">
                        {selectedStore.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avaliação</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <p className="font-bold font-bold text-foreground">
                          {selectedStore.rating}
                        </p>
                        <span className="text-sm text-muted-foreground">
                          ({selectedStore.reviews} avaliações)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Products */}
            <div>
              <h3 className="text-2xl font-bold font-bold text-foreground mb-4">
                Produtos
              </h3>

              {selectedStore.products.length === 0 ? (
                <Card className="p-12 bg-white border border-border text-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Esta loja ainda não possui produtos
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedStore.products.map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden bg-white border border-border hover:shadow-lg transition-all duration-300"
                    >
                      {/* Product Image Placeholder */}
                      <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-muted-foreground opacity-30" />
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h4 className="text-lg font-bold font-bold text-foreground">
                          {product.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {product.category}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {product.description}
                        </p>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <p className="text-2xl font-bold font-bold text-primary">
                            R$ {product.price.toFixed(2)}
                          </p>
                        </div>

                        <Button
                          onClick={() => handleAddToCart(product.name)}
                          className="w-full mt-4 bg-primary hover:bg-primary/90"
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Adicionar ao Carrinho
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
