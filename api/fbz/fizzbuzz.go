package fbz

import (
	"strconv"
)

// fizzBuzz generates a slice of strings representing the FizzBuzz sequence
// Sourced from the best-performing (time) solution on LeetCode
// https://leetcode.com/problems/fizz-buzz/solutions/6658732/simplest-remainder-approach-0-ms-beats-100-00-5-82-mb-beats-30-38
func fizzBuzz(n int) []string {
	finalSlice := []string{}

	for idx := 1; idx <= n; idx++ {
		var str string
		if idx%3 == 0 && idx%5 == 0 {
			str = "FizzBuzz"
		} else if idx%3 == 0 {
			str = "Fizz"
		} else if idx%5 == 0 {
			str = "Buzz"
		} else {
			str = strconv.Itoa(idx)
		}
		finalSlice = append(finalSlice, str)
	}

	return finalSlice
}
