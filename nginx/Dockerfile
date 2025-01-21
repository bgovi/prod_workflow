# Use the official OpenResty image (includes Nginx with Lua)
FROM openresty/openresty:alpine

# Copy your custom nginx.conf into the container
# COPY nginx/nginx.conf /etc/nginx/nginx.conf

# COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./conf.d /etc/nginx/conf.d
COPY ./lua/ /etc/nginx/lua/


# Expose the Nginx port
EXPOSE 80

# Start Nginx with OpenResty
CMD ["openresty", "-g", "daemon off;"]