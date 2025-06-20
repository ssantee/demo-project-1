package fbz

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, this is the fizzbuzz API handler!\n")

	userProvidedNumber := r.URL.Query().Get("number")
	if userProvidedNumber == "" {
		http.Error(w, "Please provide a number in the query parameter 'number'", http.StatusBadRequest)
		return
	}

	n, err := strconv.Atoi(userProvidedNumber)
	if err != nil {
		http.Error(w, "Invalid number provided", http.StatusBadRequest)
		return
	}

	result := fizzBuzz(n)

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(result); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
}
