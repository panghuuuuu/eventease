FROM python:3.10-slim-buster
WORKDIR /app
COPY requirements.txt .


# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the Django default port
EXPOSE 8080

# Collect static files
RUN python manage.py collectstatic --no-input
CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]
