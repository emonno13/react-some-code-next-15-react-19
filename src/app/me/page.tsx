import { ProfileContent } from '@/app/me/profile-content';
import { getServerSideMe } from '@/services/server-api';

export default async function MePage() {
  const data = await getServerSideMe();
  console.log('🚀 ~ MePage ~ data:', data);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">My Profile</h1>
      <ProfileContent data={data} />
    </div>
  );
}
