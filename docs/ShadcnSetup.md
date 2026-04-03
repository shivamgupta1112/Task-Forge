Shadcn UI is a modern component system built on top of **Radix UI** and **Tailwind CSS**, providing accessible, customizable, and production-ready components.

---

## Setup Steps

### 1. Initialize shadcn

```bash
npx shadcn@latest init
```

### 2. Configuration Choices

During setup, the following options were selected:

* **Framework:** Vite (React)
* **Component Library:** Radix UI
* **Preset:** Nova
* **Styling:** Tailwind CSS v4
* **Components Directory:** `src/components`
* **Utilities Path:** `src/lib/utils`

---

### 3. Import Alias Configuration

To support `@/` imports, alias configuration was added:

#### `jsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### `vite.config.js`

```js
import path from "path";

export default {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
```

---

### 4. Install Components

Example:

```bash
npx shadcn@latest add button
```

This generates:

```
src/components/ui/button.jsx
```

---

### 5. Usage Example

```jsx
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="p-10">
      <Button>TaskForge 🚀</Button>
    </div>
  );
}

export default App;
```

---

## 🧪 Verification

* Button component rendered successfully
* Tailwind styles applied correctly
* Import alias (`@/`) working as expected

---

## 📁 Folder Structure

```
src/
 ├── components/
 │   └── ui/        # shadcn components
 ├── lib/
 │   └── utils.js
 ├── App.jsx
 └── main.jsx
```

---

## 💡 Notes

* Components are fully customizable
* Tailwind CSS is required for styling
* Radix UI ensures accessibility and behavior

---

## ✅ Status

✔ shadcn successfully integrated
✔ UI components ready for development

---
