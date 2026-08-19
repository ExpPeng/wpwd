import { createFileRoute } from "@tanstack/react-router";

// "/" -> "/home"
export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () => new Response(null, { status: 302, headers: { location: "/home" } }),
    },
  },
});
