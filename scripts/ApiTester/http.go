package main

import (
	"fmt"
	"net/http"

	"santee.cloud/fbz"
	"santee.cloud/fib"
)

func main() {
	http.HandleFunc("/api/fib/handler", fib.Handler)
	http.HandleFunc("/api/fbz/handler", fbz.Handler)
	fmt.Println("Server running at http://localhost:3001/")
	http.ListenAndServe(":3001", nil)
}
