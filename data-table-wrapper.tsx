import { getTransactions, type Transaction } from '@/lib/data';
import { DataTable } from './data-table';

export async function DataTableWrapper() {
  const data = await getTransactions();

  const columns: {
    key: keyof Transaction;
    header: string;
    enableSorting?: boolean;
  }[] = [
    { key: 'id', header: 'Transaction ID' },
    { key: 'customer', header: 'Customer', enableSorting: true },
    { key: 'date', header: 'Date', enableSorting: true },
    { key: 'amount', header: 'Amount', enableSorting: true },
    { key: 'status', header: 'Status' },
  ];

  return <DataTable columns={columns} data={data} />;
}
