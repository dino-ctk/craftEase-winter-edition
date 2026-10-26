import { createFileRoute } from "@tanstack/react-router";
import { Meta, PublicPage } from "@/components/craftease/prototype";
export const Route = createFileRoute("/register")({ head: () => Meta("Register", "Prototype account registration for CraftEase."), component: () => <PublicPage mode="register" /> });
