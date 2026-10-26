import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Meta } from "@/components/craftease/prototype";
export const Route = createFileRoute("/employee/$screen")({ head: ({ params }) => Meta(params.screen.replaceAll("-", " "), "Store employee screen in the CraftEase prototype."), component: EmployeeRoute });
function EmployeeRoute(){ const { screen } = Route.useParams(); return <AppShell role="employee" screen={screen}/>; }
