# 🪔 PoojaSetu - Vedic Puja & Purohit Booking Platform (MEAN Stack)

॥ ॐ श्री गणेशाय नमः ॥

PoojaSetu (पूजासेतु • THE SACRED BRIDGE) is an end-to-end full-stack MEAN (MongoDB, Express, Angular 18, Node.js) web application designed to book authentic Vedic pujas, certified Purohits, and doorstep delivery of 42-item sacred havan samagri kits.

---

## 🏛️ Project Architecture

```
Puja Setu/
├── backend/                       # Express.js + Mongoose (latest) API Backend
│   ├── config/
│   │   ├── db.js                 # Resilient MongoDB connection (Local, Atlas & in-memory fallback)
│   │   └── memoryStore.js        # Zero-config in-memory fallback store
│   ├── controllers/
│   │   ├── auth.controller.js    # Devotee Signup & Signin with JWT & bcrypt
│   │   ├── puja.controller.js    # Vedic Pujas listing & search queries
│   │   ├── pandit.controller.js  # Purohit listing & Gurukul qualification lookup
│   │   └── booking.controller.js # Checkout, Price breakdown & Booking generation
│   ├── middleware/
│   │   └── auth.middleware.js    # JWT authorization & optional auth
│   ├── models/
│   │   ├── User.js               # Devotee profile & credentials
│   │   ├── Puja.js               # Vedic rituals, checklists & pricing
│   │   ├── Pandit.js             # Gurukul scholars, traditions & Dakshina
│   │   └── Booking.js            # Booking records (#PS-2026-XXXXX)
│   ├── routes/                   # REST route definitions
│   ├── seed/
│   │   ├── seedData.js           # Authentic Vedic dummy data (Griha Pravesh, Saptami, Satyanarayan, etc.)
│   │   └── seeder.js             # Database seeder script
│   ├── .env                      # Environment config (Port, Mongo URI, JWT secret)
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Express server on port 5000
│
└── frontend/                      # Angular 18 Single Page Application
    ├── src/
    │   ├── app/
    │   │   ├── core/
    │   │   │   ├── models/       # TypeScript interfaces (Puja, Pandit, Booking, User)
    │   │   │   └── services/     # Angular 18 Signal-based services & HttpClient
    │   │   ├── pages/
    │   │   │   ├── dashboard/    # Screen 1: Hero, Vedic search, Categories, Puja grid
    │   │   │   ├── pandit-selection/ # Screen 2: Verified Purohits for ritual
    │   │   │   ├── booking-form/ # Screen 3: Muhurat picker, Devotee info, Venue, Live breakdown
    │   │   │   ├── confirmation/ # Screen 4: Om Ganeshaya Namah blessing, Receipt & Checklist
    │   │   │   └── my-bookings/  # Devotee bookings management dashboard
    │   │   ├── shared/
    │   │   │   └── components/   # Header, Footer, Stepper, AuthModal
    │   │   ├── app.config.ts     # Standalone config with router view transitions
    │   │   └── app.routes.ts     # Client-side routing for all 4 screens
    │   ├── index.html            # Vedic typography (Cinzel, Plus Jakarta Sans)
    │   └── styles.css            # Sacred Saffron & Gold Vedic Design System
    └── package.json
```

---

## ⚡ Quick Start Instructions

### 1. Start the Backend API Server
```bash
cd backend
npm install
npm start
```
- Server will run at: **http://localhost:5000**
- Health check: **http://localhost:5000/api/health**
- Data is automatically seeded on startup!

> 💡 **Connecting Your MongoDB Account**:
> Open `backend/.env` and update `MONGODB_URI` with your MongoDB Atlas connection string:
> ```env
> MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/pujasetu?retryWrites=true&w=majority
> ```
> If not specified or if local MongoDB is offline, the backend automatically uses its built-in in-memory fallback so you can start testing immediately without waiting for a database!

### 2. Start the Angular 18 Frontend
```bash
cd frontend
npm install
npm start
```
- Web Application will open at: **http://localhost:4200**

---

## 🪔 4-Step User Journey (Matching Mockup)

1. **Screen 1 - Dashboard (`/`)**:
   - Sacred header with brand identity and Sign In / Sign Up triggers.
   - Vedic search bar: Search by ritual name, deity, or need.
   - Category filters: *All Pujas*, *Griha Pravesh*, *Festive & Saptami*, *Havans & Yagnas*, *Dosha Nivarana*.
   - Puja cards showing duration, purohit count, starting price, and "Book Slot".

2. **Screen 2 - Pandit Selection (`/pandits`)**:
   - Displays certified Vedic Purohits (e.g. Pt. Rameshwar Sharma, Pt. Devendra Shastri, Pt. Ananda Bhattacharya).
   - Shows Gurukul lineage, years of experience, tradition (Shukla Yajurveda, Rigveda, etc.), languages, and Dakshina.

3. **Screen 3 - Booking Form (`/booking`)**:
   - **Muhurat Picker**: Auspicious date and sacred time slots (*Brahma Muhurat 06:00 AM*, *Abhijit Muhurat 11:45 AM*, *Pradosh Kaal 05:30 PM*).
   - **Devotee (Yajman) Details**: Full Name, Gotra for sacred sankalp, WhatsApp mobile, email.
   - **Venue Details**: Flat/House, City, Pincode.
   - **Sticky Booking Summary**: Itemized live price calculation (Pandit Dakshina + Vedic Samagri Kit + Platform Fee).

4. **Screen 4 - Confirmation (`/confirmation/:bookingId`)**:
   - Auspicious invocation: `॥ ॐ श्री गणेशाय नमः ॥`
   - Generated Sacred Booking ID (e.g. `#PS-2026-89421`).
   - Assigned Purohit phone contact and venue address.
   - Devotee home preparation checklist (Thalis, mats, pure milk, seasonal fruits).
   - Download/Print Receipt button and link to Devotee Dashboard.

---

## 🔐 Devotee Authentication
- Built-in JWT authentication modal with tabbed Sign In and Devotee Registration.
- Demo Devotee Credentials:
  - **Email**: `gaurav@example.com`
  - **Password**: `secretPassword123`
