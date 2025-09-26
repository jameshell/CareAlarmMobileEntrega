# Bienvenido a CareAlarm 🚨

Esta es una aplicación [Expo](https://expo.dev) creada para el monitoreo y gestión de alarmas de cuidado.

## Comenzar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar la aplicación localmente

```bash
npx expo start
```

En la salida, encontrarás opciones para abrir la aplicación en:

- [Build de desarrollo](https://docs.expo.dev/develop/development-builds/introduction/)
- [Emulador de Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Simulador de iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), un entorno limitado para probar el desarrollo de aplicaciones con Expo

### 3. Generar APK

Para generar un APK de la aplicación:

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Iniciar sesión en Expo
eas login

# Construir APK
eas build --platform android --profile preview
```

## 🔐 Información de Login

**IMPORTANTE**: Para acceder a la aplicación, utiliza las siguientes credenciales de prueba:

- **Email**: Cualquier email válido (formato: usuario@ejemplo.com)
- **Contraseña**: Cualquier contraseña (mínimo 6 caracteres)

*Nota: La aplicación está configurada con autenticación simulada para propósitos de desarrollo.*

## Desarrollo

Puedes comenzar a desarrollar editando los archivos dentro del directorio **app**. Este proyecto utiliza [enrutamiento basado en archivos](https://docs.expo.dev/router/introduction).

### Estructura del proyecto

- `app/` - Páginas y navegación de la aplicación
- `components/` - Componentes reutilizables
- `constants/` - Constantes y temas
- `contexts/` - Contextos de React (autenticación, etc.)
- `assets/` - Imágenes e iconos

## Obtener un proyecto limpio

Cuando estés listo, ejecuta:

```bash
npm run reset-project
```

Este comando moverá el código inicial al directorio **app-example** y creará un directorio **app** en blanco donde puedes comenzar a desarrollar.

## Comandos útiles

```bash
# Iniciar en Android
npm run android

# Iniciar en iOS
npm run ios

# Iniciar en web
npm run web

# Linting
npm run lint
```

## Aprender más

Para aprender más sobre el desarrollo de tu proyecto con Expo, consulta los siguientes recursos:

- [Documentación de Expo](https://docs.expo.dev/): Aprende los fundamentos o profundiza en temas avanzados con nuestras [guías](https://docs.expo.dev/guides).
- [Tutorial de Expo](https://docs.expo.dev/tutorial/introduction/): Sigue un tutorial paso a paso donde crearás un proyecto que funciona en Android, iOS y web.

## Únete a la comunidad

Únete a nuestra comunidad de desarrolladores que crean aplicaciones universales.

- [Expo en GitHub](https://github.com/expo/expo): Ve nuestra plataforma de código abierto y contribuye.
- [Comunidad de Discord](https://chat.expo.dev): Chatea con usuarios de Expo y haz preguntas.

## Tecnologías utilizadas

- **Expo Router** - Navegación basada en archivos
- **React Native Paper** - Componentes de UI
- **TypeScript** - Tipado estático
- **Expo** - Plataforma de desarrollo