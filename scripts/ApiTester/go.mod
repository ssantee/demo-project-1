module santee.cloud/apitester

require (
	santee.cloud/fbz v0.0.0
	santee.cloud/fib v0.0.0
)

// Replace with your actual module path
replace santee.cloud/fbz => ../../api/fbz

replace santee.cloud/fib => ../../api/fib

go 1.23.1
