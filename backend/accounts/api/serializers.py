from django.contrib.auth import get_user_model, authenticate, login
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from allauth.account.adapter import get_adapter
from allauth.account.models import EmailAddress

User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=150, required=True)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    birthday = serializers.DateField()
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password1', 'password2', 'email', 'birthday']

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
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'), username=username, password=password)
            if user:
                login(self.context.get('request'), user)  
                return {'username': username, 'password': password}  
            else:
                raise serializers.ValidationError("Invalid username or password.")
        else:
            raise serializers.ValidationError("Both username and password are required.")


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email']

