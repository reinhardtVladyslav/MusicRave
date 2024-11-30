from django.db import models

class MaterialCategory(models.Model):
    """Категорії для освітніх матеріалів."""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Material(models.Model):
    """Освітні матеріали."""
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(
        MaterialCategory, on_delete=models.CASCADE, related_name="materials"
    )
    file = models.FileField(upload_to='materials/files/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class UserMaterialProgress(models.Model):
    """Прогрес користувача у матеріалах."""
    user = models.ForeignKey('users.Users', on_delete=models.CASCADE, related_name="material_progress")
    material = models.ForeignKey(Material, on_delete=models.CASCADE, related_name="user_progress")
    is_completed = models.BooleanField(default=False)
    completion_date = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.material.title}"
