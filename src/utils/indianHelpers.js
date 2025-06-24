// Indian-themed utility functions for the Skote Admin Dashboard
// Author: Shubhranshu Pandey

/**
 * Format numbers with Indian numbering system (lakhs, crores)
 * @param {number} num - The number to format
 * @returns {string} - Formatted number string in Indian format
 */
export const formatIndianNumber = (num) => {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + ' Cr';
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1) + ' L';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Format currency values in Indian Rupees
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string in INR
 */
export const formatIndianCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Generate random data for charts and demos
 * @param {number} count - Number of data points
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {Array} - Array of random numbers
 */
export const generateRandomData = (count, min = 0, max = 100) => {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

/**
 * Get status color based on status type (with techno theme)
 * @param {string} status - Status string
 * @returns {string} - Bootstrap color class
 */
export const getStatusColor = (status) => {
  const statusColors = {
    'completed': 'success',
    'pending': 'warning',
    'processing': 'info',
    'cancelled': 'danger',
    'active': 'success',
    'inactive': 'secondary',
    'draft': 'secondary',
    'published': 'success',
    'delivered': 'primary',
    'shipped': 'info'
  };
  
  return statusColors[status.toLowerCase()] || 'primary';
};

/**
 * Calculate percentage change between two values
 * @param {number} oldValue - Previous value
 * @param {number} newValue - Current value
 * @returns {object} - Object with percentage and trend
 */
export const calculatePercentageChange = (oldValue, newValue) => {
  if (oldValue === 0) return { percentage: 0, trend: 'neutral' };
  
  const percentage = ((newValue - oldValue) / oldValue) * 100;
  const trend = percentage > 0 ? 'up' : percentage < 0 ? 'down' : 'neutral';
  
  return {
    percentage: Math.abs(percentage).toFixed(1),
    trend,
    raw: percentage
  };
};

/**
 * Generate sample Indian user data for demos
 * @param {number} count - Number of users to generate
 * @returns {Array} - Array of user objects
 */
export const generateIndianUsers = (count = 10) => {
  const firstNames = [
    'Arjun', 'Priya', 'Rohan', 'Ananya', 'Vikram', 'Sneha', 'Karan', 'Riya', 
    'Aditya', 'Kavya', 'Rahul', 'Pooja', 'Siddharth', 'Meera', 'Akash', 
    'Divya', 'Varun', 'Shreya', 'Nikhil', 'Nisha'
  ];
  
  const lastNames = [
    'Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Verma', 'Agarwal', 'Joshi',
    'Reddy', 'Iyer', 'Pandey', 'Malhotra', 'Chopra', 'Nair', 'Sinha',
    'Bansal', 'Saxena', 'Tiwari', 'Yadav', 'Mishra'
  ];
  
  const departments = [
    'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 
    'Design', 'Support', 'Operations', 'Product', 'DevOps'
  ];
  
  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 
    'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];
  
  return Array.from({ length: count }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return {
      id: `EMP${String(index + 1).padStart(3, '0')}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@techcorp.in`,
      department: departments[Math.floor(Math.random() * departments.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      status: Math.random() > 0.2 ? 'active' : 'inactive',
      joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff`
    };
  });
};

/**
 * Generate sample Indian sales data
 * @param {number} days - Number of days of data
 * @returns {Array} - Array of sales data objects
 */
export const generateIndianSalesData = (days = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      sales: Math.floor(Math.random() * 500000) + 250000, // In rupees
      orders: Math.floor(Math.random() * 150) + 30,
      customers: Math.floor(Math.random() * 80) + 20
    });
  }
  
  return data;
};

/**
 * Techno/Funky color palette for charts
 */
export const technoColors = {
  neonBlue: '#00D4FF',
  neonPink: '#FF0080',
  neonGreen: '#00FF88',
  neonPurple: '#8000FF',
  neonOrange: '#FF4000',
  cyberYellow: '#FFFF00',
  darkPurple: '#2D1B69',
  darkBlue: '#0F0F23',
  electricBlue: '#0066FF',
  hotPink: '#FF1493'
};

/**
 * Enhanced chart options with techno theme
 */
export const getTechnoChartOptions = (title = '') => ({
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    background: 'transparent',
    foreColor: '#ffffff'
  },
  title: {
    text: title,
    style: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#ffffff',
      fontFamily: 'Orbitron, monospace'
    }
  },
  colors: [technoColors.neonBlue, technoColors.neonPink, technoColors.neonGreen],
  dataLabels: { 
    enabled: false
  },
  stroke: { 
    curve: 'smooth', 
    width: 3,
    colors: [technoColors.neonBlue]
  },
  grid: {
    borderColor: '#333333',
    strokeDashArray: 3,
    xaxis: {
      lines: { show: true }
    },
    yaxis: {
      lines: { show: true }
    }
  },
  xaxis: {
    labels: {
      style: {
        colors: '#cccccc',
        fontFamily: 'Orbitron, monospace'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#cccccc',
        fontFamily: 'Orbitron, monospace'
      }
    }
  },
  legend: {
    labels: {
      colors: '#ffffff'
    }
  }
});

/**
 * Indian cities for location-based data
 */
export const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad',
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad'
];

/**
 * Indian product categories
 */
export const indianProductCategories = [
  'Electronics & Gadgets',
  'Fashion & Clothing',
  'Home & Kitchen',
  'Books & Education',
  'Sports & Fitness',
  'Health & Beauty',
  'Automotive',
  'Groceries & Food',
  'Mobile & Accessories',
  'Jewellery & Watches'
];

/**
 * Generate Indian orders data
 */
export const generateIndianOrders = () => {
  const customers = [
    'Arjun Sharma', 'Priya Patel', 'Rohan Singh', 'Ananya Kumar', 'Vikram Gupta',
    'Sneha Verma', 'Karan Agarwal', 'Riya Joshi', 'Aditya Reddy', 'Kavya Iyer',
    'Rahul Pandey', 'Pooja Malhotra', 'Siddharth Chopra', 'Meera Nair', 'Akash Sinha'
  ];
  
  const products = [
    'Premium Smartphone', 'Laptop Pro Max', 'Wireless Earbuds', 'Smart Watch',
    'Gaming Console', 'Bluetooth Speaker', 'Power Bank', 'Tablet Ultra',
    'Smart TV', 'Camera Pro', 'Fitness Tracker', 'Drone Camera'
  ];
  
  const statuses = ['Completed', 'Pending', 'Processing', 'Shipped', 'Delivered'];
  const priorities = ['high', 'medium', 'low'];
  
  return Array.from({ length: 8 }, (_, index) => ({
    id: `ORD${String(2540 + index).padStart(4, '0')}`,
    customer: customers[Math.floor(Math.random() * customers.length)],
    product: products[Math.floor(Math.random() * products.length)],
    amount: Math.floor(Math.random() * 80000) + 5000, // In rupees
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    date: new Date(2025, 5, Math.floor(Math.random() * 24) + 1).toISOString().split('T')[0],
    city: indianCities[Math.floor(Math.random() * indianCities.length)]
  }));
};

/**
 * Local storage utilities
 */
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};
