import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full max-w-sm" />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Skeleton className="h-5 w-[120px]" /></TableHead>
              <TableHead><Skeleton className="h-5 w-[150px]" /></TableHead>
              <TableHead><Skeleton className="h-5 w-[100px]" /></TableHead>
              <TableHead><Skeleton className="h-5 w-[100px]" /></TableHead>
              <TableHead><Skeleton className="h-5 w-[100px]" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-[120px]" />
        <Skeleton className="h-9 w-[90px]" />
      </div>
    </div>
  );
}
