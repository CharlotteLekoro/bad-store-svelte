<div class="loading-container">
    <div class="loading-dots">
      <div class="dot dot1"></div>
      <div class="dot dot2"></div>
      <div class="dot dot3"></div>
      <div class="dot dot4"></div>
    </div>
    <p class="loading-text">L O A D I N G . . .</p>
  </div>
  
  <style>
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  
    .loading-dots {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin: 0 10px;
      animation: bounce 1.4s infinite ease-in-out both;
    }
  
    .dot1 {
      background-color: #32312f; 
      animation-delay: -0.32s;
    }
  
    .dot2 {
      background-color: #4d4a45; 
      animation-delay: -0.16s;
    }
  
    .dot3 {
      background-color: #4a4946; 
    }
  
    .dot4 {
      background-color: #54524e; 
      animation-delay: 0.16s;
    }
  
    .loading-text {
      margin-top: 20px;
      font-size: 1.2rem;
      color: #333;
      font-weight: bold;
    }
  
    @keyframes bounce {
      0%, 80%, 100% { 
        transform: scale(0);
      }
      40% { 
        transform: scale(1.0);
      }
    }
  </style>