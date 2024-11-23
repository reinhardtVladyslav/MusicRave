# MusicRave

## Запуск Django

- install requirement project's packages (pip install -r requirements.txt)
- make migrations (python manage.py migrate)
- run server (python manage.py runserver)

#### DB settings

for use local DB create file `backend/musicrave/local_settings.py` file and put this code there with your connection data

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```
