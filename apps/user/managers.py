from django.contrib.auth.models import BaseUserManager, Permission, Group


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email is needed in order to create a user")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_active", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Creating a superuser must always have that field made")
        super_user = self._create_user(email, password, **extra_fields)

        admin_group, created = Group.objects.get_or_create(name="admin")
        if created:
            permissions = Permission.objects.all()
            for permission in permissions:
                admin_group.permissions.add(permission)
        super_user.groups.add(admin_group)

        return super_user
