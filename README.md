Condignum Coding Challenge
==========================

A implementation of the Condignum Coding Challange "Frage-Antwort App".

Author: Johannes Burk <me@jojoob.de>

## Run the app in development mode
Use docker-compose to spin up the development environment: `docker-compose up`. Then create/migrate the database: `docker-compose exec backend python manage.py migrate`

**You may want to use the sample database, see below.** Restart the container after copy of the sample database or copy the database before startup.

## Database with sample data
The file `backend/sample-db.sqlite3` within the backend directory contains sample data. To use it copy to `backend/cccquest_backend/db.sqlite3` and restart the backend container.

Django superuser:
* user: admin
* password: Blume123?

## Question/Answer Management
Management of questions and answers can be done with the Django admin interface.

### New superuser creation:
```
docker-compose exec backend python manage.py createsuperuser
```

## API Spec
See [OpenAPI Spec](api.yaml) or go to http://127.0.0.1:8000/apispec/ when backend app is running.
