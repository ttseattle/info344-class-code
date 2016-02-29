package main 

import (
	"net/http"
	"fmt"
	"time"
	"encoding/json"
	"log"
	"runtime"
)

// HelloResponse represents a responsive from the hello route 
// JSON will only work if fields are public, exported from the model
// In Go, exports must be capitalized 
type HelloResponse struct {
	Name string `json:"name"`	// allows to specify a different name in JSON while still importing 
	Message string `json:"message"`
	GeneratedAt time.Time `json:"generatedAt"`
	foo int 	// lowercase data is private!!
}

var memstats = new(runtime.MemStats)

func getMemStats(w http.ResponseWriter, r *http.Request) {
	// whole memstats structure 
	runtime.ReadMemStats(memstats)
	
	// map of only things we care about
	// better style to declare structure and use structure  
	allocstats := make(map[string]uint64)
	allocstats["alloc"] = memstats.Alloc 
	allocstats["totalAlloc"] = memstats.TotalAlloc 
	
	j, err := json.Marshal(allocstats)
	if nil != err {
		log.Println(err)
		w.WriteHeader(500)	
		w.Write([]byte(err.Error()))
	} else {
		w.Header().Add("Content-Type", "application/json")	
		w.Write(j)
	}
}

func sayHello(w http.ResponseWriter, r *http.Request) {
	//using slice syntax to take the url path and starts past this 
	// character pattern, and give rest of string beyond it
	name := r.URL.Path[len("/api/v1/hello/"):]	
	resp := HelloResponse { Name: name, 
			Message: "Hello " + name,
			GeneratedAt: time.Now() }
	
	// writing simple string 
	// w.Write([]byte("Hello " + name))
	
	// marshall into JSON 
	// jsonMarshal can also be used with strings, maps, etx.   
	j, err := json.Marshal(resp)
	if nil != err {
		log.Println(err)
		w.WriteHeader(500)	// allows you to write HTTP status code 
		w.Write([]byte(err.Error()))
	} else {
		// client then knows we are sending json instead of just plain text 
		// if Angular sees json, they will automatically parse it for you 
		w.Header().Add("Content-Type", "application/json")	// allows to add header to response 
		w.Write(j)
	}
}

func main() {
	//http.HandleFunc("/", sayHello)
	
	// serve static files that match this relative resource path
	// Handle expects the 2nd arg to be of type Handler, more complex 
	http.Handle("/", http.FileServer(http.Dir("./static")))
	// HandleFunc expects the 2nd arg to be a Go method
	// add slash at end of path so that anything starting with this path will bind to this file 	
	http.HandleFunc("/api/v1/hello/", sayHello)	
	http.HandleFunc("/api/v1/memstats/", getMemStats)
	
	fmt.Println("Server listening on port 9000...")
	http.ListenAndServe(":9000", nil)	// Go won't continue after this line 
	// listens on default IP address 
}