'use client';

import { useState } from 'react';
import { FibonacciOutput } from './types';
import FibonacciForm from './form';
import FibonacciDisplay from './display';
import About from './about';

export default function FibonacciPage() {
    const [results, setResults] = useState<FibonacciOutput[]>([]);
    const [working, setWorking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    return (
        <div className="flex min-w-lg mx-auto md:gap-4 flex-col md:flex-row">
            <div className="flex-[2_1_63%] mx-auto">
                <h1 className="text-2xl font-bold mb-4">Fibonacci Generator</h1>
                <div>
                    <FibonacciForm
                        setResults={setResults}
                        working={working}
                        setWorking={setWorking}
                        error={error}
                        setError={setError}
                    />
                </div>
                <div>
                    <hr className="my-4" />
                    <FibonacciDisplay results={results} />
                </div>
            </div>
            <div className="flex-[1_1_36%] md:max-w-xs md:w-auto mt-8 md:mt-0">
                <About />
            </div>
        </div>
    );
}
