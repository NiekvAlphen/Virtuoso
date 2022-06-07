FROM python:3
WORKDIR /userService
# Install dependencies:
COPY ./requirements.txt .

RUN apt-get update && apt-get install -y --no-install-recommends \
    unixodbc-dev \
    unixodbc \
    libpq-dev

RUN pip install -r requirements.txt

COPY . .

# Run the application:
CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0"]