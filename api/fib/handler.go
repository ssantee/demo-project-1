package fib

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

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
