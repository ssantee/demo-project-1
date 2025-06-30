package fbz

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"reflect"
	"strings"
	"testing"
)

/*
* Why test the handler here when we tested the core logic only in
* fibonacci_test.go?
* This handler became substantially more complex than the fibonacci handler
* due to the number of options.
 */

func TestHandler(t *testing.T) {
	ts := []struct {
		name       string
		method     string
		body       string
		wantStatus int
		wantBody   []string
	}{
		{
			name:       "Valid POST with number only",
			method:     http.MethodPost,
			body:       `{"number":5}`,
			wantStatus: http.StatusOK,
			wantBody:   []string{"1", "2", "Fizz", "4", "Buzz"},
		},
		{
			name:       "Valid POST with number only",
			method:     http.MethodPost,
			body:       `{"number":15}`,
			wantStatus: http.StatusOK,
			wantBody:   []string{"1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"},
		},
		{
			name:       "Valid POST with custom divisors",
			method:     http.MethodPost,
			body:       `{"number":6, "fizzDivisor":2, "buzzDivisor":3}`,
			wantStatus: http.StatusOK,
			wantBody:   []string{"1", "Fizz", "Buzz", "Fizz", "5", "FizzBuzz"},
		},
		{
			name:       "Valid POST with existingCollection",
			method:     http.MethodPost,
			body:       `{"existingCollection":[2,3,4,5]}`,
			wantStatus: http.StatusOK,
			wantBody:   []string{"2", "Fizz", "4", "Buzz"},
		},
		{
			name:       "Valid POST with existingCollection and custom divisors",
			method:     http.MethodPost,
			body:       `{"existingCollection":[2,3,4,5], "fizzDivisor":2, "buzzDivisor":3}`,
			wantStatus: http.StatusOK,
			wantBody:   []string{"Fizz", "Buzz", "Fizz", "5"},
		},
		{
			name:       "Valid POST with and alternate pairings",
			method:     http.MethodPost,
			body:       `{"number":15, "alternatePairings":{"3":"Foo", "5":"Bar", "15":"FooBar"}}`,
			wantStatus: http.StatusOK,
			wantBody:   []string{"1", "2", "Foo", "4", "Bar", "Foo", "7", "8", "Foo", "Bar", "11", "Foo", "13", "14", "FooBar"},
		},
		{
			name:       "Invalid POST with no number",
			method:     http.MethodPost,
			body:       `{}`,
			wantStatus: http.StatusBadRequest,
			wantBody:   nil,
		},
		{
			name:       "Invalid POST with no number and empty existingCollection",
			method:     http.MethodPost,
			body:       `{"existingCollection":[]}`,
			wantStatus: http.StatusBadRequest,
			wantBody:   nil,
		},
		{
			name:       "Invalid alternate pairings",
			method:     http.MethodPost,
			body:       `{"number":15, "alternatePairings":{"a":"Foo", "b":"Bar"}}`,
			wantStatus: http.StatusBadRequest,
			wantBody:   nil,
		},
		{
			name:       "Invalid method GET",
			method:     http.MethodGet,
			body:       ``,
			wantStatus: http.StatusBadRequest,
			wantBody:   nil,
		},
	}

	for _, tc := range ts {
		t.Run(tc.name, func(t *testing.T) {
			req := httptest.NewRequest(tc.method, "/", strings.NewReader(tc.body))
			req.Header.Set("Content-Type", "application/json")
			rw := httptest.NewRecorder()
			Handler(rw, req)
			resp := rw.Result()
			defer resp.Body.Close()

			if resp.StatusCode != tc.wantStatus {
				t.Errorf("expected status %d, got %d", tc.wantStatus, resp.StatusCode)
			}

			if tc.wantStatus == http.StatusOK {
				var got []string
				if err := json.NewDecoder(resp.Body).Decode(&got); err != nil {
					t.Fatalf("error decoding response: %v", err)
				}
				if !reflect.DeepEqual(got, tc.wantBody) {
					t.Errorf("expected body %v, got %v", tc.wantBody, got)
				}
			}
		})
	}
}
