from django.db import models

# Create your models here.

from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    photo = models.URLField(blank=True)
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
class User(models.Model):
    user_id = models.CharField(max_length=150)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    last_login = models.DateTimeField(auto_now_add=True)
    picture = models.CharField(max_length=2048)
    
class Course(models.Model):
    department = models.CharField(max_length=100)
    course_title = models.CharField(max_length=200)
    instructor = models.CharField(max_length=100)
