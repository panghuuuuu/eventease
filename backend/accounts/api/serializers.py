from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from allauth.account.adapter import get_adapter
from allauth.account.models import EmailAddress

User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    birthday = serializers.DateField()

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'birthday', 'password1', 'password2']

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                _("A user is already registered with this e-mail address.")
            )


        stripped_email = email.strip()
        return stripped_email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError(
                {"password": _("The two password fields didn't match.")}
            )
        return data

    def save(self, **kwargs):
        cleaned_data = self.validated_data
        user = User(
            username=cleaned_data.get("username"),
            email=cleaned_data.get("email"),
            first_name=cleaned_data.get("first_name"),
            last_name=cleaned_data.get("last_name"),
        )
        user.set_password(cleaned_data.get("password1"))
        user.save()
        return user
