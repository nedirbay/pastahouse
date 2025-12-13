# Backend - PastaHouse E-commerce

## Overview
This is the Django backend for the PastaHouse e-commerce application.

## Recent Security Update
We've removed django-ckeditor due to security concerns with CKEditor 4.22.1. The warning you saw was:

```
WARNINGS:
?: (ckeditor.W001) django-ckeditor bundles CKEditor 4.22.1 which isn't supported anymore and which does have unfixed security issues.
```

### Changes Made:
1. Removed `ckeditor` and `ckeditor_uploader` from `INSTALLED_APPS` in settings.py
2. Removed CKEditor configuration from settings.py
3. Removed CKEditor URLs from backend/urls.py
4. Replaced `RichTextField` with standard `TextField` in products/models.py
5. Created requirements.txt with current dependencies

### Reasoning:
CKEditor 4.22.1 has known security vulnerabilities and is no longer supported. Since our application doesn't require rich text editing functionality for product descriptions, we've opted to use a standard TextField instead.

## Setup Instructions

1. **Activate Virtual Environment:**
   ```bash
   # Windows
   env\Scripts\activate
   
   # macOS/Linux
   source env/bin/activate
   ```

2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run Migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Run the Development Server:**
   ```bash
   python manage.py runserver
   ```

## API Endpoints
See `api_endpoinst.txt` for available API endpoints.

## Project Structure
- `backend/` - Main Django project settings
- `users/` - User authentication and management
- `products/` - Product catalog and management
- `carts/` - Shopping cart functionality
- `orders/` - Order processing

## Requirements
- Python 3.11+
- virtualenv (venv)
- SQLite (default) or Postgres for production
- Recommended packages (pip):
  - Django
  - djangorestframework
  - djangorestframework-simplejwt
  - django-cors-headers
  - django-filter
  - Pillow

## Configuration
- `backend/settings.py` uses `AUTH_USER_MODEL = 'users.User'`.
- CORS is configured to allow only `localhost` and `127.0.0.1` through `CORS_ALLOWED_ORIGIN_REGEXES`.
- `MEDIA_URL` and `MEDIA_ROOT` are configured; media files will be served automatically when `DEBUG=True`.
- CKEditor: `CKEDITOR_UPLOAD_PATH = 'uploads/ckeditor/'`.

## Admin Panel
- Admin is available at `/admin/`.
- Use `createsuperuser` to create an admin user.

## Testing Endpoints (curl)
```
# Register a new user
curl -X POST http://localhost:8080/api/users/register/ -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"secret123","name":"Test"}'

# Login
curl -X POST http://localhost:8080/api/users/login/ -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"secret123"}'

```

## Additional Notes
- Username: The `User` model uses `email` for authentication but stores `username` (generated if not provided). If you want to remove `username`, you'll need to modify `REQUIRED_FIELDS`.
- Security: Consider adding rate limiting for registration/login endpoints and setting up HTTPS in production.
- Testing: It's recommended to add tests (pytest + pytest-django) for core functionalities like registration, product creation, and order creation.

## Troubleshooting
- Migration Errors (InconsistentMigrationHistory): This usually means the migration order is incorrect. Possible solutions:
  - If you're in local dev and can reset the database: delete `db.sqlite3` and the `migrations` folder in apps, then run `makemigrations`/`migrate` again.
  - If the database can't be reset (in production), carefully use `manage.py migrate --fake app_label migration_name` to mark dependencies as applied. Only do this if you understand the consequences.

## Future Enhancements
- Pagination and filtering for products (by price, rating, tags) - partially implemented.
- Image upload through a separate endpoint and thumbnail processing.
- Payment gateway integration (Stripe/PayPal).
- Background tasks (Celery + Redis) for notifications and reports.

## Contact and Contributions
If you'd like to continue, I can add tests, CI, docker-compose (web+db+redis), or improve permissions/validation. Just let me know what's a priority.

---

README generated automatically by a developer tool. Edit/append in the repository as needed.
