package fbz

import (
	"encoding/json"
	"net/http"
	"strconv"
)

// The purpose of two types is to convert the AlternatePairingsString type
// to an AlternatePairingsInt type, prior to core processing, so that
// alpha to int conversions stay out of the core logic.
// We start with a string map to allow for easy JSON encoding/decoding,
type AlternatePairingsString map[string]string
type AlternatePairingsInt map[int]string

type FizzBuzzRequest struct {
	Number             int                     `json:"number"`
	FizzDivisor        int                     `json:"fizzDivisor,omitempty"`
	BuzzDivisor        int                     `json:"buzzDivisor,omitempty"`
	ExistingCollection []int                   `json:"existingCollection,omitempty"`
	AlternatePairings  AlternatePairingsString `json:"alternatePairings,omitempty"`
}

type FizzBuzzPairing struct {
	Number int    `json:"number"`
	Value  string `json:"value"`
}

const Fizz = "Fizz"
const Buzz = "Buzz"

func Handler(w http.ResponseWriter, r *http.Request) {
	var request FizzBuzzRequest
	if r.Method == http.MethodPost {
		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}
	} else {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if request.Number <= 0 && len(request.ExistingCollection) == 0 {
		http.Error(w, "Please provide a positive integer in the 'number' field", http.StatusBadRequest)
		return
	}

	// Default divisors
	fizzDivisor := 3
	buzzDivisor := 5

	// If fizzDivisor or buzzDivisor is provided, use them
	if request.FizzDivisor > 0 {
		fizzDivisor = request.FizzDivisor
	}
	if request.BuzzDivisor > 0 {
		buzzDivisor = request.BuzzDivisor
	}

	divisorPairing := []FizzBuzzPairing{
		{Number: fizzDivisor, Value: Fizz},
		{Number: buzzDivisor, Value: Buzz},
	}

	var numCollection []int

	// If existingCollection is provided, use it
	if len(request.ExistingCollection) > 0 {
		numCollection = request.ExistingCollection
	} else {
		// Otherwise, generate a new collection from 1 to the provided number
		numCollection = numbersToN(request.Number)
	}

	// Convert alternate pairings from string to int map
	alternatePairings := make(AlternatePairingsInt)
	for key, value := range request.AlternatePairings {
		intKey, err := strconv.Atoi(key)
		if err != nil {
			http.Error(w, "Invalid alternate pairing key, must be an integer", http.StatusBadRequest)
			return
		}
		alternatePairings[intKey] = value
	}

	for i, v := range divisorPairing {
		if alternateValue, exists := alternatePairings[v.Number]; exists {
			divisorPairing[i].Value = alternateValue
		}
	}

	result := fizzBuzzIterator(numCollection, divisorPairing, alternatePairings)
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(result); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
}

func numbersToN(n int) []int {
	numbers := make([]int, n)
	for i := 1; i <= n; i++ {
		numbers[i-1] = i
	}
	return numbers
}

// fizzBuzzIterator generates a FizzBuzz sequence based on the provided numbers, divisors, and alternate pairings.
func fizzBuzzIterator(numbers []int, divisorPairing []FizzBuzzPairing, alternates AlternatePairingsInt) []string {

	finalSlice := []string{}

	if len(divisorPairing) > 2 {
		return []string{"Error: Too many divisor pairings provided"}
	}

	for _, nbr := range numbers {
		var str string

		if nbr%divisorPairing[0].Number == 0 && nbr%divisorPairing[1].Number == 0 {
			str = divisorPairing[0].Value + divisorPairing[1].Value
		} else if nbr%divisorPairing[0].Number == 0 {
			str = divisorPairing[0].Value
		} else if nbr%divisorPairing[1].Number == 0 {
			str = divisorPairing[1].Value
		} else {
			str = strconv.Itoa(nbr)
		}

		if alternateValue, exists := alternates[nbr]; exists {
			str = alternateValue
		}

		finalSlice = append(finalSlice, str)
	}

	return finalSlice
}
