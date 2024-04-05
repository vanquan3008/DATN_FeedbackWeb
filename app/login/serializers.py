from rest_framework import serializers
from .models import user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = [
            "username",
            "fullname",
            "email",
            "numberphone",
            "age",
            "address",
            "domain",
            "password",
        ]
