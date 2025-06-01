package main

import (
	"math/rand"
)

type SteganographyService struct{}

func (s *SteganographyService) Greet(name string) string {
	greetings := []string{"Hello", "Hi", "Hey", "Greetings", "Salutations", "Welcome", "Welcome to Steganographix"}
	greeting := greetings[rand.Intn(len(greetings))]
	return greeting + " " + name + "!"
}

func (s *SteganographyService) ExtractLSB(imageData []byte, width int, height int) []byte {
	var extractedBytes []byte
	var currentByte byte
	var count int

	for _, b := range imageData {
		// Get the 2 LSBs
		twoBits := b & 0x03
		// Shift into position
		currentByte = (currentByte << 2) | twoBits
		count++
		if count == 4 {
			extractedBytes = append(extractedBytes, currentByte)
			currentByte = 0
			count = 0
		}
	}

	// If there are leftover bits, pad them on the right
	if count > 0 {
		currentByte = currentByte << (2 * (4 - count))
		extractedBytes = append(extractedBytes, currentByte)
	}

	return extractedBytes
}
