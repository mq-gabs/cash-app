package utils

import (
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

var jwtHashKey = []byte("Fkaiocj0i102jck9qjc0")

func JwtGenerateToken(userId string, isAdmin bool) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"UserID":    userId,
		"ExpiresAt": time.Now().Add(time.Hour * 10),
		"IsAdmin":   isAdmin,
	})

	tokenString, err := token.SignedString(jwtHashKey)

	return tokenString, err
}

type TokenOptions struct {
	ExpiresAt time.Time
	UserID    string
	IsAdmin   bool
	jwt.MapClaims
}

func (to TokenOptions) Expired() bool {
	return time.Now().After(to.ExpiresAt)
}

func JwtIsInvalid(tokenString string, isAdmin bool) (bool, error) {
	to := &TokenOptions{}

	_, err := jwt.ParseWithClaims(tokenString, to, func(t *jwt.Token) (interface{}, error) {
		return jwtHashKey, nil
	})

	if err != nil {
		return true, err
	}

	if isAdmin && !to.IsAdmin {
		return true, nil
	}

	return to.Expired(), nil
}

type HttpHeader struct {
	Authorization string `json:"Authorization"`
}

func JwtAuthMiddleware(isAdmin bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		h := &HttpHeader{}

		if err := c.BindHeader(h); err != nil {
			RespErrorBind(c, err)
			c.Abort()
			return
		}

		tokenString := strings.Split(h.Authorization, " ")[1]

		isInvalid, err := JwtIsInvalid(tokenString, isAdmin)

		if err != nil {
			RespErrorBind(c, err)
			c.Abort()
			return
		}

		if isInvalid {
			RespUnauthorized(c)
			c.Abort()
			return
		}

		c.Next()
	}
}
