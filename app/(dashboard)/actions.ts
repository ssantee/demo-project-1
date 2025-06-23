'use server';

import { revalidatePath } from 'next/cache';

type FibonacciInput = {
    n: number;
    startx?: number;
    starty?: number;
};

type FizzbuzzInput = {
    number: number;
    fizzDivisor?: number;
    buzzDivisor?: number;
    existingCollection?: string;
    alternatePairings?: { number: number; string: string }[];
};

const endpoint = process.env.ENDPOINT_FIB;
if (!endpoint) {
    throw new Error('ENDPOINT_FIB environment variable is not set');
}

const endpointFizzBuzz = process.env.ENDPOINT_FBZ;
if (!endpointFizzBuzz) {
    throw new Error('ENDPOINT_FIZZBUZZ environment variable is not set');
}

export async function getFibonacci({
    n,
    startx,
    starty
}: FibonacciInput): Promise<{ result?: number[]; error?: string }> {
    if (isNaN(n) || n < 0) {
        return { error: 'Invalid input' };
    }

    try {
        const res = await fetch(
            `${endpoint}?n=${n}&startx=${startx}&starty=${starty}`
        );
        if (!res.ok) {
            // Try to parse error message from the response
            let errorMsg = 'Unknown error';
            try {
                const text = await res.text();
                errorMsg = text || errorMsg;
            } catch {}
            return { error: errorMsg };
        }
        const result = await res.json();
        return { result };
    } catch (err) {
        return { error: 'Network error' };
    } finally {
        revalidatePath('/fibonacci');
    }
}

export async function getFizzBuzz({
    number,
    fizzDivisor,
    buzzDivisor,
    existingCollection,
    alternatePairings
}: FizzbuzzInput): Promise<{ result?: number[]; error?: string }> {
    if (isNaN(number) || number < 0) {
        return { error: 'Invalid input' };
    }

    var ap: { [key: string]: string } = {};

    if (alternatePairings && Array.isArray(alternatePairings)) {
        ap = alternatePairings.reduce(
            (acc: { [key: string]: string }, item) => {
                if (
                    item &&
                    typeof item === 'object' &&
                    'number' in item &&
                    'string' in item
                ) {
                    acc[item.number.toString()] = item.string.toString();
                }
                return acc;
            },
            {}
        );
    }
    console.log('Alternate Pairings:');
    console.log(ap);

    try {
        var ec =
            existingCollection
                ?.split(',')
                .map((item) => item.trim())
                .map((item) => parseInt(item, 10))
                .filter((item) => !isNaN(item)) || [];

        const res = await fetch(`${endpointFizzBuzz}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number,
                fizzDivisor,
                buzzDivisor,
                existingCollection: ec,
                alternatePairings: ap
            })
        });
        if (!res.ok) {
            // Try to parse error message from the response
            let errorMsg = 'Unknown error';
            try {
                const text = await res.text();
                errorMsg = text || errorMsg;
            } catch {}
            return { error: errorMsg };
        }
        const result = await res.json();
        return { result };
    } catch (err) {
        return { error: 'Network error' };
    } finally {
        revalidatePath('/fibonacci');
    }
}
