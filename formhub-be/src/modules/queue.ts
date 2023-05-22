import { Queue, Worker } from 'bullmq';

const QUEUE_NAME = 'default';

// gut check
if (!process.env.REDIS_HOST) console.warn('REDIS_HOST is not defined');
const connection = {
  host: process.env.REDIS_HOST,
};
export const queue = new Queue(QUEUE_NAME, { connection });

const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    if (job.name === 'generateSubmissions') {
      console.log('Generating submissions...');
    }
  },
  { connection }
);
type JobName = 'generateSubmissions';

export const enqueue = async (job: JobName, data?: any) => {
  await queue.add(job, data);
};
