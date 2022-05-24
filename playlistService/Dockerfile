FROM python:3
WORKDIR /playlistService
# Install dependencies:
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# Run the application:
CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0"]