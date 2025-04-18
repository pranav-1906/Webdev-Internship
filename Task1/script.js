function showMessage() {
    alert("Hello! You clicked the button!");
  }
  
  function changeBackground() {
    const colors = ['#eafaf1', '#ffe0b2', '#f3e5f5', '#e1f5fe', '#fbe9e7'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
  }
  
  function toggleText() {
    const para = document.getElementById("toggle-paragraph");
    if (para.style.display === "none") {
      para.style.display = "block";
    } else {
      para.style.display = "none";
    }
  }  