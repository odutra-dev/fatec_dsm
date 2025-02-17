from django.urls import path

from . import views

urlpatterns = [
    path('DutraPrime/', views.Home, name="DutraPrime"),

    path('registro', views.register, name="register"),
    
    path('entrar', views.login, name="login"),
    
    path('dashboard', views.dashboard, name="dashboard")

]