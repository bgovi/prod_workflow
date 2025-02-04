# Run docker with
docker build -t pg_test .
docker run --name pg_testx --env-file dev_env -p 5432:5432 pg_test


Cant directly pass env files to Dockerfile using command line. Try using docker compose