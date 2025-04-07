type ProfileData = {
  name: string;
  age: number;
};

type ProfileContentProps = {
  data: ProfileData;
};

export function ProfileContent({ data }: ProfileContentProps) {
  return (
    <div className="rounded bg-white p-4 shadow">
      <h2 className="mb-2 text-xl font-semibold">User Information</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Name:</span> {data?.name}
        </p>
        <p>
          <span className="font-medium">Age:</span> {data?.age}
        </p>
      </div>
    </div>
  );
}
