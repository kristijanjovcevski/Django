from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('proceed/', views.proceed, name='proceed'),
    path('delivery/', views.delivery, name='delivery'),
    path('register/', views.register, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('save_address/', views.save_address, name='save_address'),
    path('payment/', views.payment, name='payment'),
    path('profile/', views.profile, name='profile'),
    path('guide/',views.guide, name='guide')
]
