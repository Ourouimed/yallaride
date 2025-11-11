# ⚽ yallaride - carpoling web app

**YallaRide** a full-stack web application for carploing . It is built with **Nextjs + Shadcn** on the frontend and **Firebase & Firestore** on the backend and db.

## 🚀 Features

- 🧑‍💼 **role based system**  
  - User authentication & role‑based access (drivers, riders, admin).
  - ***For Director:*** : 
    - Each director can create a private network and system generates a random id.
    - Director can share join code to others (drivers and passengers).
    - Director can accept or decline network users.
  - ***For a driver :*** :
    - Each driver can join a private network by a join code.
    - Each driver can offer a ride in a selected private network .
    - Each ride can be shown only for network members.
    - Driver can accept or decline passengers in ride.
    - Driver can manage ride status (not started , canceled , on progress , finished).
  - ***For a passenger :***
    - Each passenger can join a private network by a join code.
    - Can find a ride based on departure , arrival and departure date .
    - Book an available ride and choose number of seats 
    - passenger pay on cash after ride.
- **Private network access** 
  - Each director role limites network access to join network_id
- 🖥️ **Responsive UI**  
  Built with Tailwind CSS + Shadcn + lucide-react for a modern look

---

## 🧰 Tech Stack

| Layer        | Tech                        |
|--------------|-----------------------------|
| Frontend     | NextJs                      |
| UI Components| Tailwind CSS + Shadcn       |
| Backend & db | firebase & firestore        |

---

## 🛠️ Installation & Usage

To run this project locally:

### I. Clone the Repository

```bash
git clone https://github.com/Ourouimed/yallaride.git
```
### II - Setup
```bash
cd yallaride
npm install
```
Create a `.env` file and fil it with your firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```
Then start the server:
```bash
npm run dev 
```
- Open your browser at: http://localhost:3000

## 📂 Project Structure

```bash
yallaride/
├── app/
│   ├── dashboard/
│   │   ├── bookings/
│   │   ├── network/
│   │   ├── networks/
│   │   ├── profile/
│   │   ├── rides/
│   │   ├── dashboardLayout.jsx
│   │   └── page.jsx
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── global.css
│   ├── layout.jsx
│   └── page.jsx
├── components/ 
├── context/ 
│   ├── AuthContext.jsx
│   ├── NetworksContext.jsx
│   ├── PopupContext.jsx
│   └── ThemeContext.jsx
├── hooks/
├── lib/
│   ├── firebaseClient.js 
│   ├── services.js 
│   ├── testimons
│   └── utils
├── public/
│   ├── documentation
│   └── assets/
├── .gitattributes
├── .gitignore
├── components.json
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
└── postcss.config.mjs
```
### 📷 Demo and Screenshots

#### Home Pages Overview
Below are the screenshots showing the general view of the homepage:

![Home Page 1](/public/assets/documentation/homepage.png)
![Home Page 2](/public/assets/documentation/homepage_dark.png)

#### Admin Dashboard Overview
Here are the screenshots showcasing the admin dashboard interface:
![Login page](/public/documentation/login.png)
![Register page](/public/documentation/register.png)
![Register page](/public/documentation/register2.png)
![Admin Dashboard](/public/documentation/dashboard.png)
![User Profile](/public/documentation/dashboard.png)
![Networks page](/public/documentation/networks.png)
![Network dashboard](/public/documentation/network.png)
![Offer ride](/public/documentation/offer-ride.png)
![Driver rides](/public/documentation/rides.png)
![Ride page](/public/documentation/ride.png)

---

### 🚀 Demo
You can check out the live demo of the project at: [Demo URL](https://yallaride.vercel.app)
