from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    message = "You must be the author of this comment."

    def has_object_permission(self, request, view, obj):
        return obj.author == request.user
    
