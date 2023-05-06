BetterSocial Test

how to run:
- clone this repository
- run `npm install`
- copy file .env.example `cp .env.example .env`
- run `docker-compose --env-file .env up -d` for database
- run `npx sequelize-cli db:create`
- run `npx sequelize-cli db:migrate`
- run `npm run dev`
- go to your project path `/api-docs` ex: `localhost:3000/api-docs`