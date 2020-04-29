from django.contrib import admin


class ProblemAdmin(admin.ModelAdmin):
    exclude = ('pbtex_file',)

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return True


class ExamAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False
