import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import ProfileModal from "./ProfileModal";

const StaffProfile = () => {
  const team = useQuery(api.teamMembers.getTeam);

  if (!team)
    return (
      <p className='text-center italic py-8 animate-pulse'>Loading team...</p>
    );

  const { director, staff } = team;

  return (
    <section className='w-full py-10 max-w-6xl mx-auto'>
      <div className='flex flex-col md:flex-row justify-between gap-6'>
        <div className='w-full md:max-w-[35%]'>
          {director?.imageUrl && (
            <div className='flex flex-col justify-center items-center bg-white dark:bg-gray-700 rounded-xl shadow-md pt-4 px-6'>
              <div className='relative w-full sm:max-w-sm aspect-square'>
                <Image
                  src={director.imageUrl}
                  alt={director.name}
                  fill
                  className='object-cover rounded-full'
                  priority
                />
              </div>

              {/* Info */}
              <div className='flex flex-col justify-center px-6 pt-1 pb-4 text-center'>
                <h3 className='text-lg font-medium'>{director.name}</h3>
                <p className='mb-2 text-gray-600 dark:text-gray-300'>
                  {director.position}
                </p>
                <ProfileModal
                  name={director.name}
                  imageUrl={director.imageUrl}
                  position={director.position}
                  email={director.email}
                  profile={director.profile}
                />
              </div>
            </div>
          )}
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
          {staff.map((member) => (
            <div
              key={member._id}
              className='flex flex-col justify-center items-center py-2 px-2 bg-white dark:bg-gray-700 rounded-xl shadow-md'>
              {member?.imageUrl && (
                <div className=' '>
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={120}
                    height={120}
                    className='object-cover aspect-square rounded-full'
                    priority
                  />
                </div>
              )}

              {/* Info */}
              <div className='flex flex-col justify-center px-3 pt-1 pb-2 text-center '>
                <h3 className='font-medium'>{member.name}</h3>
                <p className='mb-2 text-gray-600 dark:text-gray-300'>
                  {member.position}
                </p>
                <ProfileModal
                  name={member.name}
                  imageUrl={member.imageUrl}
                  position={member.position}
                  email={member.email}
                  profile={member.profile}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaffProfile;
