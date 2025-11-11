# ⚽ yallaride - carpoling web app
**YallaRide** is a full-stack web application that helps organizations and communities create private carpooling networks. It securely connects drivers and passengers within their group, simplifying ride management through a `role-based system` and private access controls. Built with `Next.js` and `Shadcn` on the frontend, and powered by `Firebase` and `Firestore` on the backend.

## 🚀 Features

### 🧑‍💼 Role based system
- User authentication & role‑based access (drivers, riders, admin).

### 👑 Director
- Create and manage private networks.
- Share unique join codes with users.
- Approve or reject member requests.

### 🚗 Driver
- Join private networks via join code.
- Offer rides visible only within the network.
- Manage ride status (not started, canceled, in progress, finished).

### 🧍 Passenger
- Join networks using a join code.
- Search for rides by departure, arrival, and date.
- Book seats and pay in cash after the ride.

### 🖥️ Responsive UI
  Built with Tailwind CSS + Shadcn + lucide-react for a modern look


## 🧰 Tech Stack

| Layer        | Tech                        |
|--------------|-----------------------------|
| Frontend     | NextJs                      |
| UI Components| Tailwind CSS + Shadcn       |
| Backend & db | firebase & firestore        |



## 🔮 Future Enhancements
- Online payment integration.
- Real-time ride tracking.
- Notifications for booking updates.
- Mobile app version (React Native).


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
Create a `.env` file and fill it with your Firebase credentials:
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
├── app/                                         # Main Next.js application folder
│   ├── dashboard/                               # Dashboard (protected area)
│   │   ├── bookings/                            # Passenger booking pages
│   │   │   ├── [bookingId]/page.jsx             # Dynamic booking details page
│   │   │   └── page.jsx                         # List of bookings for each passenger
│   │   ├── network/                             # Private network view
│   │   │   └── [networkId]/                     # Dynamic network page
│   │   │       ├── find/page.jsx                # Find available rides in network
│   │   │       ├── rides/[rideId]/page.jsx      # Dynamic ride details page
│   │   │       └── page.jsx                     # Network dashboard home
│   │   ├── networks/page.jsx                    # All networks overview
│   │   ├── profile/page.jsx                     # User profile page
│   │   ├── rides/page.jsx                       # Driver ride management
│   │   ├── dashboardLayout.jsx                  # Dashboard layout component
│   │   └── page.jsx                             # Dashboard home page
│   ├── login/page.jsx                           # Login page
│   ├── register/page.jsx                        # Registration page
│   ├── global.css                               # Global styling
│   ├── layout.jsx                               # Root layout
│   └── page.jsx                                 # Landing page
│
├── components/                                  # Reusable UI components : custom + shadcn
├── context/                                     # Global React contexts
│   ├── AuthContext.jsx                          # Authentication context
│   ├── NetworksContext.jsx                      # Networks management context
│   ├── PopupContext.jsx                         # Popup/modal management
│   └── ThemeContext.jsx                         # Light/Dark theme context
│
├── hooks/                                       # Custom React hooks
│   └── use-mobile.js                             # Shadcn mobile hook
│
├── lib/                                         # Utility and config files
│   ├── firebaseClient.js                        # Firebase initialization
│   ├── services.js                              # statique services data
│   ├── testimons/                               # Testimonials data
│   └── utils/                                   # shadcn Helper functions
│
├── public/                                      # Static public assets
│   ├── documentation/                           # Screenshots for README
│   └── assets/                                  # Project images.
│
├── .gitattributes
├── .gitignore
├── components.json                              # Shadcn components config
├── eslint.config.mjs                            # ESLint configuration
├── jsconfig.json                                # JS/TS path aliases
├── next.config.mjs                              # Next.js configuration
├── package-lock.json
├── package.json
└── postcss.config.mjs                           # PostCSS configuration

```
## 📷 Demo and Screenshots

### 🏠 Home Pages Overview
Below are the screenshots showing the general view of the homepage:

![Home Page 1](/public/documentation/homepage.png)
![Home Page 2](/public/documentation/homepage_dark.png)

### ⚙️ Admin Dashboard Overview
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

## 🤝 Contributing
Contributions are welcome!  
Fork the repository, create a feature branch, and submit a pull request.

## 📜 License
This project is licensed under the [MIT License](LICENSE).

## 🚀 Demo
You can check out the live demo of the project at: [Demo URL](https://yallaride.vercel.app)
