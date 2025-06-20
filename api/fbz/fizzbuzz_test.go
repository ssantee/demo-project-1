package fbz

import (
	"reflect"
	"testing"
)

func TestFizzBuzz(t *testing.T) {
	tests := []struct {
		n        int
		expected []string
	}{
		{1, []string{"1"}},
		{3, []string{"1", "2", "Fizz"}},
		{5, []string{"1", "2", "Fizz", "4", "Buzz"}},
		{15, []string{"1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"}},
		{0, []string{}},
	}

	for _, tt := range tests {
		result := fizzBuzz(tt.n)
		if !reflect.DeepEqual(result, tt.expected) {
			t.Errorf("fizzBuzz(%d) = %v, want %v", tt.n, result, tt.expected)
		}
	}
}
