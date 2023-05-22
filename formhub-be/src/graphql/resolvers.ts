import GraphQLJSON from 'graphql-type-json';
import { GraphQLDateTime } from 'graphql-iso-date';
import db from '../modules/db';
import { enqueue } from '../modules/queue';
const resolvers = {
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
  Query: {
    submissions: () => {
      return db.submission.findMany({ orderBy: { submittedAt: 'desc' } });
    },
  },
  Mutation: {
    queueSubmissionGeneration: () => {
      enqueue('generateSubmissions');
    },
  },
};
export default resolvers;
