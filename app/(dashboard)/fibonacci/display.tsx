import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FibonacciOutput } from "./types"

export default function FibonacciDisplay({ results }: { results?: FibonacciOutput[] }) {
    return (
        <div className="mt-4">
            {results && results.length > 0 ? (
                <Table className='caption-top'>
                    <TableCaption className='text-bold mb-1'>Your sequences</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Max</TableHead>
                            <TableHead>Overrides</TableHead>
                            <TableHead>Fibonacci Sequence</TableHead>
                            <TableHead>Generated at</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results.map((result, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{result.inputNumber}</TableCell>
                                <TableCell>{result.inputStartX}, {result.inputStartY}</TableCell>
                                <TableCell>{result.sequence.join(", ")}</TableCell>
                                <TableCell>{result.generatedAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-muted-foreground">No results yet. Submit a number to see the Fibonacci sequence.</p>
            )}
        </div>
    );
}