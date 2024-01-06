from django.urls import path
from .views import CodeExecutor

urlpatterns = [
    path('python/',CodeExecutor.as_view())
]