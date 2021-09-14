# Courses

## Run

Via Docker

Run the following commands:
``` bash
sudo cp ./.env.example ./.env
sudo docker-compose build
sudo docker-compose up -d
docker exec courses npm run migration:run
```

Api doc
[http://localhost:4000/api][link]

[link]: http://localhost:4000/api

## Generate courses, teachers and students test data

will generate 10 each time you run the command

Run the following command:
``` bash
docker exec courses npm run seed:run
```

All generated teacher has random emails and default password 123456