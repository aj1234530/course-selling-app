import ManageACourse from "@/components/admin/ManageACourse";
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  console.log(id);
  return <div>{<ManageACourse id={id} />}</div>;
}
