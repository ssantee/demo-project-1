import { string } from "zod";

export type FibonacciOutput = {
    inputNumber: number;
    inputStartX?: number;
    inputStartY?: number;
    sequence: number[];
    generatedAt: string;
};

export type FizzbuzzOutput = {
    inputNumber: number;
    fizzDivisor?: number;
    buzzDivisor?: number;
    existingCollection?: string[];
    alternatePairings?: { number: number; string: string }[];
    sequence: (number | string)[];
    generatedAt: string;
};
