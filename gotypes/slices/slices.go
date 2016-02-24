package main 

import (
	"fmt"
	"time"
)

func main() {
	// use arrays only when you don't need it to grow 
	var numbers [10]int		// array of fixed size 
	fmt.Println(numbers)	
	
	var months [12]string 
	// standard Go for loop 
	for idx := 0; idx < 12; idx++ {
		months[idx] = time.Month(idx+1).String()
		
	}
	// print all elements in array
	fmt.Println(months)
	// prints just a slice of the months array  [start_index:up_to]
	fmt.Println(months[1:2])	
	fmt.Println(months[1:4])
	// just month 5
	fmt.Println(months[5])
	// month 5 and upward 
	fmt.Println(months[5:])	
	// up to month 5
	fmt.Println(months[:5])
	
	// wrap with make to identify a capacity 
	// e.g., s := make([]string, 3)
	var dynoMonths []string;
	for idx := 0; idx < 12; idx++ {
		// append returns a new pointer value, so you must assign it
		// to make sure you are pointing at the new memory block
		dynoMonths = append(dynoMonths, time.Month(idx+1).String())
	}	
	fmt.Println(dynoMonths)
}