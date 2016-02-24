package main 

import (
	"fmt"
	"github.com/ttseattle/info344-class-code/gotypes/structs/person"
)

func main() {
	p := person.Person { FirstName: "Tisha", LastName: "Trongtham" }
	p.FirstName = "Dr"
	person.SayHello(&p)
	
	p2 := person.NewPerson("Zsa", "Zsa")
	person.SayHello(p2);
	p2.SayHi()
	
	p3 := person.NewPerson("Harry", "Potter")
	s := person.Student { Person: *p3, Major: "Defense Against the Dark Arts"}
	s.Exclaim()

	fmt.Println(p)
	fmt.Printf("%+v\n", p)
}