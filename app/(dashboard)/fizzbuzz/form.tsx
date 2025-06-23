import { getFizzBuzz } from '../actions';
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
import { FizzbuzzOutput } from './types';
import { Settings } from 'lucide-react';

const schema = z.object({
    number: z.coerce.number().int().min(0, { message: "Please enter a valid number" }).max(1000000, { message: "Please enter a number less than or equal to 1,000,000" }),
    fizzDivisor: z.coerce.number().int().optional(),
    buzzDivisor: z.coerce.number().int().optional(),
    existingCollection: z.array(z.string()).optional(),
    alternatePairings: z.array(z.object({
        number: z.coerce.number().int(),
        string: z.string().min(1, { message: "String must not be empty" }),
    })).optional(),
}).refine(data => data.fizzDivisor !== 0 && data.buzzDivisor !== 0, {
    message: "Fizz and Buzz divisors must not be zero",
});

type formSchema = z.infer<typeof schema>;

export default function FizzbuzzForm({ setResults, working, setWorking, error, setError }: {
    setResults: React.Dispatch<React.SetStateAction<FizzbuzzOutput[]>>; working: boolean; setWorking: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null; setError: React.Dispatch<React.SetStateAction<string | null>>
}) {
    const form = useForm<formSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            number: 30,
            fizzDivisor: 3,
            buzzDivisor: 5,
        },
    })

    async function onSubmit(values: formSchema) {
        setWorking(true);
        setError(null);
        console.log("Submitting form with values:", values);
        var result = await getFizzBuzz(values)
        if (result.error) {
            setError(result.error);
            setWorking(false);
            console.log(`Error: ${result.error}`);
        } else {
            console.log(`FizzBuzz sequence for ${values.number} is ${result.result}`);
        }
        console.log("FizzBuzz result:", result);
        if (result.result) {
            const output: FizzbuzzOutput = {
                inputNumber: values.number,
                fizzDivisor: values.fizzDivisor ?? 0,
                buzzDivisor: values.buzzDivisor ?? 1,
                sequence: result.result,
                generatedAt: new Date().toLocaleString(),
            };
            // sort descending
            setResults(prev => [...prev, output].sort((a, b) => b.generatedAt.localeCompare(a.generatedAt)));
            setWorking(false);
        } else {
            console.error("No result returned from getFizzBuzz");
            setWorking(false);
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormDescription>
                                    Generate FizzBuzz up to the given number.
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
                                name="fizzDivisor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fizz divisor</FormLabel>
                                        <FormDescription>
                                            Override the divisor for Fizz (typically 3).
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
                                name="buzzDivisor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Buzz divisor</FormLabel>
                                        <FormDescription>
                                            Override the divisor for Buzz (typically 5).
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



                            <div className='mt-2 text-right'><Button type="button" onClick={() => { form.resetField('fizzDivisor'); form.resetField('buzzDivisor') }}>Reset Overrides</Button></div>
                        </CollapsibleContent>
                    </Collapsible>

                    {working ? (
                        <Button type="submit" disabled>
                            Working...
                        </Button>
                    ) : (
                        <Button type="submit">FizzBuzz!</Button>
                    )}
                    {/* Display error message if exists*/}
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </Form>
        </div>
    );
}