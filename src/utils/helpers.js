// Utility functions for the Skote Admin Dashboard

/**
 * Format numbers with commas for better readability
 * @param {number} num - The number to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Format currency values
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
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
 * Get status color based on status type
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
    'published': 'success'
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
 * Debounce function for search inputs
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate sample user data for demos
 * @param {number} count - Number of users to generate
 * @returns {Array} - Array of user objects
 */
export const generateSampleUsers = (count = 10) => {
  const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Lisa', 'Tom', 'Emily', 'Chris', 'Amy'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design', 'Support'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: `USR${String(index + 1).padStart(3, '0')}`,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: `user${index + 1}@example.com`,
    department: departments[Math.floor(Math.random() * departments.length)],
    status: Math.random() > 0.2 ? 'active' : 'inactive',
    joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    avatar: `https://ui-avatars.com/api/?name=User+${index + 1}&background=random`
  }));
};

/**
 * Generate sample sales data
 * @param {number} days - Number of days of data
 * @returns {Array} - Array of sales data objects
 */
export const generateSalesData = (days = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      sales: Math.floor(Math.random() * 10000) + 5000,
      orders: Math.floor(Math.random() * 100) + 20,
      customers: Math.floor(Math.random() * 50) + 10
    });
  }
  
  return data;
};

/**
 * Color palette for charts
 */
export const chartColors = {
  primary: '#556ee6',
  success: '#34c38f',
  warning: '#f1b44c',
  danger: '#f46a6a',
  info: '#50a5f1',
  secondary: '#74788d',
  light: '#f8f9fa',
  dark: '#343a40'
};

/**
 * Common chart options for ApexCharts
 */
export const getDefaultChartOptions = (title = '') => ({
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  title: {
    text: title,
    style: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#495057'
    }
  },
  colors: [chartColors.primary],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  grid: {
    borderColor: '#f1f1f1',
    strokeDashArray: 3
  },
  xaxis: {
    labels: {
      style: {
        colors: '#8c9097'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#8c9097'
      }
    }
  }
});

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
