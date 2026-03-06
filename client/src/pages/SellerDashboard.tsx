import { useState } from 'react';
import { useMarketplace } from '@/contexts/MarketplaceContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';
import { toast } from 'sonner';

export default function SellerDashboard() {
  const { stores, addStore, updateStore, deleteStore, addProduct, deleteProduct } = useMarketplace();
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(stores[0]?.id || null);
  const [isAddingStore, setIsAddingStore] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newStore, setNewStore] = useState({ name: '', category: '', description: '' });
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', category: '' });

  const selectedStore = stores.find(s => s.id === selectedStoreId);

  const handleAddStore = () => {
    if (!newStore.name || !newStore.category) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const store = {
      id: Date.now().toString(),
      name: newStore.name,
      category: newStore.category,
      description: newStore.description,
      products: [],
      rating: 5,
      reviews: 0,
      owner: 'Você',
    };

    addStore(store);
    setNewStore({ name: '', category: '', description: '' });
    setIsAddingStore(false);
    setSelectedStoreId(store.id);
    toast.success('Loja criada com sucesso!');
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !selectedStoreId) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      category: newProduct.category,
      storeId: selectedStoreId,
    };

    addProduct(selectedStoreId, product);
    setNewProduct({ name: '', price: '', description: '', category: '' });
    setIsAddingProduct(false);
    toast.success('Produto adicionado com sucesso!');
  };

  const handleDeleteProduct = (productId: string) => {
    if (selectedStoreId) {
      deleteProduct(selectedStoreId, productId);
      toast.success('Produto removido com sucesso!');
    }
  };

  const categories = ['Celulares', 'Eletrônicos', 'Papelaria', 'Adega', 'Outros'];

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold font-bold text-foreground">
            Painel do Lojista
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas lojas e produtos
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Lojas */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold font-bold text-foreground">
                  Minhas Lojas
                </h2>
                <Dialog open={isAddingStore} onOpenChange={setIsAddingStore}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Criar Nova Loja</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium font-medium text-foreground">
                          Nome da Loja
                        </label>
                        <Input
                          placeholder="Ex: TechPhone"
                          value={newStore.name}
                          onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium font-medium text-foreground">
                          Categoria
                        </label>
                        <select
                          value={newStore.category}
                          onChange={(e) => setNewStore({ ...newStore, category: e.target.value })}
                          className="w-full mt-1 px-3 py-2 border border-border rounded-lg font-medium"
                        >
                          <option value="">Selecione uma categoria</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium font-medium text-foreground">
                          Descrição
                        </label>
                        <Textarea
                          placeholder="Descreva sua loja"
                          value={newStore.description}
                          onChange={(e) => setNewStore({ ...newStore, description: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <Button onClick={handleAddStore} className="w-full bg-primary">
                        Criar Loja
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-2">
                {stores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStoreId(store.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      selectedStoreId === store.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gray-50 text-foreground hover:bg-gray-100'
                    }`}
                  >
                    <p className="font-bold font-bold text-sm">{store.name}</p>
                    <p className="text-xs opacity-75">{store.category}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content - Produtos */}
          <div className="lg:col-span-3">
            {selectedStore ? (
              <div className="space-y-6">
                {/* Store Info */}
                <Card className="p-6 bg-white border border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold font-bold text-foreground">
                        {selectedStore.name}
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        {selectedStore.description}
                      </p>
                      <div className="flex gap-6 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Categoria</p>
                          <p className="font-bold font-bold text-foreground">
                            {selectedStore.category}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Avaliação</p>
                          <p className="font-bold font-bold text-foreground">
                            ⭐ {selectedStore.rating}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Produtos</p>
                          <p className="font-bold font-bold text-foreground">
                            {selectedStore.products.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Products */}
                <Card className="p-6 bg-white border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold font-bold text-foreground">
                      Produtos
                    </h3>
                    <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-primary">
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar Produto
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adicionar Novo Produto</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium font-medium text-foreground">
                              Nome do Produto
                            </label>
                            <Input
                              placeholder="Ex: iPhone 15 Pro"
                              value={newProduct.name}
                              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium font-medium text-foreground">
                              Preço (R$)
                            </label>
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium font-medium text-foreground">
                              Categoria
                            </label>
                            <select
                              value={newProduct.category}
                              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                              className="w-full mt-1 px-3 py-2 border border-border rounded-lg font-medium"
                            >
                              <option value="">Selecione uma categoria</option>
                              {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-medium font-medium text-foreground">
                              Descrição
                            </label>
                            <Textarea
                              placeholder="Descreva o produto"
                              value={newProduct.description}
                              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <Button onClick={handleAddProduct} className="w-full bg-primary">
                            Adicionar Produto
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {selectedStore.products.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">
                        Nenhum produto adicionado ainda
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedStore.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-border hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-bold font-bold text-foreground">
                              {product.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {product.description}
                            </p>
                            <p className="text-sm font-medium font-semibold text-primary mt-1">
                              R$ {product.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toast.info('Edição em breve')}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            ) : (
              <Card className="p-12 bg-white border border-border text-center">
                <p className="text-muted-foreground">
                  Crie uma loja para começar a adicionar produtos
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
