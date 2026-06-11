import { useState, useEffect } from 'react';

export type TransactionType = 'deposit' | 'withdraw' | 'invest' | 'return';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  description: string;
}

export interface Investment {
  id: string;
  fundId: string;
  fundName: string;
  amount: number;
  initialAmount: number;
  date: string;
  status: 'active' | 'closed';
}

export interface Fund {
  id: string;
  name: string;
  description: string;
  risk: 'Low' | 'Medium' | 'High';
  expectedReturn: number;
  color: string;
}

export const FUNDS: Fund[] = [
  {
    id: 'conservative-1',
    name: 'Secure Growth Bond',
    description: 'A low-risk fund focusing on government bonds and high-grade corporate debt.',
    risk: 'Low',
    expectedReturn: 4.5,
    color: 'oklch(0.627 0.194 149.214)', // Greenish
  },
  {
    id: 'balanced-1',
    name: 'Global Equity Mix',
    description: 'A medium-risk balanced portfolio of global stocks and fixed-income assets.',
    risk: 'Medium',
    expectedReturn: 8.2,
    color: 'oklch(0.6 0.118 259.046)', // Bluish
  },
  {
    id: 'aggressive-1',
    name: 'Tech Frontier Fund',
    description: 'High-risk, high-reward fund investing in emerging technology and startups.',
    risk: 'High',
    expectedReturn: 15.4,
    color: 'oklch(0.627 0.258 29.234)', // Reddish/Orange
  },
];

export function usePortfolio() {
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('inv_balance');
    return saved ? JSON.parse(saved) : 1000; // Default starter balance
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('inv_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [investments, setInvestments] = useState<Investment[]>(() => {
    const saved = localStorage.getItem('inv_investments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('inv_balance', JSON.stringify(balance));
    localStorage.setItem('inv_transactions', JSON.stringify(transactions));
    localStorage.setItem('inv_investments', JSON.stringify(investments));
  }, [balance, transactions, investments]);

  const deposit = (amount: number) => {
    if (amount <= 0) return;
    setBalance(prev => prev + amount);
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'deposit',
      amount,
      date: new Date().toISOString(),
      description: 'Account Deposit',
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const withdraw = (amount: number) => {
    if (amount <= 0 || amount > balance) return false;
    setBalance(prev => prev - amount);
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'withdraw',
      amount,
      date: new Date().toISOString(),
      description: 'Account Withdrawal',
    };
    setTransactions(prev => [newTransaction, ...prev]);
    return true;
  };

  const invest = (fundId: string, amount: number) => {
    if (amount <= 0 || amount > balance) return false;
    const fund = FUNDS.find(f => f.id === fundId);
    if (!fund) return false;

    setBalance(prev => prev - amount);
    
    const newInvestment: Investment = {
      id: Math.random().toString(36).substr(2, 9),
      fundId,
      fundName: fund.name,
      amount,
      initialAmount: amount,
      date: new Date().toISOString(),
      status: 'active',
    };
    
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'invest',
      amount,
      date: new Date().toISOString(),
      description: `Invested in ${fund.name}`,
    };

    setInvestments(prev => [newInvestment, ...prev]);
    setTransactions(prev => [newTransaction, ...prev]);
    return true;
  };

  const closeInvestment = (investmentId: string) => {
    const investment = investments.find(i => i.id === investmentId);
    if (!investment || investment.status === 'closed') return false;

    // Simulate some profit/loss based on random luck for the demo
    const fund = FUNDS.find(f => f.id === investment.fundId);
    const returnRate = fund ? fund.expectedReturn / 100 : 0.05;
    // Simple logic: random factor between 0.8 and 1.2 * expected return
    const randomFactor = 0.8 + Math.random() * 0.4;
    const finalAmount = investment.amount * (1 + (returnRate * randomFactor));
    
    setBalance(prev => prev + finalAmount);
    
    setInvestments(prev => prev.map(inv => 
      inv.id === investmentId ? { ...inv, status: 'closed', amount: finalAmount } : inv
    ));

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'return',
      amount: finalAmount,
      date: new Date().toISOString(),
      description: `Closed investment in ${investment.fundName}`,
    };
    setTransactions(prev => [newTransaction, ...prev]);
    return true;
  };

  const totalPortfolioValue = investments
    .filter(i => i.status === 'active')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalProfit = transactions
    .filter(t => t.type === 'return')
    .reduce((sum, t) => sum + t.amount, 0) - 
    transactions
    .filter(t => t.type === 'invest')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    balance,
    transactions,
    investments,
    deposit,
    withdraw,
    invest,
    closeInvestment,
    totalPortfolioValue,
    totalProfit,
    funds: FUNDS
  };
}
