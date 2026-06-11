import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  ArrowLeftRight, 
  User, 
  Wallet,
  Bell,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePortfolio } from '@/hooks/usePortfolio';

export function Shell() {
  const { balance } = usePortfolio();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-card/50 backdrop-blur-xl">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <TrendingUp size={20} />
            </div>
            <span>Vesta</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem to="/market" icon={<TrendingUp size={20} />} label="Invest" />
          <NavItem to="/transactions" icon={<ArrowLeftRight size={20} />} label="Transactions" />
          <NavItem to="/profile" icon={<User size={20} />} label="Profile" />
        </nav>

        <div className="p-4 mt-auto">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-xs font-medium text-muted-foreground mb-1">Available Balance</p>
            <p className="text-lg font-bold">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            <Button variant="link" className="p-0 h-auto text-xs mt-2" asChild>
              <NavLink to="/transactions">Manage Wallet</NavLink>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-8 bg-background/50 backdrop-blur-md z-10">
          <div className="flex-1 flex items-center md:max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Search investments..." 
                className="pl-9 bg-muted/50 border-none focus-visible:ring-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 ml-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-medium text-xs">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <Outlet />
          </div>
        </div>

        {/* Bottom Nav - Mobile */}
        <nav className="md:hidden h-16 border-t bg-background flex items-center justify-around px-2">
          <MobileNavItem to="/" icon={<LayoutDashboard size={20} />} />
          <MobileNavItem to="/market" icon={<TrendingUp size={20} />} />
          <MobileNavItem to="/transactions" icon={<ArrowLeftRight size={20} />} />
          <MobileNavItem to="/profile" icon={<User size={20} />} />
        </nav>
      </main>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
          isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        }`
      }
    >
      {icon}
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}

function MobileNavItem({ to, icon }: { to: string; icon: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `p-3 rounded-xl transition-colors ${
          isActive 
            ? 'text-primary' 
            : 'text-muted-foreground'
        }`
      }
    >
      {icon}
    </NavLink>
  );
}
