package utils

import "github.com/google/uuid"

func IsValidUUID(id uuid.UUID) bool {
	return id.String() != "00000000-0000-0000-0000-000000000000"
}