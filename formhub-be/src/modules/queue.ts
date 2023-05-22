import { Queue, Worker } from 'bullmq';

const QUEUE_NAME = 'default';
export const queue = new Queue(QUEUE_NAME);

const worker = new Worker(QUEUE_NAME, async (job) => {
  if (job.name === 'generateSubmissions') {
    console.log('Generating submissions...');
  }
});
type JobName = 'generateSubmissions';

export const enqueue = async (job: JobName, data?: any) => {
  await queue.add(job, data);
};
