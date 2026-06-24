# 🚀 Bounty Chickens — Quick Start Guide

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open your browser to: `http://localhost:5173`

### 3. Access Admin Dashboard
Navigate to: `http://localhost:5173/#/admin/login`

**Login Credentials:**
- Username: `admin`
- Password: `bounty2026`

---

## 📱 How to Use the App

### For Customers (Public Site)

#### Browse Products
1. Visit the homepage (`/`)
2. Scroll to **"Shop Products"** section
3. Browse 5 products with prices:
   - Full Chicken (Dressed) — $8.00
   - Full Chicken (Live) — $7.50
   - Chicken Cuts 1kg — $4.00
   - Chicken Cuts 2kg — $8.25
   - Farm Eggs (30) — $6.00

#### Add to Cart
1. Click **"Add to cart"** on any product
2. Use +/- buttons to adjust quantity
3. See floating cart summary at bottom
4. Click cart to call and place order

#### Contact the Team
- **Sales & Orders**: Thompson Nkomo — 0771734760
- **Accounts**: Primrose Nkomo — 0772390576
- **Customer Care**: Octavia Nkomo — 0787863168

All phone numbers are clickable links on mobile.

---

### For Admin (Dashboard)

#### 1. Overview Dashboard
After logging in, you'll see:
- **Stock Value**: Total value of inventory
- **Units in Stock**: Total quantity across all products
- **Revenue Today**: Sales for current day
- **Revenue This Week**: 7-day total
- **Deaths This Month**: Mortality count
- **Revenue Chart**: Visual 7-day trend
- **Stock Breakdown**: Pie chart by product
- **Recent Activity**: Last 5 sales and deaths

#### 2. Record a Sale
1. Go to **Sales** page (left sidebar)
2. Click **"Record Sale"** button
3. Fill in the form:
   - Select product from dropdown
   - Enter quantity
   - Customer name and phone
   - Payment method (cash/ecocash/transfer/card)
4. Click **"Confirm Sale"**
5. Stock updates automatically!

**Note**: Deleting a sale restores the stock.

#### 3. Manage Inventory
1. Go to **Inventory** page
2. View all products with stock levels
3. **Adjust Stock**:
   - Click the chart icon on any product
   - Choose: Stock In / Stock Out / Set To
   - Enter quantity and reason
   - Click "Apply Adjustment"
4. **Edit Product**:
   - Click the edit icon
   - Update name, price, stock, description
   - Click "Save changes"
5. **Delete Product**:
   - Click the trash icon
   - Confirm deletion

**Stock Status Badges**:
- 🟢 **Healthy**: 20+ units
- 🟡 **Low**: Under 20 units
- 🔴 **Out of stock**: 0 units

#### 4. Track Mortality
1. Go to **Mortality** page
2. Click **"Record Death"** button
3. Fill in:
   - Number of birds
   - Category (broiler/layer)
   - Cause (disease, heat stress, etc.)
   - Notes (barn location, time, observations)
4. Click **"Record"**
5. View statistics: Total, Broilers, Layers

#### 5. Manage Product Catalog
1. Go to **Product Catalog** page
2. **Add New Product**:
   - Click "Add Product"
   - Fill in: name, price, stock, unit, category
   - Add description and image URL
   - Click "Add Product"
3. **Hide/Show Products**:
   - Click "Hide" to remove from public site
   - Click "Show" to make visible again
4. **Delete Product**:
   - Click trash icon
   - Confirm deletion

---

## 📊 Understanding the Dashboard

### Real-Time Updates
- **Instant**: All changes reflect immediately
- **Automatic**: Stock updates when sales are recorded
- **Persistent**: Data saves to browser localStorage
- **Live Indicator**: Pulsing green dot shows active data

### Key Metrics Explained

**Stock Value**: `stock × price` for all products
- Example: 100 chickens × $8 = $800 stock value

**Revenue Today**: Sum of all sales recorded today
- Resets at midnight

**Revenue This Week**: Last 7 days of sales
- Rolling window, updates daily

**Low Stock Count**: Products with < 20 units
- Triggers warning badges on public site

**Deaths This Month**: Total mortality events
- Helps identify health patterns

---

## 💾 Data Storage

All data is stored in your browser's localStorage:
- **Products**: Inventory and catalog
- **Sales**: Transaction history
- **Mortality**: Death records
- **Adjustments**: Stock changes

**Important Notes**:
- Data persists across browser refreshes
- Data is specific to each browser/device
- Clearing browser data will reset everything
- For multi-device sync, you'd need a backend database

---

## 🔄 Common Workflows

### Daily Operations

#### Morning Check-in
1. Login to admin dashboard
2. Check **Overview** for yesterday's stats
3. Review **Recent Mortality** for any issues
4. Check **Inventory** for low stock alerts

#### Recording Sales Throughout Day
1. Go to **Sales** page
2. Click **"Record Sale"** for each transaction
3. Enter customer details and payment method
4. Stock updates automatically

#### End of Day
1. Review **Revenue Today** on dashboard
2. Check **Stock Levels** for tomorrow
3. Note any products that need restocking
4. Record any mortality events

### Weekly Operations

#### Stock Replenishment
1. Go to **Inventory** page
2. Identify products with low stock
3. Click chart icon → **"Stock In"**
4. Enter quantity received
5. Add reason: "New batch from barn 2"

#### Performance Review
1. Check **Revenue This Week** on dashboard
2. Review **Revenue Chart** for trends
3. Analyze **Stock Breakdown** pie chart
4. Identify best-selling products

### Monthly Operations

#### Mortality Analysis
1. Go to **Mortality** page
2. Review **Total Deaths This Month**
3. Look for patterns in causes
4. Check if broilers or layers have higher mortality

#### Product Catalog Updates
1. Go to **Product Catalog** page
2. Update prices if needed
3. Add seasonal products
4. Hide discontinued items

---

## 🛠️ Troubleshooting

### "I can't login to admin"
- Make sure you're using: `admin` / `bounty2026`
- Check you're at `#/admin/login` not just `/admin`
- Clear browser cache and try again

### "Stock isn't updating"
- Refresh the page
- Check browser console for errors
- Make sure localStorage is enabled

### "Data disappeared"
- You may have cleared browser data
- Data is browser-specific (not synced across devices)
- Check if you're on a different browser/device

### "Charts aren't showing"
- Wait a moment for data to load
- Check if you have any sales recorded yet
- Refresh the page

### "I accidentally deleted a sale"
- Deleted sales restore stock automatically
- You can't undo deletion, but stock is corrected
- Re-record the sale if needed

---

## 📱 Mobile Usage

The app is fully responsive:
- **Admin Dashboard**: Works on tablets and phones
- **Touch-Friendly**: Large buttons and controls
- **Swipeable Tables**: Horizontal scroll for wide tables
- **Click-to-Call**: Phone numbers open dialer

**Best Mobile Experience**:
- Use landscape mode for tables
- Tap hamburger menu for navigation
- Swipe charts to explore data

---

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

This creates a single `dist/index.html` file (968 KB) that contains everything.

### Deploy Options

#### Option 1: Static Hosting (Recommended)
Upload `dist/index.html` to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any static host

#### Option 2: Local Network
1. Run `npm run build`
2. Serve `dist/` folder with any web server
3. Access from any device on your network

#### Option 3: Email/Share
Since it's a single HTML file, you can:
- Email it to yourself
- Put it on a USB drive
- Share via cloud storage

---

## 🔐 Security Reminders

This is a **demo application** with client-side storage:

### Current Limitations
- Admin password is in code (not secure)
- Data stored in browser (not backed up)
- No multi-user support
- No audit trail

### For Production Use
You would need:
1. **Backend API** (Node.js, Python, etc.)
2. **Database** (PostgreSQL, MongoDB, etc.)
3. **Real Authentication** (JWT, OAuth)
4. **User Management** (roles, permissions)
5. **Backup System** (automated database backups)
6. **HTTPS** (SSL certificate)

---

## 📞 Support & Contact

**For App Issues**:
- Check this guide first
- Review browser console for errors
- Try clearing browser cache

**For Business Inquiries**:
- **Sales**: Thompson Nkomo — 0771734760
- **Accounts**: Primrose Nkomo — 0772390576
- **Customer Care**: Octavia Nkomo — 0787863168

---

## 🎓 Tips & Best Practices

### Data Management
- **Record sales immediately** for accurate stock
- **Use descriptive reasons** for stock adjustments
- **Log mortality promptly** to track patterns
- **Review dashboard daily** to catch issues early

### Customer Service
- **Check stock before confirming** orders
- **Use low stock alerts** to reorder proactively
- **Keep contact info handy** for quick callbacks
- **Note customer preferences** for repeat business

### Performance Optimization
- **Clear old sales data** monthly if app slows down
- **Use search** to find specific transactions
- **Bookmark admin page** for quick access
- **Train staff** on recording sales correctly

---

## 🎉 You're Ready!

You now have a complete farm management system:
- ✅ Public product showcase
- ✅ Shopping cart for customers
- ✅ Real-time inventory tracking
- ✅ Sales recording and analytics
- ✅ Mortality monitoring
- ✅ Product catalog management
- ✅ Beautiful, responsive design
- ✅ Persistent data storage

**Start by recording your first sale and watching the dashboard come alive!**

---

Built with ❤️ for the Nkomo family farm
