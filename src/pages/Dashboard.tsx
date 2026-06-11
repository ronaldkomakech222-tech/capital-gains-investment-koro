import { TrendingUp, ArrowUpRight, Wallet, PieChart, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PortfolioChart } from '@/components/dashboard/PortfolioChart';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { balance, totalPortfolioValue, totalProfit, investments } = usePortfolio();

  const activeInvestments = investments.filter(i => i.status === 'active');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Overview</h1>
          <p className="text-muted-foreground">Welcome back, John. Here's your performance today.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/market">Invest Now</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/transactions">Deposit</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Balance" 
          value={`$${(balance + totalPortfolioValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          change="+12.5%"
          icon={<Wallet className="text-primary" />}
        />
        <StatCard 
          title="Invested Amount" 
          value={`$${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          change="+8.2%"
          icon={<TrendingUp className="text-emerald-500" />}
        />
        <StatCard 
          title="Total Profit" 
          value={`$${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          change="+4.3%"
          icon={<ArrowUpRight className="text-blue-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance History</CardTitle>
            <CardDescription>Visual representation of your portfolio growth over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Assets</CardTitle>
            <CardDescription>Your current market positions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeInvestments.length > 0 ? (
                activeInvestments.slice(0, 5).map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <PieChart size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{inv.fundName}</p>
                        <p className="text-xs text-muted-foreground">{new Date(inv.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">${inv.amount.toLocaleString()}</p>
                      <Badge variant="outline" className="text-[10px] h-4 bg-emerald-500/10 text-emerald-600 border-none">
                        +2.4%
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="mx-auto text-muted-foreground mb-2" size={32} />
                  <p className="text-sm text-muted-foreground">No active investments.</p>
                  <Button variant="link" asChild>
                    <Link to="/market">Browse Market</Link>
                  </Button>
                </div>
              )}
              {activeInvestments.length > 5 && (
                <Button variant="ghost" className="w-full text-xs" asChild>
                  <Link to="/market">View All Assets</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-lg bg-muted">{icon}</div>
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-none">
            {change}
          </Badge>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
