package main

import (
	"fmt"
	"net/http"

	"santee.cloud/fbz"
	"santee.cloud/fib"
)

func main() {
	http.HandleFunc("/api/fib/handler", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Fibonacci handler called")
		fib.Handler(w, r)
	})
	http.HandleFunc("/api/fbz/handler", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("FizzBuzz handler called")
		fbz.Handler(w, r)
	})
	fmt.Println("Server running at http://localhost:3001/")
	http.ListenAndServe(":3001", nil)
}
