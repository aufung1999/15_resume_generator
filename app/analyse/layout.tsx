export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full flex flex-row border-2 border-yellow-300">
      <div className=" w-6/12 border-4 border-blue-300">{children}</div>
      <div className=" flex flex-col justify-evenly w-6/12 border-4 border-red-300"></div>
    </section>
  );
}
