package person 
// package that is not an executable in its own right is a library

import (
	"fmt"
)

// export things to be used elsewhere by capitalizing!

type Person struct {
	FirstName string 
	LastName string
} // export and use elsewhere by capitalizing 
// struct is a well defined data structured
// can't just add stuff to it like a JS object, which is actually a map!

// function which returns a pointer to a Person object
// like a Java constructor! 
// has no new keyword, so by convention write constructors starting with New
func NewPerson(first string, last string) *Person {
	return &Person{ FirstName: first, LastName: last }
}

func SayHello(p *Person) {
	fmt.Println("Hello ", p.FirstName, p.LastName);
}

// will act as a if it a method of Person 
// says that the function SayHi can be invoked on any variable of type *Person 
// used to mimic an Object Oriented language 
func (p *Person) SayHi() {
	fmt.Println("Hi ", p.FirstName, p.LastName);
}