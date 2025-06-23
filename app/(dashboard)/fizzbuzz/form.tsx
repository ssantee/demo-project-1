import { getFibonacci, getFizzBuzz } from '../actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FizzbuzzOutput } from './types';
import { Settings } from 'lucide-react';

const schema = z
    .object({
        number: z.coerce
            .number()
            .int()
            .min(0, { message: 'Please enter a valid number' })
            .max(1000000, {
                message: 'Please enter a number less than or equal to 1,000,000'
            }),
        fizzDivisor: z.coerce.number().int().optional(),
        buzzDivisor: z.coerce.number().int().optional(),
        existingCollection: z.string().optional(),
        alternatePairings: z
            .array(
                z.object({
                    number: z.coerce.number().int(),
                    string: z
                        .string()
                        .min(1, { message: 'String must not be empty' })
                })
            )
            .optional()
    })
    .refine((data) => data.fizzDivisor !== 0 && data.buzzDivisor !== 0, {
        message: 'Fizz and Buzz divisors must not be zero'
    });

const schema2 = z.object({
    n: z.coerce
        .number()
        .int()
        .min(0, { message: 'Please enter a valid number' })
        .max(1000000, {
            message: 'Please enter a number less than or equal to 1,000,000'
        }),
    startx: z.coerce.number().int().optional(),
    starty: z.coerce.number().int().optional()
});

type formSchema = z.infer<typeof schema>;
type formSchema2 = z.infer<typeof schema2>;

export default function FizzbuzzForm({
    setResults,
    working,
    setWorking,
    error,
    setError
}: {
    setResults: React.Dispatch<React.SetStateAction<FizzbuzzOutput[]>>;
    working: boolean;
    setWorking: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}) {
    const form = useForm<formSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            number: 30,
            fizzDivisor: 3,
            buzzDivisor: 5,
            existingCollection: '',
            alternatePairings: []
        }
    });

    const form2 = useForm<formSchema2>({
        resolver: zodResolver(schema2),
        defaultValues: {
            n: 30,
            startx: 0,
            starty: 1
        }
    });

    async function onSubmit(values: formSchema) {
        setWorking(true);
        setError(null);
        console.log('Submitting form with values:', values);
        var result = await getFizzBuzz(values);
        if (result.error) {
            setError(result.error);
            setWorking(false);
            console.log(`Error: ${result.error}`);
        } else {
            console.log(
                `FizzBuzz sequence for ${values.number} is ${result.result}`
            );
        }
        console.log('FizzBuzz result:', result);
        if (result.result) {
            const output: FizzbuzzOutput = {
                inputNumber: values.number,
                fizzDivisor: values.fizzDivisor ?? 3,
                buzzDivisor: values.buzzDivisor ?? 5,
                sequence: result.result,
                generatedAt: Date.now().toString(),
                existingCollection: values.existingCollection || '',
                alternatePairings: values.alternatePairings || []
            };
            // sort descending
            setResults((prev) =>
                [...prev, output].sort((a, b) =>
                    b.generatedAt.localeCompare(a.generatedAt)
                )
            );
            setWorking(false);
        } else {
            console.error('No result returned from getFizzBuzz');
            setWorking(false);
        }
    }

    return (
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
                    <CollapsibleTrigger>
                        <Settings className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="fizzDivisor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fizz divisor</FormLabel>
                                            <FormDescription>
                                                Override the divisor for Fizz
                                                (typically 3).
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
                            </div>
                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="buzzDivisor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Buzz divisor</FormLabel>
                                            <FormDescription>
                                                Override the divisor for Buzz
                                                (typically 5).
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
                            </div>
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="existingCollection"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Existing Collection
                                        </FormLabel>
                                        <FormDescription>
                                            Optional: Add an existing set to
                                            have it FizzBuzzed
                                        </FormDescription>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter existing collection (comma separated)"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Form {...form2}>
                                <button
                                    className="mt-1 mb-2 bg-blue-500 text-blue-500 py-2 rounded hover:bg-blue-600"
                                    disabled={working}
                                    type="button"
                                    onClick={form2.handleSubmit(
                                        async (values) => {
                                            setWorking(true);
                                            setError(null);
                                            // use default values
                                            var result = await getFibonacci({
                                                n: values.n,
                                                startx: values.startx,
                                                starty: values.starty
                                            });

                                            console.log(
                                                'Fibonacci result:',
                                                result
                                            );
                                            if (result) {
                                                form.setValue(
                                                    'existingCollection',
                                                    result.result?.join(', ') ||
                                                        ''
                                                );
                                                setWorking(false);
                                                setError(null);
                                            } else {
                                                setError(
                                                    'Failed to generate Fibonacci sequence'
                                                );
                                            }
                                        }
                                    )}
                                >
                                    Use a Fibonacci sequence
                                </button>
                            </Form>
                        </div>
                        {/* <FormField
                            control={form.control}
                            name="alternatePairings"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alternate Pairings</FormLabel>
                                    <FormDescription>
                                        Optional: Add alternate pairings for
                                        FizzBuzz (e.g., 7: "Bazz").
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter alternate pairings (e.g., 7:Bazz,11:Foo)"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <div className="mt-2 text-right">
                            <Button
                                type="button"
                                onClick={() => {
                                    form.resetField('fizzDivisor');
                                    form.resetField('buzzDivisor');
                                }}
                            >
                                Reset Overrides
                            </Button>
                        </div>
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
    );
}
