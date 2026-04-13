# DeFi Real Estate - Assessment 5

A comprehensive blockchain-based property transaction platform demonstrating full-stack development with **React**, **Node.js**, and **Solidity smart contracts**.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    DeFi Real Estate Platform             │
└─────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
    ┌────────┐          ┌────────┐          ┌────────┐
    │ React  │          │Node.js │          │Solidity│
    │Frontend│          │Backend │          │ Smart  │
    │(3D UI) │          │(REST   │          │Contract│
    │        │          │API)    │          │(Ethereum
    └────────┘          └────────┘          └────────┘
         │                    │                    │
         └────────┬───────────┴───────────────────┘
                  │
          ┌───────▼────────┐
          │   MongoDB      │
          │   Database     │
          └────────────────┘
```

---

## 📁 Project Structure

### **Frontend (`/src`)**
```
src/
├── pages/
│   ├── Home.jsx                    # Landing page
│   ├── Properties.jsx              # Property listing
│   ├── Property3D.jsx              # 3D property viewer
│   ├── PropertyDetail.jsx          # Detailed view
│   ├── About.jsx, FAQ.jsx, etc.
│
├── components/
│   ├── property/
│   │   ├── Property3DModel.jsx    # Three.js 3D model
│   │   ├── Scene.jsx              # Scene setup
│   │   └── Experience.jsx         # Interactive experience
│   │
│   └── layout/
│       ├── Navbar.jsx
│       └── Footer.jsx
│
└── App.jsx, index.js               # Entry points
```

**Tech Stack:**
- React 18.3.1
- React Router v6 (Navigation)
- React Three Fiber (3D Graphics)
- Axios (HTTP Client)
- Jotai (State Management)
- Tailwind CSS (Styling)

---

### **Backend (`/server`)**
```
server/
├── app.js                          # Express app setup
├── config/
│   └── config.js                   # Configuration
│
├── controllers/                    # Business logic
│   ├── auth.controller.js         # Authentication
│   ├── property.controller.js     # Property management
│   ├── users.controller.js        # User management
│   └── common.controller.js       # Common operations
│
├── models/                         # MongoDB schemas
│   ├── property.js               # Property schema
│   ├── users.js                  # User schema
│   ├── city.js                   # City schema
│   ├── state.js                  # State schema
│   └── propertyTypes.js          # Property type schema
│
├── routes/                         # API endpoints
│   ├── auth.js                   # /api/auth
│   ├── property.js               # /api/property
│   ├── users.js                  # /api/user
│   ├── common.js                 # /api/common
│   └── email.js                  # /api/email
│
├── middleware/
│   └── errorHandler.js           # Error handling
│
└── providers/
    ├── helper.js                 # Helper functions
    └── token.provider.js         # JWT token management
```

**Tech Stack:**
- Express.js 4.19.2 (Web Framework)
- MongoDB/Mongoose 8.20.0 (Database)
- JWT (Authentication)
- bcryptjs (Password Hashing)
- GridFS (File Storage)
- Socket.io (Real-time Communication)
- SendGrid (Email Service)

---

### **Smart Contracts (`/contracts`)**
```
contracts/
├── Factory.sol                     # Contract factory
│   └── Creates HomeTransaction contracts
│   └── Manages contract instances
│
└── HomeTransaction.sol             # Transaction contract
    ├── ContractState enum         # State machine
    ├── Role management            # Seller, Buyer, Realtor
    ├── Deposit handling           # Escrow logic
    ├── State transitions          # Transaction flow
    └── Fund transfers             # Payment handling
```

**Features:**
- Contract Factory Pattern
- State Machine Design
- Role-Based Access Control
- Escrow Account Management
- Deadline Tracking

---

## 🔄 Data Flow

### **User Registration**
```
User Input → Auth Controller → Hash Password (bcryptjs)
    ↓
Mongoose Validation → Save to MongoDB → JWT Token Generated
```

### **Property Listing**
```
Property Form → Property Controller → Slug Generation
    ↓
Image Upload (GridFS) → Mongoose Save → Response to Client
```

### **Smart Contract Transaction**
```
Buyer Signs → Contract Deployment (Factory)
    ↓
State: WaitingSellerSignature → WaitingBuyerSignature
    ↓
Deposit Transfer → Realtor Review
    ↓
State: WaitingFinalization → Finalized
    ↓
Fund Distribution (Seller + Realtor)
```

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js 20.x
npm or yarn
MongoDB (local or Atlas)
```

### Installation
```bash
# 1. Clone repository
git clone https://github.com/manikantareddy12/defi-real-estate.git
cd defi-real-estate

# 2. Setup Node version
nvm install 20
nvm use 20

# 3. Install dependencies
npm install

# 4. Configure environment
# Create .env file with:
# PORT=5001
# MONGODB_URI=mongodb://...
# JWT_SECRET=your-secret-key
# etc.
```

### Running the Application
```bash
# Start both frontend and backend concurrently
npm start

# Or run separately:
npm run server    # Backend on port 5001
npm run client    # Frontend on port 3000

# Build for production
npm run build

# Run tests
npm test
```

---

## 🐛 Bugs Fixed in Assessment

### Smart Contract Fixes (3)
1. **Deprecated `now` → `block.timestamp`** - Solidity compatibility
2. **Wrong withdrawal recipient** - Buyer now receives deposit, not seller
3. **Negative amount prevention** - Fixed withdrawal calculation

### Backend Fixes (5)
1. **Security vulnerability removed** - Suspicious code execution eliminated
2. **Case sensitivity bug** - Variable naming corrected
3. **Deprecated MongoDB method** - Updated to `updateOne()`
4. **Response property fix** - `nModified` → `modifiedCount`
5. **Schema date handling** - Fixed `Date.now()` reference

---

## ✅ Testing

### Test Files Created
```bash
# Smart Contract Tests
contracts/HomeTransaction.test.js
├── State transitions
├── Role-based access control
├── Deposit validation
├── Withdrawal logic
└── Finalization process

# API Tests
server/tests/property.test.js
├── Property listing
├── Single property retrieval
├── Filtering & search
├── Create property
└── Update property status
```

### Running Tests
```bash
npm test
```

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs with salt rounds
- **Role-Based Access** - Seller, Buyer, Realtor, Admin roles
- **Input Validation** - Mongoose schema validation
- **CORS Protection** - Cross-origin request handling
- **Error Handling** - Comprehensive error middleware
- **Smart Contract Audits** - Fixed security vulnerabilities

---

## 📊 Database Schema

### User Schema
```javascript
{
  fname: String,
  lname: String,
  email: String (unique),
  phoneNo: String,
  password: String (hashed),
  userType: String (buyer, seller, realtor, admin),
  state: ObjectId (ref: State),
  city: ObjectId (ref: City),
  pincode: String,
  createdOn: Date
}
```

### Property Schema
```javascript
{
  title: String,
  propertyFor: String (sell, rent),
  type: ObjectId (ref: PropertyType),
  price: Number,
  address: String,
  state: ObjectId,
  city: ObjectId,
  locality: String,
  length: Number,
  breadth: Number,
  isSociety: Boolean,
  societyName: String,
  flatNo: String,
  email: String,
  phoneNo: String,
  pincode: String,
  userId: ObjectId (ref: User),
  status: String (available, sold, rented, expired),
  images: [String],
  slug: String (unique),
  isActive: Boolean,
  createdOn: Date,
  updatedOn: Date
}
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/change-password` - Change password

### Properties
- `GET /api/property/full-list` - All properties
- `GET /api/property/single/:slug` - Single property
- `GET /api/property/user/:userId` - User's properties
- `GET /api/property/filter` - Filter properties
- `POST /api/property/add` - Create property
- `PATCH /api/property/mark-as-sold/:slug` - Update status

### Users
- `GET /api/user/list` - All users
- `GET /api/user/:userId` - User details
- `PUT /api/user/update` - Update user

### Common
- `GET /api/common/states` - States list
- `GET /api/common/cities` - Cities list
- `GET /api/common/property-types` - Property types

---

## 🔗 Smart Contract Interaction

### Factory Contract
```solidity
// Create new transaction contract
HomeTransaction tx = factory.create(
    address,
    zip,
    city,
    realtorFee,
    price,
    seller,
    buyer
);

// Get contract instance
HomeTransaction contract = factory.getInstance(index);
```

### Transaction Flow
```
1. Seller signs → WaitingBuyerSignature
2. Buyer signs & pays deposit → WaitingRealtorReview
3. Realtor reviews → WaitingFinalization or Rejected
4. Buyer finalizes payment → Finalized
5. Funds distributed to seller & realtor
```

---

## 📈 Performance Considerations

- **Caching:** Property listings cached at API level
- **Indexing:** MongoDB indexes on frequently queried fields
- **File Storage:** GridFS for efficient image storage
- **Compression:** gzip compression for responses
- **Socket.io:** Real-time updates with WebSocket

---

## 🛠️ Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| **Frontend** | React, Three.js, Tailwind CSS |
| **Backend** | Node.js, Express, MongoDB |
| **Smart Contracts** | Solidity, Ethereum |
| **Authentication** | JWT, bcryptjs |
| **Database** | MongoDB, GridFS |
| **Real-time** | Socket.io |
| **Testing** | Jest, Supertest |
| **Email** | SendGrid |

---

## 📝 Documentation

- `FIXES_SUMMARY.md` - Bug fixes and improvements
- `SECURITY_AUDIT.md` - Security vulnerabilities audit
- `FINAL_STATUS.md` - Assessment completion status

---

## 👤 Author

**Manikanta Reddy**

---

## 📄 License

This project is provided as-is for assessment purposes.

---

## 🎯 Key Features Demonstrated

✅ Full-stack development (Frontend, Backend, Smart Contracts)  
✅ Blockchain integration (Ethereum, Solidity)  
✅ Database design & optimization (MongoDB)  
✅ API design & implementation (RESTful)  
✅ Authentication & security (JWT, bcryptjs)  
✅ Error handling & validation  
✅ Testing & quality assurance  
✅ Code documentation  
✅ Security awareness & auditing  
✅ Professional git practices  

---

## 📞 Questions or Feedback?

For more details on bug fixes and improvements, see:
- [FIXES_SUMMARY.md](./FIXES_SUMMARY.md)
- [SECURITY_AUDIT.md](./SECURITY_AUDIT.md)
- [FINAL_STATUS.md](./FINAL_STATUS.md)
