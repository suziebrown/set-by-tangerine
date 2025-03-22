# Set by Tangerine

Web app hosting puzzles and games by Tangerine.

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## How to run locally

- Database: run `./start-database.sh` to spin up the dev database in Docker
- Blob storage: points at the production blob!
- Client: run `npm run dev` to start up the client at http://localhost:3000/
- Tests: `npm run test`

## How to edit the data schema

1. Make changes to schema.prisma
2. Run `npm run db:generate` to generate a SQL migration capturing the changes
3. Run `npm run postinstall` to drop and reseed the static data (this won't be a post-install step forever, but it is for now!)
4. Restart the `npm run dev` process if it's running
