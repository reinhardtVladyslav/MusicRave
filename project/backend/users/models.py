import datetime
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password


class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("role", 1)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)


class Users(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20, default=None)
    email = models.EmailField(max_length=100, unique=True, default=None)
    password = models.CharField(default=None, max_length=255)
    bio = models.TextField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(editable=False, auto_now=datetime.datetime.now())

    USERNAME_FIELD = "email"
    objects = UserManager()

    def __str__(self):
        return f"{self.username}"

    @staticmethod
    def create(email, password, username=None):
        if (
            len(username) <= 20
            and len(email) <= 100
            and len(email.split("@")) == 2
            and len(Users.objects.filter(email=email)) == 0
        ):
            custom_user = Users(
                email=email,
                password=make_password(password),
                username=username,
            )
            custom_user.save()
            return custom_user
        return None
