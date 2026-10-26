import { createFileRoute } from "@tanstack/react-router";
import { Meta, PublicProjectDetail, findProject } from "@/components/craftease/prototype";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => { const p = findProject(params.slug); return Meta(p.title, `${p.description} Step-by-step tutorial, community builds and linked products.`); },
  component: ProjectRoute,
});
function ProjectRoute() { const { slug } = Route.useParams(); return <PublicProjectDetail slug={slug} />; }
