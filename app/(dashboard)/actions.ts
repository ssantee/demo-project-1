'use server';

import { revalidatePath } from 'next/cache';

type FibonacciInput = {
  n: number;
  startx?: number;
  starty?: number;
};

export async function getFibonacci({n, startx, starty}: FibonacciInput): Promise<{ result?: number[]; error?: string }> {
  if (isNaN(n) || n < 0) {
    return { error: 'Invalid input' };
  }

  try {
    const res = await fetch(`https://rldemo.santee.cloud/api/fib/handler?n=${n}&startx=${startx}&starty=${starty}`);
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
