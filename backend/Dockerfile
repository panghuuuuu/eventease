FROM python:3.10-slim-buster
WORKDIR /app
COPY requirements.txt .

# Set the environment variable for the port
ENV PORT 8080

# Use the Django management command to run the server on the specified port
CMD ["python", "manage.py", "runserver", "0.0.0.0:$PORT"]

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the Django default port
EXPOSE 8080

# Collect static files
RUN python manage.py collectstatic --no-input
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
