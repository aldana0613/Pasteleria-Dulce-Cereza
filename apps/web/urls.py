from django.urls import path
from . import views


urlpatterns = [
    path("", views.inicio, name="inicio"),
    path("catalogo/", views.catalogo, name="catalogo"),
    path("historia/", views.historia, name="historia"),
    path("personalizadas/", views.personalizadas, name="personalizadas"),
    path("contacto/", views.contacto, name="contacto"),
    path("pedidos/", views.pedidos, name="pedidos"),
]