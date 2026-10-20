export function getGoFiberTemplate(projectName: string) {
  return [
    {
      path: 'go.mod',
      content: `module ${projectName}\n\ngo 1.22\n`
    },
    {
      path: 'main.go',
      content: `package main

import (
    "log"
    "github.com/gofiber/fiber/v2"
)

func main() {
    app := fiber.New()

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Zap! Go Fiber API is running.")
    })

    log.Fatal(app.Listen(":3000"))
}`
    }
  ];
}