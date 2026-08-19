import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/home.html?raw";

export const Route = createFileRoute("/home")({
  server: {
    handlers: {
      GET: () =>
        new Response(html, {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
