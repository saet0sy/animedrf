from .serializers import AnimeSerializer, CommentSerializer, GenreSerializer
from .models import Anime, Comment, Genre
from rest_framework import viewsets, generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions
from .permissions import IsOwner
from rest_framework import viewsets
import django_filters


class GenreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class AnimeFilter(django_filters.FilterSet):
    genres = django_filters.ModelMultipleChoiceFilter(
        field_name='genres__name',
        to_field_name='name',
        queryset=Genre.objects.all(),
    )
    year = django_filters.NumberFilter(field_name='release_year__year')

    class Meta:
        model = Anime
        fields = []

        


class AnimeViewSet(viewsets.ModelViewSet):
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer
    filter_backends = [
        DjangoFilterBackend, 
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_class = AnimeFilter  

    search_fields = ['title', 'description']
    ordering_fields = ['title']


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsOwner,
    ]

    def perform_create(self, serializer):
        serializer.save()

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = {
        'anime': ['exact'],
    }
    search_fields = ['comment']
    ordering_fields = ['pub_date']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

