import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { FibonacciOutput } from './types';

export default function FibonacciDisplay({
    results
}: {
    results?: FibonacciOutput[];
}) {
    return (
        <div className="max-w-[90vw] overflow-x-auto max-h-[40vh] overflow-y-auto">
            {results && results.length > 0 ? (
                <Table className="max-w-[100%] caption-top">
                    <TableCaption className="text-bold mb-1">
                        Your sequences
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[12%]">Max</TableHead>
                            <TableHead className="w-[24%]">
                                Starting Numbers
                            </TableHead>
                            <TableHead className="w-[40%]">
                                Fibonacci Sequence
                            </TableHead>
                            <TableHead className="w-[24%]">
                                Generated At
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results.map((result, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    {result.inputNumber}
                                </TableCell>
                                <TableCell>
                                    {result.inputStartX}, {result.inputStartY}
                                </TableCell>
                                <TableCell>
                                    {result.sequence.join(', ')}
                                </TableCell>
                                <TableCell>
                                    {new Date(
                                        Number(result.generatedAt)
                                    ).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-muted-foreground">
                    No results yet. Submit a number to see the Fibonacci
                    sequence.
                </p>
            )}
        </div>
    );
}
