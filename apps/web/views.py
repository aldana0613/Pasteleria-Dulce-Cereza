"""
Módulo: views (app web)
Autor: <tu nombre>
Descripción: Vistas de las páginas públicas de la pastelería.
"""
from django.shortcuts import render

def inicio(request):
    """Muestra la bienvenida, información de nosotros y locales."""
    return render(request, "inicio.html")

def catalogo(request):
    # Datos de prueba: luego vendrán de la base de datos
    categorias = ["Todas", "Clásicas", "Chocolate con Frutas", "Rellenas con Cremas",
                  "Tres Leches", "Postres", "Premium"]

    tortas = [
        {"nombre": "Torta de Chocolate y Fresas", "categoria": "Chocolate con Frutas",
         "etiqueta": "Más pedida", "emoji": "🍓",
         "desc": "Bizcocho húmedo de chocolate con crema ligera y fresas frescas de temporada.",
         "precios": [("24 cm", "20-22 porciones", 85), ("20 cm", "12-15 porciones", 55), ("Personal", "1 porción", 12)]},
        {"nombre": "Tres Leches Clásica", "categoria": "Tres Leches",
         "etiqueta": "Clásico", "emoji": "🥛",
         "desc": "Bizcocho esponjoso bañado en tres leches con cobertura de crema chantilly.",
         "precios": [("24 cm", "20-22 porciones", 80), ("20 cm", "12-15 porciones", 50), ("Personal", "1 porción", 10)]},
        {"nombre": "Mousse de Maracuyá", "categoria": "Rellenas con Cremas",
         "etiqueta": "Rellena con crema", "emoji": "🍋",
         "desc": "Suave mousse de maracuyá sobre base de bizcocho y espejo de fruta.",
         "precios": [("24 cm", "20-22 porciones", 85), ("20 cm", "12-15 porciones", 55)]},
        {"nombre": "Torta de Zanahoria", "categoria": "Clásicas",
         "etiqueta": "Clásico", "emoji": "🥕",
         "desc": "Bizcocho especiado con nueces y frosting de queso crema.",
         "precios": [("24 cm", "20-22 porciones", 75), ("20 cm", "12-15 porciones", 48)]},
        {"nombre": "Red Velvet", "categoria": "Rellenas con Cremas",
         "etiqueta": "Rellena con crema", "emoji": "❤️",
         "desc": "Bizcocho rojo aterciopelado con relleno de queso crema.",
         "precios": [("24 cm", "20-22 porciones", 90), ("20 cm", "12-15 porciones", 60)]},
        {"nombre": "Selva Negra Premium", "categoria": "Premium",
         "etiqueta": "Premium", "emoji": "🍒",
         "desc": "Chocolate belga, cerezas al licor y crema batida, con acabado artesanal.",
         "precios": [("24 cm", "20-22 porciones", 120), ("20 cm", "12-15 porciones", 78)]},
    ]
    return render(
    request,
    "catalogo.html",
    {
        "categorias": categorias,
        "tortas": tortas,
    },
)
def personalizadas(request):
    """Página para pedir tortas personalizadas."""
    return render(request, "personalizadas.html")
def historia(request):
    """Página con la historia de la pastelería (línea de tiempo)."""
    # Datos de prueba: cámbialos por la historia real
    etapas = [
        {"numero": "01", "titulo": "El comienzo",
         "subtitulo": "Todo empezó en una cocina pequeña",
         "emoji": "👩‍🍳",
         "parrafos": [
             "Dulce Cereza nació de una idea simple: hornear con calma, con buenos ingredientes y pensando en quién va a disfrutar cada porción.",
             "Las primeras tortas se hicieron para la familia y los amigos. Pronto, las recomendaciones de boca en boca llenaron la agenda de pedidos.",
         ]},
        {"numero": "02", "titulo": "Lo que creemos",
         "subtitulo": "Los ingredientes frescos se notan",
         "emoji": "🍓",
         "parrafos": [
             "Creemos en los ingredientes naturales, las recetas hechas con paciencia y los acabados cuidados a mano.",
             "Cada pedido se prepara con atención al detalle, desde el sabor hasta la presentación, porque una torta bien hecha convierte cualquier día en una celebración.",
         ]},
        {"numero": "03", "titulo": "Dulce Cereza hoy",
         "subtitulo": "Una pastelería para celebrar en Arequipa",
         "emoji": "🎂",
         "parrafos": [
             "Hoy acompañamos cumpleaños, aniversarios y reuniones familiares con tortas y postres elaborados por encargo y siempre frescos.",
             "Seguimos creciendo, pero con la misma idea del primer día: que cada torta que sale de nuestra cocina haga sonreír a alguien.",
         ]},
    ]
    return render(request, "historia.html", {"etapas": etapas})
def contacto(request):
    """Página de contacto con datos y formulario de mensaje."""
    return render(request, "contacto.html")


def pedidos(request):
    """Muestra la selección guardada en el navegador."""
    return render(
        request,
        "pedidos.html",
        {"costo_delivery": 10},
    )