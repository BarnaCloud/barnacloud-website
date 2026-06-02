#!/bin/bash
# update-web.sh
# Script para crear rama, hacer commit y push al repo
#
# Limpiar pantalla
clear
# Salir si hay error
set -e

# 1. Pedir nombre de la nueva rama
read -p "Nombre de la rama (sin espacios, ej: feature/fix-logo): " branch

# 2. Crear y cambiar a la nueva rama
git checkout -b "$branch"

# 3. Añadir todos los cambios
git add .

# 4. Pedir mensaje de commit
read -p "Mensaje del commit: " msg
git commit -m "$msg"

# 5. Push al remoto con upstream
git push -u origin "$branch"

echo ""
echo "✅ Rama '$branch' creada y subida a remoto."
echo "ℹ️  Ahora abre tu PR en:"
echo "   https://github.com/BarnaCloud/barnacloud-website/pull/new/$branch"

read -p "ENTER, para salir del script"
clear
exit 0

# Fin
