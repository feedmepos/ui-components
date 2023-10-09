# Project overview
This project in intended to provide all UI component coming from design system.

# Dependency
1. Vite is used for module federation
2. Vue 3 is required to use all the component
3. The styling is based on tailwindcss, with addon plugin provided by this package

# How to use
1. Install the package from feedmepos github and all the peer dependency
   1. vite compiler
   2. vue3
   3. tailwindcss
2. Add the vite plugin to enable module federation when build for production
3. Add the tailwind plugin to expose all class
4. import the component just like normal with the full typing ability.

# How to contribute
1. Formatting using VS code prettier extension
2. Add a components inside src/components
3. Expose the component for federation using component-map.json