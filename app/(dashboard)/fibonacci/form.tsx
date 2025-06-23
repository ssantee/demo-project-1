import { getFibonacci } from '../actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FibonacciOutput } from './types';
import { Settings } from 'lucide-react';

const schema = z.object({
    n: z.coerce.number().int().min(0, { message: "Please enter a valid number" }).max(1000000, { message: "Please enter a number less than or equal to 1,000,000" }),
    startx: z.coerce.number().int().optional(),
    starty: z.coerce.number().int().optional(),
});

type formSchema = z.infer<typeof schema>;

export default function FibonacciForm({ setResults, working, setWorking, error, setError }: {
    setResults: React.Dispatch<React.SetStateAction<FibonacciOutput[]>>; working: boolean; setWorking: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null; setError: React.Dispatch<React.SetStateAction<string | null>>
}) {
    const form = useForm<formSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            n: 30,
            startx: 0,
            starty: 1,
        },
    })

    async function onSubmit(values: formSchema) {
        setWorking(true);
        setError(null);
        console.log("Submitting form with values:", values);
        var result = await getFibonacci(values)
        if (result.error) {
            setError(result.error);
            setWorking(false);
            console.log(`Error: ${result.error}`);
        } else {
            console.log(`Fibonacci sequence for ${values.n} is ${result.result}`);
        }
        console.log("Fibonacci result:", result);
        if (result.result) {
            const output: FibonacciOutput = {
                inputNumber: values.n,
                inputStartX: values.startx ?? 0,
                inputStartY: values.starty ?? 1,
                sequence: result.result,
                generatedAt: new Date().toLocaleString(),
            };
            // sort descending
            setResults(prev => [...prev, output].sort((a, b) => b.generatedAt.localeCompare(a.generatedAt)));
            setWorking(false);
        } else {
            console.error("No result returned from getFibonacci");
            setWorking(false);
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="n"
                        render={({ field }) => (
                            <FormItem>
                                <FormDescription>
                                    Calculate the Fibonacci sequence up to the given number.
                                </FormDescription>
                                <FormLabel>Enter a number</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter a number"
                                        min={0}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Collapsible>
                        <CollapsibleTrigger><Settings className="h-4 w-4" /></CollapsibleTrigger>
                        <CollapsibleContent>
                            <FormField
                                control={form.control}
                                name="startx"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Starting number</FormLabel>
                                        <FormDescription>
                                            Override the starting number for the Fibonacci sequence (typically 0).
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter a number"
                                                min={0}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="starty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Second number</FormLabel>
                                        <FormDescription>
                                            Override the second number for the Fibonacci sequence (typically 1).
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter a number"
                                                min={0}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='mt-2 text-right'><Button type="button" onClick={() => { form.resetField('startx'); form.resetField('starty') }}>Reset Overrides</Button></div>
                        </CollapsibleContent>
                    </Collapsible>

                    {working ? (
                        <Button type="submit" disabled>
                            Working...
                        </Button>
                    ) : (
                        <Button type="submit">Calculate Fibonacci</Button>
                    )}
                    {/* Display error message if exists TODO */}
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </Form>
        </div>
    );
}