import { useLocation, useRoute } from 'wouter';
import { LayoutDashboard, Store, ShoppingBag, LogOut } from 'lucide-react';
import { useMarketplace } from '@/contexts/MarketplaceContext';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
}

export function Sidebar() {
  const [, navigate] = useLocation();
  const { userRole, setUserRole } = useMarketplace();

  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard className="w-5 h-5" />,
      roles: ['admin'],
    },
    {
      label: 'Minha Loja',
      path: '/seller',
      icon: <Store className="w-5 h-5" />,
      roles: ['seller'],
    },
    {
      label: 'Lojas',
      path: '/customer',
      icon: <ShoppingBag className="w-5 h-5" />,
      roles: ['customer'],
    },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(userRole));

  const handleLogout = () => {
    setUserRole('customer');
    navigate('/');
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold font-bold text-sidebar-accent">
          MarketHub
        </h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">
          Marketplace Regional
        </p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200 text-left"
          >
            {item.icon}
            <span className="font-medium font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Role Indicator and Logout */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="px-4 py-2 bg-sidebar-accent/10 rounded-lg">
          <p className="text-xs text-sidebar-foreground/60 uppercase tracking-wide">
            Perfil Ativo
          </p>
          <p className="text-sm font-bold font-bold text-sidebar-accent capitalize">
            {userRole === 'admin' && 'Administrador'}
            {userRole === 'seller' && 'Lojista'}
            {userRole === 'customer' && 'Cliente'}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="w-full"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Trocar Perfil
        </Button>
      </div>
    </div>
  );
}
