import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { usePortfolio, Fund } from '@/hooks/usePortfolio';
import { TrendingUp, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function Market() {
  const { funds, invest, balance } = usePortfolio();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Investment Market</h1>
        <p className="text-muted-foreground">Choose from our professionally managed funds tailored to your risk profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {funds.map((fund) => (
          <FundCard key={fund.id} fund={fund} balance={balance} onInvest={invest} />
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6 flex flex-col md:row items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            <div className="text-xl font-bold">i</div>
          </div>
          <div>
            <h4 className="font-bold">Diversify your portfolio</h4>
            <p className="text-sm text-muted-foreground">
              Financial experts recommend spreading your investments across different risk levels to minimize potential losses.
            </p>
          </div>
          <Button variant="outline" className="ml-auto whitespace-nowrap">Learn More</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function FundCard({ fund, balance, onInvest }: { fund: Fund; balance: number; onInvest: (id: string, amt: number) => boolean }) {
  const [amount, setAmount] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInvest = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (numAmount > balance) {
      toast.error('Insufficient balance');
      return;
    }

    const success = onInvest(fund.id, numAmount);
    if (success) {
      toast.success(`Successfully invested $${numAmount.toLocaleString()} in ${fund.name}`);
      setIsOpen(false);
      setAmount('');
    } else {
      toast.error('Investment failed. Please try again.');
    }
  };

  const riskColor = fund.risk === 'Low' ? 'text-emerald-500 bg-emerald-500/10' : 
                    fund.risk === 'Medium' ? 'text-blue-500 bg-blue-500/10' : 
                    'text-rose-500 bg-rose-500/10';

  return (
    <Card className="group transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className={`${riskColor} border-none`}>{fund.risk} Risk</Badge>
          <TrendingUp size={20} className="text-muted-foreground opacity-50" />
        </div>
        <CardTitle>{fund.name}</CardTitle>
        <CardDescription className="line-clamp-2 h-10">{fund.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between py-4 border-y border-dashed my-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Expected Return</p>
            <p className="text-2xl font-bold text-primary">{fund.expectedReturn}% <span className="text-xs font-normal">p.a.</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Asset Class</p>
            <p className="text-sm font-medium">Mixed Assets</p>
          </div>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span>Professional management</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span>Instant liquidity</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Invest</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invest in {fund.name}</DialogTitle>
              <DialogDescription>
                Available Balance: ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount to Invest ($)</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              {parseFloat(amount) > balance && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertTriangle size={16} />
                  <span>You don't have enough balance for this investment.</span>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleInvest} disabled={!amount || parseFloat(amount) > balance || parseFloat(amount) <= 0}>
                Confirm Investment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
