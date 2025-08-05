// Simulate a network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- MOCK DATA ---

export type Transaction = {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
};

const customers = [
  'Liam Johnson', 'Olivia Smith', 'Noah Williams', 'Emma Brown', 'Oliver Jones', 
  'Ava Garcia', 'Elijah Miller', 'Charlotte Davis', 'William Rodriguez', 'Sophia Martinez'
];

const generateTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const statusOptions: Transaction['status'][] = ['Completed', 'Pending', 'Failed'];
  for (let i = 0; i < count; i++) {
    const date = new Date(2024, 5, 28 - i);
    transactions.push({
      id: `TRX${1000 + i}`,
      customer: customers[i % customers.length],
      date: date.toISOString().split('T')[0],
      amount: Math.random() * 500 + 20,
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    });
  }
  return transactions;
};

// --- API FUNCTIONS ---

export async function getMetrics() {
  await delay(1000);
  return {
    revenue: 45231.89,
    revenueChange: 20.1,
    users: 2350,
    usersChange: 180.1,
    conversions: 1214,
    conversionsChange: 19,
    growth: 34.1,
  };
}

export async function getRevenueData() {
  await delay(1500);
  return [
    { month: 'January', revenue: 2000 },
    { month: 'February', revenue: 1800 },
    { month: 'March', revenue: 2200 },
    { month: 'April', revenue: 2780 },
    { month: 'May', revenue: 1890 },
    { month: 'June', revenue: 2390 },
    { month: 'July', revenue: 3490 },
  ];
}

export async function getSalesByCategoryData() {
  await delay(1800);
  return [
    { category: 'Electronics', sales: 4000 },
    { category: 'Apparel', sales: 3000 },
    { category: 'Services', sales: 2000 },
    { category: 'Books', sales: 2780 },
    { category: 'Home Goods', sales: 1890 },
  ];
}

export async function getTransactions(): Promise<Transaction[]> {
  await delay(2000);
  return generateTransactions(50);
}

export async function getUserGrowthData() {
  await delay(1200);
  return [
    { month: 'January', users: 120 },
    { month: 'February', users: 150 },
    { month: 'March', users: 170 },
    { month: 'April', users: 210 },
    { month: 'May', users: 250 },
    { month: 'June', users: 280 },
    { month: 'July', users: 320 },
  ];
}

export async function getConversionRateData() {
  await delay(1400);
  return [
    { month: 'January', rate: 2.1 },
    { month: 'February', rate: 2.5 },
    { month: 'March', rate: 2.8 },
    { month: 'April', rate: 3.1 },
    { month: 'May', rate: 2.9 },
    { month: 'June', rate: 3.2 },
    { month: 'July', rate: 3.5 },
  ];
}

export async function getKpiData() {
  await delay(800);
  return {
    ctr: 2.5,
    ctrChange: 15,
    cpc: 1.2,
    cpcChange: -10,
    roas: 4.2,
    roasChange: 25,
  };
}
