[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/B9F4RYVR)

![DevOps CI Badge](https://github.com/avans-devops/avans-devops-2324-kevinkatja/actions/workflows/node.js.yml/badge.svg)

Week 3 - Docker Notes
=====================
Start by building your image:
- docker build . -t <name> , note: this `.` (Dot) indicates to use the development docker file, not the production, if you want to use the production docker file, type `dockerfile.prod`

Create a network so you can link the database with the application
- docker network create <name>

Afterward run your mongodb database instance and application and link them both to the just created network
- docker run -d --name <name> --network <network_name> mongo
- docker run -p 3000:3000 --mount type=bind,source="$(pwd)",target=/app --network <network_name> <image_name>

Week 4 - Docker Notes
=====================
Run the docker contain by running
- `docker-compose up`

Stop the docker container by running
- `docker-compose down`