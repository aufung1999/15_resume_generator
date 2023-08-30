export const SectionHeading = ({
  title,
  subtite,
}: {
  title: string;
  subtite?: string;
}) => {
  return (
    <div className="relative mb-2 text-base font-medium before:content-[''] before:w-full before:border-b before:border-black before:absolute before:-bottom-0.5">
      {title} <span className=" text-xs">{subtite}</span>
    </div>
  );
};
