from .models import Anime, Comment, Genre
from rest_framework import serializers
from django.core.validators import MinLengthValidator, MaxLengthValidator

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class AnimeSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        validators=[MinLengthValidator(2), MaxLengthValidator(100)]
    )
    description = serializers.CharField(
        validators=[MinLengthValidator(2)]
    )

    genres = serializers.StringRelatedField(many=True)

    class Meta:
        model = Anime
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(source='author.username')

    class Meta:
        model = Comment
        fields = ["id", "comment", "pub_date", "anime", "author"]
