package utils

import (
	"os"
)

func GetVersion() (string, error) {
	f, err := os.ReadFile("version.md")

	if err != nil {
		return "", err
	}

	return string(f), nil
}