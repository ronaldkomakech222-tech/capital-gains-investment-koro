import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { usePortfolio } from '@/hooks/usePortfolio';
import { ArrowUpCircle, ArrowDownCircle, Briefcase, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

export function Transactions() {
  const { transactions, balance, deposit, withdraw } = usePortfolio();
  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      toast.error('Invalid amount');
      return;
    }
    deposit(num);
    toast.success(`Successfully deposited $${num.toLocaleString()}`);
    setAmount('');
  };

  const handleWithdraw = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      toast.error('Invalid amount');
      return;
    }
    const success = withdraw(num);
    if (success) {
      toast.success(`Successfully withdrew $${num.toLocaleString()}`);
      setAmount('');
    } else {
      toast.error('Insufficient balance');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions & Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and view your account history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Manage Wallet</CardTitle>
            <CardDescription>Add or remove funds from your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl bg-muted/50 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Available</p>
              <p className="text-3xl font-bold">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tx-amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input 
                    id="tx-amount" 
                    placeholder="0.00" 
                    className="pl-7"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button className="w-full" onClick={handleDeposit}>Deposit</Button>
                <Button variant="outline" className="w-full" onClick={handleWithdraw}>Withdraw</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>History</CardTitle>
            <CardDescription>Recent activity on your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.length > 0 ? (
                        transactions.map((tx) => (
                          <TableRow key={tx.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getTransactionIcon(tx.type)}
                                <span className="capitalize text-xs font-medium">{tx.type}</span>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">{tx.description}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {new Date(tx.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell className={`text-right font-semibold ${getTransactionColor(tx.type)}`}>
                              {tx.type === 'deposit' || tx.type === 'return' ? '+' : '-'}${tx.amount.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                            No transactions yet.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getTransactionIcon(type: string) {
  switch (type) {
    case 'deposit': return <PlusCircle size={14} className="text-emerald-500" />;
    case 'withdraw': return <ArrowDownCircle size={14} className="text-rose-500" />;
    case 'invest': return <Briefcase size={14} className="text-blue-500" />;
    case 'return': return <ArrowUpCircle size={14} className="text-emerald-500" />;
    default: return <ArrowUpCircle size={14} />;
  }
}

function getTransactionColor(type: string) {
  switch (type) {
    case 'deposit':
    case 'return': return 'text-emerald-600';
    case 'withdraw':
    case 'invest': return 'text-rose-600';
    default: return '';
  }
}
