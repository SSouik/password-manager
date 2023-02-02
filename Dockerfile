# Create a base layer that installs things needed for local and production servers
FROM node:16.14.2-buster-slim as base

# Set up working directory
# This is the directory that commands and code will be excuted and live in
WORKDIR /app

RUN apt-get update && apt-get -y upgrade && apt-get clean

###########
#   DEV   #
###########
# Dev/local layer meant to be used when testing locally
# This should only include things necessary for local testing
FROM base as dev

# Run nodemon, this will start the API and UI server and watch for file changes
# and automatically restart the server with the changes
CMD ["yarn", "nodemon"]

#############
#   CLOUD   #
#############
# Cloud/prod layer meant to be used when deploying the app to production
# or somewhere other than you local machine
FROM base as cloud

# Copy all files in the current working directory on the local machine
# into the working directory on the docker image (/app)
# This will copy everything, but a .dockerignore can be used to ignore files that are not
# needed in production (examples: node modules (will install later), CI files, build files, jest configs, docker files, etc)
COPY . .

# Install dependencies
RUN yarn

RUN yarn build:prod

# Matches the port that the server is running on. Check main.ts in the API project
EXPOSE 3333

# Start the production server from the built code
CMD ["node", "dist/password-manager-api/main.js"]
