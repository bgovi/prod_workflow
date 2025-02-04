# Use the official PostgreSQL image as the base
FROM postgres:14

# Set environment variables for the PostgreSQL container

# Copy your custom initialization SQL script to the appropriate folder
COPY ./init.sql /docker-entrypoint-initdb.d/

# Optionally, you can add custom PostgreSQL configuration (e.g., pg_hba.conf, postgresql.conf)
# COPY ./path/to/custom_postgresql.conf /etc/postgresql/postgresql.conf

# Expose PostgreSQL port
EXPOSE 5432