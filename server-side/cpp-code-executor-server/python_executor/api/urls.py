from django.urls import path
from .views import CodeExecutor

urlpatterns = [
    path('cpp/',CodeExecutor.as_view())
]