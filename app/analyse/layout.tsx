export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full flex flex-row border-2 border-yellow-300">
      {children}
    </section>
  );
}
