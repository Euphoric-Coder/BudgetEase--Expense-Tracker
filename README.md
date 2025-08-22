# BudgetEase – Smart Expense Tracker

BudgetEase is a modern expense tracker app designed to make personal finance simple, visual, and effective.  
From adding everyday expenses to bulk uploading via CSV, SpendWise helps you stay on top of your financial health with style.

---

## Features

### Core Features
- **Expense Tracking** – Add, edit, and delete expenses with categories (Food, Travel, Bills, etc.).  
- **Dynamic Updates** – Expenses display instantly without page reload.  
- **Categorization & Analytics** – Group by categories, track totals, and monitor trends.  
- **Responsive UI/UX** – Clean and modern design with light & dark mode support.  

### Advanced Features
- **Interactive Dashboard** – Visual breakdowns of spending patterns and summaries.  
- **Split Expenses** – Share and divide expenses among multiple people.  
- **Real-Time Feedback** – Smooth and interactive updates while adding expenses.  

### Data Input & Upload
- **Receipt Uploads with Auto-Processing** – Upload a receipt image, and the system automatically extracts the **expense details (amount, category, date, etc.)** and adds them into the tracker.  
- **CSV Bulk Upload** – Import multiple expenses at once via CSV file.  

---

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS  
- **Backend**: Node.js / Express (or FastAPI if Python backend is used)  
- **Database**: MongoDB (with Mongoose ORM)  
- **Authentication**: Clerk / JWT-based login system  
- **Storage**: Local/Cloud storage for receipts (e.g., AWS S3, Cloudinary, or Firebase)  

---

<!-- ## Screenshots
> _(Add screenshots/gifs here to showcase UI and features)_

--- -->

## Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/spendwise.git
   ```
2. **Change Directory**
    ```bash
    cd budgetease
    ```

3. **Install Dependencies**
    ```bash
    npm install
    ```

4. **Setup Environment Variables**
    ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_DATABASE_URL=
    NEXT_PUBLIC_TEST_USER_EMAIL=
    NEXT_PUBLIC_TEST_USER_PASSWORD=
    NEXT_PUBLIC_RESEND_API_KEY=
    NEXT_PUBLIC_WEBSITE=
    NEXT_PUBLIC_SUPPORT_EMAIL=
    ```

5. **Run the App**
    ```bash
    npm run dev
    ```




