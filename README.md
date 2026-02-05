# MenteActiva - Bienestar Mental PUCE

Aplicacion hibrida para el apoyo al bienestar mental de estudiantes universitarios.

## Requisitos previos
Instala lo siguiente antes de iniciar:
1. Node.js LTS (https://nodejs.org/)
2. Ionic CLI:
   ```bash
   npm install -g @ionic/cli
   ```
3. Android Studio (solo si vas a compilar en Android)

## Configuracion inicial (primera vez)
1. Clona el repositorio.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Verifica que Ionic funcione:
   ```bash
   ionic --version
   ```

## Ejecutar en navegador (modo web)
```bash
ionic serve
```

## Ejecutar en Android Studio (modo movil)
> Requiere Android Studio instalado.

1. Genera build web:
   ```bash
   ionic build
   ```
2. Sincroniza Capacitor:
   ```bash
   ionic cap sync android
   ```
3. Abre el proyecto Android:
   ```bash
   ionic cap open android
   ```
4. En Android Studio, selecciona un dispositivo/emulador y presiona Run.

## Flujo recomendado para desarrollo
1. Trabaja en React/Ionic.
2. Prueba cambios con:
   ```bash
   ionic serve
   ```
3. Cuando todo este OK, sincroniza:
   ```bash
   ionic cap sync android
   ```
4. Ejecuta en Android Studio.

## Scripts utiles
- Iniciar en navegador:
  ```bash
  ionic serve
  ```
- Build web:
  ```bash
  ionic build
  ```
- Sincronizar Android:
  ```bash
  ionic cap sync android
  ```

## Estructura del frontend
- src/pages/LoginPage.tsx: login institucional.
- src/pages/OnboardingPage.tsx: objetivos iniciales.
- src/pages/HomePage.tsx: inicio con resumen.
- src/pages/CheckInPage.tsx: check-in emocional y nota opcional.
- src/pages/DiaryPage.tsx: historial emocional (diario).
- src/pages/ReportPage.tsx: reporte semanal y estadisticas.
- src/pages/ResourcesPage.tsx: recursos y multimedia.
- src/pages/ProfilePage.tsx: perfil y preferencias.
- src/pages/PrivacyPage.tsx: privacidad.

## Notas importantes
- El backend NO esta conectado aun. Solo se usa localStorage.
- Para ver cambios en Android Studio siempre corre:
  ```bash
  ionic cap sync android
  ```

## Problemas comunes
1. ionic serve dice que no es proyecto Ionic
   - Ejecuta en raiz:
     ```bash
     ionic init
     ```
2. No ves cambios en Android Studio
   - Corre:
     ```bash
     ionic cap sync android
     ```
3. Errores con iconos
   - Asegura usar iconos disponibles en ionicons.
