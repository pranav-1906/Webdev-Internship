// Quote display functionality
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const quoteError = document.getElementById('quote-error');
  const loadingSpinner = document.getElementById('loading-spinner');
  const refreshButton = document.getElementById('refresh-quote');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastDescription = document.getElementById('toast-description');
  
  // Fallback quotes related to environment and sustainability
  const fallbackQuotes = [
    {
      text: "The Earth does not belong to us: we belong to the Earth.",
      author: "Marlee Matlin"
    },
    {
      text: "The greatest threat to our planet is the belief that someone else will save it.",
      author: "Robert Swan"
    },
    {
      text: "We won't have a society if we destroy the environment.",
      author: "Margaret Mead"
    },
    {
      text: "Nature is not a place to visit. It is home.",
      author: "Gary Snyder"
    },
    {
      text: "We do not inherit the Earth from our ancestors; we borrow it from our children.",
      author: "Native American Proverb"
    }
  ];
  
  // Function to get a random fallback quote
  function getRandomFallbackQuote() {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  }
  
  // Function to show toast notification
  function showToast(message, description) {
    toastMessage.textContent = message;
    toastDescription.textContent = description;
    toast.classList.remove('hidden');
    toast.classList.add('visible');
    
    // Hide toast after 5 seconds
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 5000);
  }
  
  // Function to fetch a quote from the API
  async function fetchQuote() {
    // Show loading spinner
    quoteText.textContent = '';
    quoteAuthor.textContent = '';
    quoteError.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    
    try {
      // Add timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://api.quotable.io/random?tags=environmental,nature,inspirational', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      
      const data = await response.json();
      
      // Display the quote
      quoteText.textContent = `"${data.content}"`;
      quoteAuthor.textContent = `— ${data.author}`;
      
    } catch (err) {
      console.error('Error fetching quote:', err);
      
      // Use fallback quote
      const fallbackQuote = getRandomFallbackQuote();
      quoteText.textContent = `"${fallbackQuote.text}"`;
      quoteAuthor.textContent = `— ${fallbackQuote.author}`;
      
      // Show error message
      quoteError.textContent = 'Unable to load from API. Using local quotes instead.';
      quoteError.classList.remove('hidden');
      
      // Show toast notification
      showToast(
        'Using offline quotes', 
        'We\'re currently using our offline collection of eco-quotes.'
      );
    } finally {
      // Hide loading spinner
      loadingSpinner.classList.add('hidden');
    }
  }
  
  // Initial quote fetch
  fetchQuote();
  
  // Event listener for refresh button
  refreshButton.addEventListener('click', () => {
    // Add rotation animation to refresh icon
    const refreshIcon = refreshButton.querySelector('.refresh-icon');
    refreshIcon.style.display = 'inline-block';
    refreshIcon.style.animation = 'spin 1s linear';
    
    // Fetch a new quote
    fetchQuote();
    
    // Remove animation after it completes
    setTimeout(() => {
      refreshIcon.style.animation = '';
    }, 1000);
  });
  
  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
});
