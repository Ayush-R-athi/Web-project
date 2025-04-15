// modules and helper functions can be defined here
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  
    // Smooth Scrolling for Navbar Links
    document.querySelectorAll('a.nav-link, a.mobile-nav-link, a.footer-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    // Form Validation for Contact Form
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('.input-field').forEach(input => {
        const errorMsg = input.parentElement.querySelector('.error-msg');
        if (!input.value.trim()) {
          errorMsg.classList.remove('hidden');
          valid = false;
        } else {
          errorMsg.classList.add('hidden');
        }
      });
      if (valid) {
        document.getElementById('form-success').classList.remove('hidden');
        setTimeout(() => {
          document.getElementById('form-success').classList.add('hidden');
          form.reset();
        }, 3000);
      }
    });
  
    // Upload Button Ripple Animation & Disclaimer Popup
    const uploadBtn = document.getElementById('upload-btn');
    const disclaimerModal = document.getElementById('disclaimer-modal');
    const closeDisclaimer = document.getElementById('close-disclaimer');
    const fileInput = document.getElementById('file-input');
    const uploadPreview = document.getElementById('upload-preview');
  
    uploadBtn.addEventListener('click', function(e) {
      // Ripple Animation Handling
      const rect = this.getBoundingClientRect();
      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) existingRipple.remove();
      const circle = document.createElement('span');
      circle.classList.add('ripple');
      circle.style.width = circle.style.height = Math.max(rect.width, rect.height) + 'px';
      circle.style.left = e.clientX - rect.left - rect.width/2 + 'px';
      circle.style.top = e.clientY - rect.top - rect.width/2 + 'px';
      this.appendChild(circle);
  
      // Show Disclaimer Popup (ensure it overlays above all elements)
      disclaimerModal.classList.remove('hidden');
    });
  
    closeDisclaimer.addEventListener('click', function() {
      disclaimerModal.classList.add('hidden');
      // Trigger file selection after closing disclaimer
      fileInput.click();
    });
  
    // Handle file selection and preview
    fileInput.addEventListener('change', function() {
      const file = this.files[0];
      if(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          uploadPreview.innerHTML = `<p class="mb-2 text-center text-lg">Your Uploaded Image:</p>
          <img src="${e.target.result}" alt="Uploaded Image" class="w-full rounded border border-gray-700 mt-4" />`;
        }
        reader.readAsDataURL(file);
      }
    });
  
    // Particle Animation for Hero Section (with edges)
    const canvas = document.getElementById('particle-canvas');
    if(canvas) {
      const ctx = canvas.getContext('2d');
      let particles = [];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      class Particle {
        constructor(){
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 1;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 - 0.5;
        }
        update(){
          this.x += this.speedX;
          this.y += this.speedY;
          if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw(){
          ctx.fillStyle = 'rgba(57,255,20,0.8)';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
  
      function initParticles(){
        particles = [];
        for(let i = 0; i < 100; i++){
          particles.push(new Particle());
        }
      }
      function drawEdges() {
        for(let i = 0; i < particles.length; i++){
          for(let j = i + 1; j < particles.length; j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < 100) {
              ctx.strokeStyle = `rgba(57,255,20,${1 - distance/100})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      function animateParticles(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
        drawEdges();
        requestAnimationFrame(animateParticles);
      }
      initParticles();
      animateParticles();
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      });
    }
  
    // Particle Animation for Disease Prediction Section with Edges and Higher Concentration
    const dCanvas = document.getElementById('disease-particle-canvas');
    if(dCanvas) {
      const dCtx = dCanvas.getContext('2d');
      let dParticles = [];
      dCanvas.width = dCanvas.parentElement.offsetWidth;
      dCanvas.height = dCanvas.parentElement.offsetHeight;
      
      class DParticle {
        constructor(){
          this.x = Math.random() * dCanvas.width;
          this.y = Math.random() * dCanvas.height;
          this.size = Math.random() * 2 + 1;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 - 0.5;
        }
        update(){
          this.x += this.speedX;
          this.y += this.speedY;
          if(this.x < 0 || this.x > dCanvas.width) this.speedX *= -1;
          if(this.y < 0 || this.y > dCanvas.height) this.speedY *= -1;
        }
        draw(){
          dCtx.fillStyle = 'rgb(67, 66, 66)';
          dCtx.beginPath();
          dCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          dCtx.fill();
        }
      }
  
      function initDParticles(){
        dParticles = [];
        // Increased concentration: 120 particles for enhanced effect
        for(let i = 0; i < 120; i++){
          dParticles.push(new DParticle());
        }
      }
      function drawDEdges() {
        for(let i = 0; i < dParticles.length; i++){
          for(let j = i + 1; j < dParticles.length; j++){
            const dx = dParticles[i].x - dParticles[j].x;
            const dy = dParticles[i].y - dParticles[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < 80) {
              dCtx.strokeStyle = `rgba(200,200,200,${1 - distance/80})`;
              dCtx.lineWidth = 0.5;
              dCtx.beginPath();
              dCtx.moveTo(dParticles[i].x, dParticles[i].y);
              dCtx.lineTo(dParticles[j].x, dParticles[j].y);
              dCtx.stroke();
            }
          }
        }
      }
      function animateDParticles(){
        dCtx.clearRect(0, 0, dCanvas.width, dCanvas.height);
        dParticles.forEach(p => {
          p.update();
          p.draw();
        });
        drawDEdges();
        requestAnimationFrame(animateDParticles);
      }
      initDParticles();
      animateDParticles();
      window.addEventListener('resize', () => {
        dCanvas.width = dCanvas.parentElement.offsetWidth;
        dCanvas.height = dCanvas.parentElement.offsetHeight;
        initDParticles();
      });
    }
  });
