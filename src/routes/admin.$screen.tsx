import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Meta } from "@/components/craftease/prototype";
export const Route = createFileRoute("/admin/$screen")({ head: ({ params }) => Meta(params.screen.replaceAll("-", " "), "Administrator screen in the CraftEase prototype."), component: AdminRoute });
function AdminRoute(){ const { screen } = Route.useParams(); return <AppShell role="admin" screen={screen}/>; }
