from .models import Anime, Comment, User
from rest_framework import serializers
from django.core.validators import MinLengthValidator, MaxLengthValidator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

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
    anime = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "comment", "pub_date", "anime", "author"]

    def get_anime(self, obj):
        return {
            "id": obj.anime.id,
            "title": obj.anime.title,
        }