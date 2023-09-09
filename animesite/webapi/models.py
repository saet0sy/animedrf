from django.db import models

# Create your models here.
class Anime(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='images/')
    trailer = models.FileField(upload_to='videos/')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Anime"
        ordering = ['title']