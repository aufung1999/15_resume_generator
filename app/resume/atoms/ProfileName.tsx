export const ProfileName = ({ name }: { name: string }) => {
  return (
    <h3
      className="text-2xl font-medium overflow-hidden overflow-ellipsis whitespace-nowrap border flex justify-center"
      title={name}
    >
      {name}
    </h3>
  );
};
