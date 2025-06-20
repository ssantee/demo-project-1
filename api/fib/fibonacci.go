package fib

import "errors"

var pregeneratedFibonacci = []int{0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040}

// fibonacci generates a Fibonacci sequence up to positive integer
// n, inclusive, starting with the specified startx and starty values.
// For startx and starty or 0 and 1, it uses pregenerated Fibonacci numbers.
func fibonacci(n int, startx int, starty int) ([]int, error) {
	if n < 0 || startx < 0 || starty < 0 {
		return nil, errors.New("invalid input")
	}

	if n >= 1000000 {
		return pregeneratedFibonacci, nil
	}

	if startx == 0 && starty == 1 {
		for i, e := range pregeneratedFibonacci {
			if e > n {
				return pregeneratedFibonacci[:i], nil
			}
		}
	}

	var result []int

	// deal with out of sequence startx and starty
	if startx < starty {
		result = append(result, startx, starty)
	} else {
		result = append(result, starty, startx)
	}

	for i := 2; i <= n; i++ {
		next := result[i-1] + result[i-2]
		if next > n || next > 1000000 {
			// If the next Fibonacci number exceeds n or 1,000,000, stop.
			break
		}
		result = append(result, next)
	}

	return result, nil
}
