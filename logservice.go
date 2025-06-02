package main

import (
	"fmt"
	"math/rand"
)

type LogService struct{}

func (s *LogService) Greet(name string) string {
	greetings := []string{"Hello", "Hi", "Hey", "Greetings", "Salutations", "Welcome", "Welcome to Steganographix"}
	greeting := greetings[rand.Intn(len(greetings))]
	return greeting + " " + name + "!"
}

func (s *LogService) Log(output string) {
	fmt.Println("Hello world")
	fmt.Println("[Steganographix]", output)
}
