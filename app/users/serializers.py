from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = "__all__"

    def get_user_id(self ,user_id):
        try:
            user = User.objects.get(user_id=user_id)
            return {
                'fullname': user.fullname,
                'url_image': user.url_image
            }
        except User.DoesNotExist:
            return None
