from .serializers import AnimeSerializer, CommentSerializer
from .models import Anime, Comment, User
from rest_framework import viewsets
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions
from .permissions import IsOwner


class AnimeViewSet(viewsets.ModelViewSet):
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer
    filter_backends = [
        # DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    # filterset_fields = {}
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

    # override the default create method

    # def create(self, request, *args, **kwargs):
    #     username = request.data.get('username')
    #     comment = request.data.get('comment')
    #     anime_id = request.data.get('anime')
    #     anime = Anime.objects.get(pk=anime_id)
    #     new_comment = Comment.objects.create(
    #         username=username,
    #         comment=comment,
    #         anime=anime
    #     )
    #     new_comment.save()
    #     serializer = CommentSerializer(new_comment)
    #     return Response(serializer.data, status=201)
