import ManageACourse from "@/components/admin/ManageACourse";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return <div>{<ManageACourse id={slug} />}</div>;
}
