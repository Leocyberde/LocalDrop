import { useMarketplace } from '@/contexts/MarketplaceContext';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Store, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { stores } = useMarketplace();

  // Calculate statistics
  const totalStores = stores.length;
  const totalProducts = stores.reduce((sum, store) => sum + store.products.length, 0);
  const totalRevenue = stores.reduce((sum, store) => 
    sum + store.products.reduce((pSum, product) => pSum + product.price, 0), 0
  );
  const avgRating = (stores.reduce((sum, store) => sum + store.rating, 0) / stores.length).toFixed(1);

  // Chart data
  const storeData = stores.map(store => ({
    name: store.name,
    products: store.products.length,
    rating: store.rating,
  }));

  const categoryData = stores.map(store => ({
    name: store.category,
    value: store.products.length,
  }));

  const COLORS = ['#FF6B35', '#FFB366', '#E55A1F', '#CC4D1A', '#B34015'];

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold font-bold text-foreground">
            Dashboard do Administrador
          </h1>
          <p className="text-muted-foreground mt-2">
            Visão geral do marketplace e estatísticas gerais
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total de Lojas</p>
                <p className="text-3xl font-bold font-bold text-foreground mt-2">
                  {totalStores}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Store className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total de Produtos</p>
                <p className="text-3xl font-bold font-bold text-foreground mt-2">
                  {totalProducts}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Avaliação Média</p>
                <p className="text-3xl font-bold font-bold text-foreground mt-2">
                  {avgRating}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Valor Total Catálogo</p>
                <p className="text-3xl font-bold font-bold text-primary mt-2">
                  R$ {(totalRevenue / 1000).toFixed(1)}k
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Products by Store */}
          <Card className="p-6 bg-white border border-border">
            <h2 className="text-lg font-bold font-bold text-foreground mb-4">
              Produtos por Loja
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={storeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Bar dataKey="products" fill="#FF6B35" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Products by Category */}
          <Card className="p-6 bg-white border border-border">
            <h2 className="text-lg font-bold font-bold text-foreground mb-4">
              Distribuição por Categoria
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Stores List */}
        <Card className="p-6 bg-white border border-border">
          <h2 className="text-lg font-bold font-bold text-foreground mb-4">
            Lojas Cadastradas
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold font-bold text-foreground">
                    Loja
                  </th>
                  <th className="text-left py-3 px-4 font-bold font-bold text-foreground">
                    Categoria
                  </th>
                  <th className="text-left py-3 px-4 font-bold font-bold text-foreground">
                    Produtos
                  </th>
                  <th className="text-left py-3 px-4 font-bold font-bold text-foreground">
                    Avaliação
                  </th>
                  <th className="text-left py-3 px-4 font-bold font-bold text-foreground">
                    Proprietário
                  </th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store) => (
                  <tr key={store.id} className="border-b border-border hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-foreground">
                      {store.name}
                    </td>
                    <td className="py-3 px-4 font-medium text-muted-foreground">
                      {store.category}
                    </td>
                    <td className="py-3 px-4 font-medium text-foreground">
                      {store.products.length}
                    </td>
                    <td className="py-3 px-4 font-medium text-foreground">
                      ⭐ {store.rating} ({store.reviews} avaliações)
                    </td>
                    <td className="py-3 px-4 font-medium text-muted-foreground">
                      {store.owner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
