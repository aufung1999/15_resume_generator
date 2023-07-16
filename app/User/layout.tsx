import Link from "next/link";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" flex flex-row border-2 border-yellow-300">
      <div className=" w-2/12 h-screen relative">
        <div className="h-full w-full flex flex-col justify-evenly border-4 border-red-300 absolute">
          {/* icon="id-number"  */}
          <Link href="/user/contact" className="border flex justify-center">
            <div className=" text-xs hover:text-sm">Contact</div>
          </Link>

          <Link href="/user/work" className="border flex justify-center">
            <div className=" text-xs hover:text-sm">Work</div>
          </Link>

          <Link href="/user/education" className="border flex justify-center">
            <div className=" text-xs hover:text-sm">Education</div>
          </Link>

          <Link href="/user/skills" className="border flex justify-center">
            <div className=" text-xs hover:text-sm">Skills</div>
          </Link>

          <Link href="/user/award" className="border flex justify-center">
            <div className=" text-xs hover:text-sm">Award</div>
          </Link>

          <Link href="/user/objective" className="border flex justify-center">
            <div className=" text-xs hover:text-sm">Objective</div>
          </Link>

          <Link href="/user/projects" className="border flex justify-center">
            <div className=" text-xs hover:text-sm">Project</div>
          </Link>

          {/* <Button icon="build" onClick={() => setTab("Work")}>
          <div className=" text-xs hover:text-sm">Work</div>
        </Button>

        <Button icon="learning" onClick={() => setTab("Education")}>
          <div className=" text-xs hover:text-sm">Education</div>
        </Button>

        <Button icon="star" onClick={() => setTab("Achievement")}>
          <div className=" text-xs hover:text-sm">Achievement</div>
        </Button>

        <Button icon="property" onClick={() => setTab("Skills")}>
          <div className=" text-xs hover:text-sm">Skills</div>
        </Button>

        <Button icon="flag" onClick={() => setTab("Objective")}>
          <div className=" text-xs hover:text-sm">Objective</div>
        </Button>

        <Button icon="application" onClick={() => setTab("Others")}>
          <div className=" text-xs hover:text-sm">Others</div>
        </Button> */}
        </div>
      </div>

      <div className=" w-full">{children}</div>
    </section>
  );
}
