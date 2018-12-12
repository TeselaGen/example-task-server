docker stop postgres
docker rm postgres
docker run --name postgres -e POSTGRES_PASSWORD=Teselagen123 -p 5432:5432 -d postgres:9.6