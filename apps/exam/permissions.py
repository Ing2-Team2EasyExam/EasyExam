from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class IsUploader(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.uploader == request.user
