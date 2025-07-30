package main

import (
	"backend/config"
	"backend/db"
	"backend/web"
)

func main() {

	config.Init()

	db.Init()

	// go tcp.Receive()

	go web.Run()

	select {}
}
