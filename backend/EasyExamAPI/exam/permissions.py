from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class IsPaid(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.owner.is_paid


class IsUploader(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.uploader == request.user


class IsAuthenticatedAndIsOwnerOrIsNone(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return (IsAuthenticated().has_object_permission(request, view, obj) and
                IsOwner().has_object_permission(request, view, obj)) or obj.owner is None
