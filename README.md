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
- ✅ Redis
- ✅ GraphQL
- ✅ Codegen config (NEW)
- ✅ Apollo Server v4 (NEW)
- ✅ pnpm
- Render

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
