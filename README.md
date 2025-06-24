# 🇮🇳 Indian Techno Dashboard - Skote React Admin

A modern, Indian-themed React admin dashboard with techno/funky styling, built on top of Skote Admin Template.

## 🌟 Features

### 🎨 Indian Localization
- **Names & Cities**: All data uses authentic Indian names and cities
- **Currency**: Complete INR (₹) formatting with Lakh/Crore notation
- **Products**: Indian products and services throughout demos
- **Bilingual Support**: Hindi/English labels and content

### 🎵 Techno/Funky Theme
- **Neon Colors**: Vibrant cyan, purple, and green color scheme
- **Animations**: Smooth hover effects and transitions
- **Modern UI**: Gradient backgrounds and glassmorphism effects
- **Responsive Design**: Mobile-first approach with fluid layouts

### 📊 Dashboard Components
- **Analytics Cards**: Revenue, orders, customers, growth metrics
- **Interactive Charts**: ApexCharts with Indian data
- **Data Tables**: Sortable tables with Indian entries
- **Real-time Updates**: Live data simulation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/indian-techno-dashboard.git
   cd indian-techno-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/
│   ├── Dashboard/       # Main dashboard
│   ├── IndianTechnoDashboard/  # Special Indian-themed dashboard
│   ├── CustomDemo/      # Custom demo pages
│   └── EnhancedDemo/    # Enhanced demo features
├── utils/
│   ├── helpers.js       # General utilities
│   └── indianHelpers.js # Indian-specific data generators
├── assets/
│   └── scss/
│       └── techno-theme.scss  # Techno styling
└── routes/              # Application routing
```

## 🎯 Key Pages

### 1. Indian Techno Dashboard (`/indian-techno-dashboard`)
- Modern techno-styled interface
- Indian names: Rajesh Kumar, Priya Sharma, Amit Patel, etc.
- Cities: Mumbai, Delhi, Bangalore, Chennai, Kolkata
- Products: Smartphones, Laptops, Traditional Wear, Spices
- Currency: ₹1,23,456 (Indian Lakh/Crore format)

### 2. Enhanced Demo (`/enhanced-demo`)
- Advanced chart demonstrations
- Interactive data visualization
- Real-time updates simulation

### 3. Custom Demo (`/custom-demo`)
- Custom component showcases
- Form handling examples
- UI pattern demonstrations

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Key Technologies
- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **Bootstrap 5** - CSS framework
- **ApexCharts** - Data visualization
- **React Router** - Client-side routing
- **SCSS** - Enhanced styling

## 🎨 Customization

### Adding Indian Data
```javascript
// utils/indianHelpers.js
export const generateIndianName = () => {
  const firstNames = ['Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram'];
  const lastNames = ['Kumar', 'Sharma', 'Patel', 'Singh', 'Gupta'];
  // ... implementation
};
```

### Techno Theme Customization
```scss
// assets/scss/techno-theme.scss
:root {
  --neon-cyan: #00ffff;
  --neon-purple: #ff00ff;
  --neon-green: #39ff14;
  // ... more variables
}
```

## 📊 Indian Data Examples

### Names Used
- Rajesh Kumar, Priya Sharma, Amit Patel
- Sneha Singh, Vikram Gupta, Anita Rao
- Rohit Joshi, Kavya Nair, Suresh Reddy

### Cities Featured
- Mumbai, Delhi, Bangalore, Chennai
- Kolkata, Hyderabad, Pune, Ahmedabad
- Jaipur, Lucknow, Kochi, Indore

### Products & Services
- Electronics: Smartphones, Laptops, Tablets
- Fashion: Traditional Wear, Western Wear
- Food: Spices, Tea, Snacks
- Services: IT Services, Consulting

## 🎭 Author & Attribution

**Created by:** Shubhranshu Pandey  
**Based on:** Skote Admin Template  
**Theme:** Indian Techno/Funky Dashboard  

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact: [Your Contact Information]

## 🙏 Acknowledgments

- Original Skote template creators
- Indian cultural references and data
- React and Vite communities
- Open source contributors

---

**Made with ❤️ in India 🇮🇳**
