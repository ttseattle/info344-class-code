package person 

import (
	"fmt"
)

// putting Person at top means that Student has 
// all the same fields as Person plus whatever follows it
// how Go does INHERITANCE, but much more flexible
// not saying that Student is a Person, just that it 
// happens to have all the same fields so can be treated like a Person
type Student struct {
	Person 
	Major string
}

func (s *Student) Exclaim() {
	fmt.Println("My name is", s.Person.FirstName, s.Person.LastName, "and I love", s.Major, "!");
}