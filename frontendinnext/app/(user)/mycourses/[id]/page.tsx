import ViewCourseContent from "@/components/User/ViewCourseContent";
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  console.log(id);
  return <div>{<ViewCourseContent id={id} />}</div>;
}
