# Employee Resgister Formhub

**Project is building from 2023 May, using new doc of Apollo server 4 for graphql server**

## ✨ Tech Stack

- ✅ Docker
- ✅ TypeScript
- ✅ React
- ✅ Vite
- ✅ MUI X - Data Grid
- ✅ Node.js
- ✅ Express
- ✅ PostgreSQL
- ✅ Prisma
- ✅ Knex
- ✅ GraphQL
- ✅ Codegen config (NEW)
- ✅ Apollo Server v4 (NEW)
- ✅ Redis
- ✅ faker js
- ✅ pnpm
- Build monorepo with [Turbo Build](https://turbo.build/)
- Deploy to Render

## 🎃 Getting Started

> Just heard, cool kids using pnpm 👦, so let's try it out in this project. Hope it works well. 🤞

`formhub-be` is backend setting, all pnpm setting and docker setting are in Package.json, scripts section.

### 🚀 How to run

For now, start backend

```bash
pnpm rebuild:be
```

### 📝 Working Notes

1. If you want to check my backend working notes, see [**HERE**](https://github.com/yanliu1111/docker-types-node-postgres-app), data model changed and schema.prisma changed, but the basic idea is the same, need to rebuild prisma client after schema changed, and rebuild backend service.
2. **Apollo** Server is used for GraphQL server
   Check doc `appolo-server-express` [**HERE**](https://www.apollographql.com/docs/apollo-server/migration/#migrate-from-apollo-server-express)

### Huge trouble shooting for 2 days, beacuse of Apollo Server update doc from 3 to 4, many refence are not working.

Check some changes in src/index.ts, and 2 files in graphql folder

Also `tsconfig.json` have main changes.

```json
{
  "compilerOptions": {
    "types": ["node"],
    "typeRoots": ["@types", "node_modules/@types"],
    "lib": ["ESNext"],
    "outDir": "dist"
  },
  "include": ["./src", "./scripts"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

Also, be ware in this process, any changes
You need to rebuild backend service, and create new prisma client and table in database, also need to seeding the data inside.
The details of scripts are in `package.json`

```bash
pnpm rebuild:be
pnpm docker:db:migrate
pnpm seed:dev
```

### 🔔 **3. GraphQL Code Generator**

GraphQL is a type system you get a typed set of data back. right now our query is kind of this string and its loading it into this data object which it doesn’t know what type it is.

So lets use a generator to generate for real types of submissions.

Use `graphql codegen` generate types:

graphql code generator will be able to query our backend introspect our schema that we’ve defined on our backend and generate the proper typescript types for returns our query.

`npm install -D @graphql-codegen/cli`

`npx graphql-code-generator init`

`npm install @graphql-codegen/typescript-operations`

`npm run build:types`

As you noticed, I used npm for frontend, and pnpm for backend. 🤷‍♀️

### 🔔 **4. Codegen ts config setting**

Use `graphql codegen` generate types:

graphql code generator will be able to query our backend introspect our schema that we’ve defined on our backend and generate the proper typescript types for returns our query.

Run the following bash to star codegen

```Bash
npm install -D @graphql-codegen/cli

npx graphql-code-generator init

npm install @graphql-codegen/typescript-operations

npm run build:types
```

**📘 codegen.ts config file, don’t need any plugin, and add document path. This is for new codegen version!**

```ts
const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5000/graphql",
  documents: ["src/**/*.tsx"],
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
      config: {
        withHooks: true,
      },
    },
  },
};
```

So now I can pull the data from backend, via graphQL, pip it into the table, figure out dynamic table we want to display here. It works ! 🎉

📘 I figured out the codegen for days, include read new versions documents and checked the issues from stackoverflow. Here is one question when I did rabbit hole reading, and talked with some developer expert. Here is my blog [LINK](https://www.yancodeblog.codes/).<br > CHECK: `Best answer I got why we need to maintain migration files` if you have same question.

### 5. MUI- Data Grid

There are some new code I learned from MUI data grid.

```ts
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "submittedAt", headerName: "Submitted At", width: 200 },
  ...uniq(submissions.flatMap((s) => Object.keys(s.data))).map((field) => ({
    field,
    headerName: startCase(field),
    width: 200,
    valueGetter: (params: GridValueGetterParams) => params.row.data[field],
  })),
];
```

### 6. Test Queue the job

1 - Create a mutation type in `schema.ts`

```ts
 type Mutation {
        queueSubmissionGeneration: Boolean!
    }
```

2 - Excute the mutation in `resolver.ts`
the job is called `generateSubmissions`

```ts
Mutation: {
    queueSubmissionGeneration: async () => {
      await enqueue('generateSubmissions');
    },
  },
```

3 When the job runs, then worker in queue.ts

```ts
const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    if (job.name === "generateSubmissions") {
      console.log("Generating submissions...");
    }
  },
  { connection }
);
```

I would get console log `Generating submissions...` in terminal. After test through all, I start to generate the real submission. After testing worked, I changed the code in `queue.ts` `schema.ts` `resolver.ts` to the real code. Set `count` to generate 5 submissions at one time.

## 📝 Work flow

The button (in frontend page) is excuting the mutation on the backend,that is generating a job `bullmq` queue which is stored in redis, which is running in docker container, which is organized by docker compose, which then gets run in back-end `worker`, which then used `faker.js` to generate submission (fake data), then use `prisma` to push that into Postgres which is also in docker. And then via graphql, we can query that data in the front-end in the data grid.

run frontend `npm run dev`

run backend `docker compose up`

👉 Next step, I will start to build monorepo and update dockerfile and docker compose file. Rebuild the structure of backend and frontend and dockerfile and docker compose file. Check [**New Repo**](https://github.com/yanliu1111/monorepo-docker-fullstack-app) which is only for studying monorepo building and deploy.

✅ This repo is for studying docker, docker compose for full stack app. Hope it helps your study. 🤞
