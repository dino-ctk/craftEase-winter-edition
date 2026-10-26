import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Meta } from "@/components/craftease/prototype";
export const Route = createFileRoute("/user/$screen")({ head: ({ params }) => Meta(params.screen.replaceAll("-", " "), "Platform user screen in the CraftEase prototype."), component: UserRoute });
function UserRoute(){ const { screen } = Route.useParams(); return <AppShell role="user" screen={screen}/>; }
