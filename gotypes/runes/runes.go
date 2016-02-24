package main

import (
	"fmt"
)

func main() {
	s := "Hello World!"
	s2 := "Hello, 世界"
	
	// Gives series of indexes and byte values 
	// first get index of string, then get actual rune
	for idx, r := range s {
		fmt.Println(idx, r)		// take multiple args --> print one after the other
	}
	
	// String rapper around rune translates rune back into actual Unicode 
	// Can translate Asian characters too
	for idx, r := range s2 {
		fmt.Println(idx, string(r))		// take multiple args --> print one after the other
	}
}