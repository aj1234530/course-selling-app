import ViewCourseContent from "@/components/User/ViewCourseContent";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <div>
      <ViewCourseContent id={slug} />
    </div>
  );
}
