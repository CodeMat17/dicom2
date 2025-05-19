import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const milestoneDetails = {
  "debate-championship-2023": {
    title: "International Debate Championship 2023",
    description: "Detailed description of the event...",
    photos: ["/images/debate1.jpg", "/images/debate2.jpg"],
    achievements: ["1st Place Overall", "Best Speaker Award"],
    date: "March 15-18, 2023",
  },
  // ... other milestone details
};

export default function MilestonePage({
  params,
}: {
  params: { slug: string };
}) {
  const data = milestoneDetails[params.slug as keyof typeof milestoneDetails];

  if (!data) return notFound();

  return (
    <div className='max-w-4xl mx-auto py-12 px-4'>
      <h1 className='text-3xl font-bold mb-6'>{data.title}</h1>

      <div className='grid md:grid-cols-2 gap-8 mb-8'>
        <div>
          <p className='text-gray-600 mb-4'>{data.description}</p>
          <div className='space-y-2'>
            <p className='font-medium'>
              Date: <span className='text-gray-600'>{data.date}</span>
            </p>
            <div>
              <p className='font-medium mb-1'>Achievements:</p>
              <ul className='list-disc pl-5 space-y-1 text-gray-600'>
                {data.achievements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          {data.photos.map((photo, i) => (
            <div
              key={i}
              className='aspect-square relative rounded-lg overflow-hidden'>
              <Image
                src={photo}
                alt={`${data.title} photo ${i + 1}`}
                fill
                className='object-cover'
              />
            </div>
          ))}
        </div>
      </div>

      <Link
        href='/achievements'
        className='inline-flex items-center gap-1 text-primary font-medium'>
        ← Back to Achievements
      </Link>
    </div>
  );
}
