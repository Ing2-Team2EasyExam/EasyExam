from .models import User
from django import forms


class UserAdminForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ("email", "password", "first_name", "last_name", "groups", "is_active")

    def save(self, commit=True):
        user = super().save(commit)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user
