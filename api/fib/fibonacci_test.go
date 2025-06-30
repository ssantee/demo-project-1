package fib

import (
	"fmt"
	"reflect"
	"testing"
)

func TestFibonacci(t *testing.T) {
	tests := []struct {
		n        int
		startX   int
		startY   int
		expected []int
	}{
		{0, 0, 1, []int{0}},
		{1, 0, 1, []int{0, 1, 1}},
		{2, 0, 1, []int{0, 1, 1, 2}},
		{3, 0, 1, []int{0, 1, 1, 2, 3}},
		{4, 0, 1, []int{0, 1, 1, 2, 3}},
		{5, 0, 1, []int{0, 1, 1, 2, 3, 5}},
		{6, 0, 1, []int{0, 1, 1, 2, 3, 5}},
		{7, 0, 1, []int{0, 1, 1, 2, 3, 5}},
		{8, 0, 1, []int{0, 1, 1, 2, 3, 5, 8}},
		{8, 2, 3, []int{2, 3, 5, 8}},
		{500, 2, 3, []int{2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377}},
		{1000000, 0, 1, []int{0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040}},
		{1000000, 5, 8, []int{5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040}},
		{50, 3, 4, []int{3, 4, 7, 11, 18, 29, 47}},
	}

	for _, tt := range tests {
		t.Run(fmt.Sprintf("Fibonacci(%d, %d, %d)", tt.n, tt.startX, tt.startY), func(t *testing.T) {
			result, _ := fibonacci(tt.n, tt.startX, tt.startY)
			if !reflect.DeepEqual(result, tt.expected) {
				t.Errorf("expected %v, got %v", tt.expected, result)
			}
		})
	}
}
