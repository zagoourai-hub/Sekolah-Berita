import { PortalHome } from "@/components/portal-home";
import { getHomeData } from "@/services/public-api";

export default async function Home() {
  const data = await getHomeData();
  return <PortalHome data={data} />;
}
