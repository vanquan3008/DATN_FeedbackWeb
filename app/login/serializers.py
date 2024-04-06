from rest_framework import serializers
from .models import user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = [
            "id",
            "username",
            "fullname",
            "email",
            "numberphone",
            "age",
            "address",
            "domain",
            "password",
        ]
        read_only_fields = (
            "id",
            "email",
        )
        extra_kwargs = {
            "created_by": {"default": serializers.CurrentUserDefault()},
            "password": {"write_only": True},
        }
