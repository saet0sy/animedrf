from django.urls import path, include
from rest_framework import routers
from .views import AnimeViewSet, CommentViewSet

router = routers.DefaultRouter()
router.register(r'anime', AnimeViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]