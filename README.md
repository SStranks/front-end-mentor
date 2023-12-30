# front-end-mentor

FrontEndMentor Projects/Challenges - MonoRepo

## Structure

TBC

## Scripts

- Run script in app folder, from root: `pnpm --filter <PACKAGE NAME> run start`
  - e.g `pnpm --filter @apps/audiophile-client run start`
- For development:
  - docker-compose.override currently maps the entire root node_modules into the container; couldn't figure out a cleaner or functional way as of yet: see github question awaiting answer: xxxx

#### Testing

- Run one app: `pnpm jest --selectedProjects <displayName>`
