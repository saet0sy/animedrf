from .models import Anime
from rest_framework import serializers
from django.core.validators import MinLengthValidator, MaxLengthValidator


class AnimeSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        validators=[MinLengthValidator(2), MaxLengthValidator(100)]
    )
    description = serializers.CharField(
        validators=[MinLengthValidator(2)]
    )
    class Meta:
        model = Anime
        fields = "__all__"