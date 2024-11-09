package staticserver

import (
	"log"
	"net"

	"github.com/gin-gonic/gin"
)

func StartStatic(callback func()) {
	r := gin.Default()
	r.Static("/", "static")

	l, err := net.Listen("tcp", ":8889")
	if err != nil {
		log.Fatal(err)
	}

	go func() {
		log.Fatal(r.RunListener(l))
	}()

	callback()

	select {} // wait forever
}
