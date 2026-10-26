import { createFileRoute } from "@tanstack/react-router";
import { Meta, PublicPage } from "@/components/craftease/prototype";

export const Route = createFileRoute("/login")({
  head: () => Meta("Log in", "Choose a demo role and enter the CraftEase prototype."),
  component: () => <PublicPage mode="login" />,
});
