#!/bin/bash

# Script para agregar un nuevo post al índice
# Uso: ./add-post.sh nombre-del-post "Título del Post" "Resumen del post"

if [ "$#" -lt 3 ]; then
    echo "Uso: ./add-post.sh slug \"Título\" \"Resumen\""
    echo "Ejemplo: ./add-post.sh mi-post \"Mi Primer Post\" \"Este es un resumen breve\""
    exit 1
fi

SLUG="$1"
TITLE="$2"
SUMMARY="$3"
DATE=$(date +%Y-%m-%d)
JSON_FILE="blog/posts.json"

# Crear el archivo markdown si no existe
if [ ! -f "blog/posts/$SLUG.md" ]; then
    echo "Creando archivo blog/posts/$SLUG.md"
    cat > "blog/posts/$SLUG.md" << EOF
Escribe tu contenido aquí...

## Primera sección

Texto de ejemplo.

EOF
    echo "✅ Archivo creado. Edítalo para agregar tu contenido."
fi

# Leer el JSON actual
CURRENT_JSON=$(cat $JSON_FILE)

# Crear el nuevo entry
NEW_ENTRY=$(cat << EOF
  {
    "slug": "$SLUG",
    "title": "$TITLE",
    "date": "$DATE",
    "summary": "$SUMMARY",
    "image": ""
  }
EOF
)

# Insertar al principio del array
echo "$CURRENT_JSON" | sed "s/\[/[\n$NEW_ENTRY,/" > $JSON_FILE

echo "✅ Post agregado al índice"
echo "📝 Ahora edita: blog/posts/$SLUG.md"
echo "🔗 URL: /post.html?slug=$SLUG"
