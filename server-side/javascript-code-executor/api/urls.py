from django.urls import path
from .views import CodeExecutor

urlpatterns = [
    path('js/',CodeExecutor.as_view())
]