from django.db import models
from django.contrib.auth.models import User

class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Anime(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='images/', null=True)
    trailer = models.FileField(upload_to='videos/', null=True)
    release_year = models.DateField()
    genres = models.ManyToManyField(Genre)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Anime"
        ordering = ['title']


class Comment(models.Model):
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author.username} - {self.anime.title}"

    class Meta:
        verbose_name_plural = "Comment"
        ordering = ['pub_date']


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE)
    rating = models.IntegerField()
    pub_date = models.DateTimeField(auto_now_add=True)
