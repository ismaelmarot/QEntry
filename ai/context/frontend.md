# 🎨 Frontend Rules - QEntry

## 🎯 Objetivo

UI simple enfocada en:

* gestión de personal
* escaneo de QR
* registro de accesos
* visualización de historial

---

## 📁 Estructura general

* components/
* pages/
* services/
* hooks/ (solo si es necesario)

---

## 🧩 Estructura de componentes (OBLIGATORIO)

Cada componente debe tener su propia carpeta:

/NombreComponente

* NombreComponente.tsx
* NombreComponente.styles.ts
* useNombreComponente.ts
* index.ts
* NombreComponente.test.ts

---

## 📦 index.ts (MUY IMPORTANTE)

Siempre exportar desde index.ts:

```ts
export { default } from './NombreComponente'
```

---

## 🔗 Importación (REGLA OBLIGATORIA)

Cada carpeta debería tener su archivo index.ts si es conveniente.

Ejemplo:

/components/index.ts:

```ts
export { Scanner } from 'Scanner'
export { PersonCard } from 'PersonCard'
```

Uso:

```ts
import { Scanner, PersonCard } from '@/components'
```

🚫 Imports prohibidos

```ts
import Scanner from '../../components/Scanner'
import Scanner from '../../../components/Scanner'
```

---

## ⚙️ Alias obligatorio

Configurar @/ apuntando a src

tsconfig.json:

```ts
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

---

## 🪝 Hooks

* Usar useNombreComponente.ts para lógica
* Separar lógica del UI
* Evitar lógica en JSX

---

## 📷 Scanner UI (CORE del producto)

* Pantalla principal
* Cámara fullscreen
* Marco centrado para QR
* Feedback inmediato:

  * verde → correcto
  * rojo → error

Prioridad:

* velocidad
* claridad

---

## 👤 Gestión de personal UI

* Lista de personas:

  * foto
  * nombre
  * rol (S1, A2, etc.)

* Detalle:

  * información completa
  * acceso a credencial

---

## 🪪 Credencial

* Estilo tipo tarjeta (Apple-like)
* Mostrar:

  * foto
  * nombre
  * ID
  * rol
  * QR grande

---

## 📊 Historial

* Lista simple
* Mostrar:

  * ingreso
  * egreso
  * duración

Filtros:

* por persona
* por fecha

---

## 🔌 API

* Centralizar en /services/api.ts
* No usar fetch/axios en componentes

---

## 🧠 Estado

* useState / useEffect
* Mantener simple
* No usar Redux en MVP

---

## 🎨 Estilos

* styled-components
* separar en .styles.ts
* diseño minimalista estilo Apple:

  * spacing amplio
  * bordes redondeados
  * colores suaves

---

## 🧱 Componentes

* pequeños
* una responsabilidad
* reutilizables

---

## 🧪 Testing

* NombreComponente.test.ts
* tests básicos

---

## 🚫 Evitar

* componentes grandes
* lógica compleja en JSX
* imports relativos
* duplicación
* sobreingeniería
* librerías innecesarias

---

## 🚀 Principio clave

Si el escaneo no es rápido, claro y confiable → la app falla.

