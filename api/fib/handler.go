package fib

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
)

var pregeneratedFibonacci = []int{0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040}

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, this is the Fibonacci API handler!\n")

	userProvidedNumber := r.URL.Query().Get("n")
	if userProvidedNumber == "" {
		http.Error(w, "Please provide a number in the query parameter 'n'", http.StatusBadRequest)
		return
	}

	optionalStartX := r.URL.Query().Get("startx")
	optionalStartY := r.URL.Query().Get("starty")

	var startX, startY int
	if optionalStartX != "" {
		var err error
		startX, err = strconv.Atoi(optionalStartX)
		if err != nil {
			http.Error(w, "Invalid startx provided", http.StatusBadRequest)
			return
		}
	} else {
		startX = 0 // Default value for startx
	}
	if optionalStartY != "" {
		var err error
		startY, err = strconv.Atoi(optionalStartY)
		if err != nil {
			http.Error(w, "Invalid starty provided", http.StatusBadRequest)
			return
		}
	} else {
		startY = 1 // Default value for starty
	}

	// If both startx and starty are provided, they will be used as the first two numbers in the Fibonacci sequence
	if optionalStartX != "" && optionalStartY != "" {
		fmt.Fprintf(w, "Using custom start values: startx=%d, starty=%d\n", startX, startY)
	} else {
		fmt.Fprintf(w, "Using default start values: startx=0, starty=1\n")
	}

	// Convert user-provided number to integer
	userProvidedNumber = r.URL.Query().Get("n")
	n, err := strconv.Atoi(userProvidedNumber)
	if err != nil {
		http.Error(w, "Invalid number provided", http.StatusBadRequest)
		return
	}

	result, err := fibonacci(n, startX, startY)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(result); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
}

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
