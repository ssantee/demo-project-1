'use client';

import { useState } from 'react';
import { FizzbuzzOutput } from './types';
import FizzbuzzDisplay from './display';
import About from './about';
import FizzbuzzForm from './form';

export default function FizzbuzzPage() {
  const [results, setResults] = useState<FizzbuzzOutput[]>([]);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex min-w-lg mx-auto p-4 md:gap-4 flex-col md:flex-row">
      <div className="flex-[2_1_63%] mx-auto">
        <h1 className="text-2xl font-bold mb-4">FizzBuzz Generator</h1>
        <FizzbuzzForm setResults={setResults} working={working} setWorking={setWorking} error={error} setError={setError} />
        <hr className="my-4" />
        <FizzbuzzDisplay results={results} />
      </div>
      <div className="flex-[1_1_36%] md:max-w-xs w-full md:w-auto mt-8 md:mt-0">
        <About />
      </div>
    </div>
  );
}
