import { useLocation } from 'wouter';
import { useMarketplace } from '@/contexts/MarketplaceContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Store, ShoppingBag } from 'lucide-react';

export default function RoleSelector() {
  const [, navigate] = useLocation();
  const { setUserRole } = useMarketplace();

  const roles = [
    {
      id: 'admin',
      title: 'Administrador',
      description: 'Gerenciar o marketplace, lojas e usuários',
      icon: <LayoutDashboard className="w-12 h-12" />,
      color: 'from-blue-500 to-blue-600',
      path: '/admin',
    },
    {
      id: 'seller',
      title: 'Lojista',
      description: 'Criar e gerenciar sua loja e produtos',
      icon: <Store className="w-12 h-12" />,
      color: 'from-green-500 to-green-600',
      path: '/seller',
    },
    {
      id: 'customer',
      title: 'Cliente',
      description: 'Navegar e comprar em lojas',
      icon: <ShoppingBag className="w-12 h-12" />,
      color: 'from-purple-500 to-purple-600',
      path: '/customer',
    },
  ];

  const handleSelectRole = (roleId: string, path: string) => {
    setUserRole(roleId as any);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold font-bold text-foreground">
            MarketHub
          </h1>
          <p className="text-muted-foreground mt-2">
            Marketplace Regional - Selecione seu perfil para começar
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          {/* Hero Image */}
          <div className="mb-12 text-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663099927454/UoDTDRMwjf2rgTvCCJgtqg/hero-marketplace-eps4mSPfvLRwcLSHnGQtmq.webp"
              alt="Marketplace"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-8"
            />
            <h2 className="text-3xl font-bold font-bold text-foreground mb-4">
              Bem-vindo ao Marketplace Regional
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conectando lojistas e clientes em um único lugar. Escolha seu perfil abaixo para acessar o painel correspondente.
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {roles.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-border"
              >
                {/* Card Header with Gradient */}
                <div className={`bg-gradient-to-r ${role.color} p-8 flex items-center justify-center text-white`}>
                  {role.icon}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-bold text-foreground mb-2">
                    {role.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {role.description}
                  </p>

                  <Button
                    onClick={() => handleSelectRole(role.id, role.path)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Acessar como {role.title}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 bg-white rounded-lg shadow-md p-8 border border-border">
            <h3 className="text-2xl font-bold font-bold text-foreground mb-4">
              Sobre o Marketplace
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold font-bold text-foreground mb-2">
                  Para Clientes
                </h4>
                <p className="text-muted-foreground">
                  Navegue por diversas categorias de produtos: celulares, eletrônicos, papelaria, adega e muito mais.
                </p>
              </div>
              <div>
                <h4 className="font-bold font-bold text-foreground mb-2">
                  Para Lojistas
                </h4>
                <p className="text-muted-foreground">
                  Crie sua loja, adicione produtos e gerencie seu negócio de forma simples e eficiente.
                </p>
              </div>
              <div>
                <h4 className="font-bold font-bold text-foreground mb-2">
                  Para Administradores
                </h4>
                <p className="text-muted-foreground">
                  Monitore o marketplace, gerencie lojas, usuários e visualize estatísticas gerais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
