# Syra Portal

**Syra Portal** is a portfolio project: a modern **HR and employee management dashboard** built with React and Vite.  
It demonstrates **front-end engineering, UI/UX design, accessibility, and project structure** — not intended for real-world HR use.

---

## 🌐 Live demo
👉 [View Syra Portal Live](https://syra-portal.netlify.app/)

---

## ✨ Current features

### 🔐 Authentication (Supabase)
- Login
- Forgot password
- Reset password
- Protected routes

### 👥 Employees
- Employee directory powered by **mock data**
- Employee details tracked:
  - Contract type (full-time, part-time, contract)
  - Work mode (onsite, hybrid, remote)
  - Salary vs. wage with accurate £GBP formatting
  - Department, role, manager ID & manager name
  - Start date, contract end (expired contracts highlighted)
  - Date of birth, mobile, email (clickable links)
- UI/UX features:
  - Responsive, scrollable table with sticky headers
  - Row hover/focus states
  - Table head buttons (visual sort/filter placeholders)
  - Search bar
  - Rows-per-page dropdown (10 / 25 / 50)
  - Edit / Terminate actions

### 🧭 Navigation & Layout
- **Sidebar navigation** with expand/collapse  
- **Active route highlighting** with `aria-current="page"`  
- **User menu** with avatar, name, email, and sign-out  
- **Header and footer** with consistent branding  
- Accessible **focus states**, `aria-label`s, and keyboard navigation

---

## 🛠️ Tech stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)  
- [React Router](https://reactrouter.com/)  
- [CSS Modules](https://github.com/css-modules/css-modules)  
- [Supabase](https://supabase.com/) (authentication)  
- [React Icons](https://react-icons.github.io/react-icons/)  

---

## 🚀 Getting started

### 1. Clone the repo

```bash
git clone https://github.com/JHypq/syra-portal.git
cd syra-portal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a .env file in the root with your Supabase credentials:
```env
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run locally

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## 📌 Notes
- This is a portfolio project, not a production HR tool
- All employee data is mock/fake
- Focus is on front-end architecture and UI/UX design