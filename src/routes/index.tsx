import { createFileRoute } from "@tanstack/react-router";
import { Meta, PublicDiscover } from "@/components/craftease/prototype";

export const Route = createFileRoute("/")({
  head: () => Meta("Discover DIY projects", "Browse practical DIY projects, categories and step-by-step tutorials on CraftEase."),
  component: PublicDiscover,
});
