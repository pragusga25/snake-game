import { prisma } from '@/lib/prisma';
import { Kajian } from '@prisma/client';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET() {
  const valFromCache = (await redis.get('kajians')) as Kajian[] | null;

  if (valFromCache) {
    console.log('CACHE HIT');
    return Response.json({
      message: 'Success',
      result: valFromCache,
    });
  }
  console.log('CACHE MISS');

  const now = new Date();
  now.setHours(now.getHours() - 4);

  const kajians = await prisma.kajian.findMany({
    where: {
      time: {
        gte: now,
      },
    },
    orderBy: {
      time: 'asc',
    },
    select: {
      id: true,
      title: true,
      location: true,
      time: true,
      speakers: true,
      gmapLocation: true,
      sourceLink: true,
      search: true,
      lat: true,
      lng: true,
    },
  });

  await redis.set('kajians', kajians, {
    ex: 60 * 20,
  });

  return Response.json({
    message: 'Success',
    result: kajians,
  });
}
