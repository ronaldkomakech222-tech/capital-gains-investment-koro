import { usePortfolio } from '@/hooks/usePortfolio';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PieChart, LogOut, Settings, Shield, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export function Profile() {
  const { balance, totalPortfolioValue, investments, closeInvestment } = usePortfolio();
  
  const activeInvestments = investments.filter(i => i.status === 'active');

  const handleClose = (id: string) => {
    const success = closeInvestment(id);
    if (success) {
      toast.success('Investment closed and funds returned to wallet with profit/loss');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Profile</h1>
        <p className="text-muted-foreground">Manage your settings and active positions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold mb-4">
                JD
              </div>
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-sm text-muted-foreground">Premium Investor</p>
              <div className="flex gap-2 mt-4">
                <Badge variant="outline">Verified</Badge>
                <Badge variant="outline">Gold Member</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <Shield size={16} />
                  <span>Security</span>
                </div>
                <ChevronRight size={16} />
              </Button>
              <Button variant="ghost" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <Settings size={16} />
                  <span>Preferences</span>
                </div>
                <ChevronRight size={16} />
              </Button>
              <Button variant="ghost" className="w-full justify-between text-destructive hover:text-destructive hover:bg-destructive/10">
                <div className="flex items-center gap-2">
                  <LogOut size={16} />
                  <span>Logout</span>
                </div>
                <ChevronRight size={16} />
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Positions</CardTitle>
            <CardDescription>Withdraw or manage your current investments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeInvestments.length > 0 ? (
                activeInvestments.map((inv) => (
                  <div key={inv.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border bg-muted/20 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <PieChart size={20} />
                      </div>
                      <div>
                        <p className="font-bold">{inv.fundName}</p>
                        <p className="text-xs text-muted-foreground">Invested on {new Date(inv.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="text-right">
                        <p className="text-sm font-bold">${inv.amount.toLocaleString()}</p>
                        <p className="text-[10px] text-emerald-600 font-medium">Est. Profit: +${(inv.amount * 0.05).toFixed(2)}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleClose(inv.id)}>
                        Withdraw
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <PieChart className="mx-auto mb-2 opacity-20" size={48} />
                  <p>You don't have any active investments.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
