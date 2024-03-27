<!-- Gracias por proporcionar toda esa información. Con eso, puedo generar el README para la aplicación "Halcones en línea". Aquí tienes: -->

<a name="readme-top"></a>

<div align="center">

[![Contribuidores][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Estrellas][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<a href="https://halcones-en-linea.vercel.app/">
  <img width="300px" src="/public/img/logo-itesus.png" alt="Logo" width="800" />
</a>

## Halcones en línea

Halcones en línea es una plataforma educativa desarrollada por FocoGrafico para la universidad Itesus que permite a los estudiantes realizar carreras y doctorados de manera completamente remota.

[Web en construcción](https://halcones-en-linea.vercel.app/)

</div>

<details>
<summary>Tabla de contenidos</summary>

- [Halcones en línea](#halcones-en-linea)
- [Características principales](#características-principales)
  - [Capturas de pantalla](#capturas-de-pantalla)
- [Para empezar](#para-empezar)
  - [Requisitos previos](#requisitos-previos)
  - [Instalación](#instalación)
- [Contribuir al proyecto](#contribuir-al-proyecto)
- [Tecnologías utilizadas](#tecnologías-utilizadas)

</details>

## Características principales

- **Actividades interactivas**: Los estudiantes pueden participar en actividades como conferencias virtuales, trabajos, exámenes, trivias y cuestionarios.
- **Panel para profesores**: Los profesores tienen acceso a un panel donde pueden generar diferentes tipos de actividades para los estudiantes.

### Capturas de pantalla

![Captura de pantalla en móvil](/public/img/desktop-ss.png)
<!-- ![Captura de pantalla en ordenador](inserta-url-captura-ordenador) -->

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Para empezar

### Requisitos previos

- Node Version Manager (NVM) (recomendado para asegurar la versión de Node) - [Documentación oficial](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

  ```sh
  nvm use
  # o
  nvm use <version>
  ```

- PNPM (recomendado) o NPM

  ```sh
  npm install -g pnpm
  ```

- Establecer el archivo `.env.local` con las siguientes variables:

  ```plaintext
  NEXT_PUBLIC_SUPABASE_URL=tu-url-supabase
  NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-supabase-anon-key
  ```

- Traer el tipado de la base de datos:

  ```sh
  pnpm pnpm:db:types
  ```

### Instalación

1. Clonar el repositorio

   ```sh
   git clone https://tu-repositorio/halcones-en-linea.git
   ```

2. Instalar las dependencias

   ```sh
   pnpm install
   ```

3. Ejecutar el proyecto

   ```sh
   pnpm run dev
   ```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Contribuir al proyecto

Para contribuir al desarrollo de Halcones en línea, sigue estos pasos:

1. Sigue el diseño proporcionado por el equipo de desarrollo.
2. Haz un fork del repositorio.
3. Clona tu fork (`git clone <URL del fork>`).
4. Añade el repositorio original como remoto (`git remote add upstream <URL del repositorio original>`).
5. Crea tu rama de trabajo (`git switch -c feature/NuevaCaracteristica`).
6. Realiza tus cambios (`git commit -m 'Añadir: NuevaCaracteristica'`).
7. Haz push a tu rama (`git push origin feature/NuevaCaracteristica`).
8. Abre una pull request en el repositorio original.

¡Todas las contribuciones son bienvenidas!

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## Tecnologías utilizadas

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/Foco-Grafico/halcones-en-linea.svg?style=for-the-badge
[contributors-url]: https://github.com/Foco-Grafico/halcones-en-linea/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Foco-Grafico/halcones-en-linea.svg?style=for-the-badge
[forks-url]: https://github.com/Foco-Grafico/halcones-en-linea/network/members
[stars-shield]: https://img.shields.io/github/stars/Foco-Grafico/halcones-en-linea.svg?style=for-the-badge
[stars-url]: https://github.com/Foco-Grafico/halcones-en-linea/stargazers
[issues-shield]: https://img.shields.io/github/issues/Foco-Grafico/halcones-en-linea.svg?style=for-the-badge
[issues-url]: https://github.com/Foco-Grafico/halcones-en-linea/issues

<!-- Por favor, asegúrate de reemplazar `inserta-url-del-logo-aqui`, `inserta-url-captura-movil` y `inserta-url-captura-ordenador` con las URLs correspondientes para el logo y las capturas de pantalla de la aplicación. Además, reemplaza `tu-url-supabase` y `tu-supabase-anon-key` con las URL y clave anónima de Supabase correspondientes. Y finalmente, sustituye `tu-usuario` en los enlaces de los badges y las URL de GitHub con tu nombre de usuario de GitHub. -->