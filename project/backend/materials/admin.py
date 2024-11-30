from django.contrib import admin
from .models import Material, MaterialCategory, UserMaterialProgress

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'created_at')
    search_fields = ('title',)

@admin.register(MaterialCategory)
class MaterialCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(UserMaterialProgress)
class UserMaterialProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'material', 'is_completed', 'completion_date')
