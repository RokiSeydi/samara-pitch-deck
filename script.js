let currentSlideIndex = 0;
let slides, indicators, totalSlides;

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  slides = document.querySelectorAll(".slide");
  indicators = document.querySelectorAll(".indicator");
  totalSlides = slides.length;

  console.log(
    `Initialized with ${totalSlides} slides and ${indicators.length} indicators`
  );

  // Update slide counter
  const totalSlidesElement = document.getElementById("total-slides");
  if (totalSlidesElement) {
    totalSlidesElement.textContent = totalSlides;
  }

  // Show first slide
  showSlide(0);
});

function showSlide(index) {
  console.log(`Showing slide ${index + 1} of ${totalSlides}`);

  if (!slides || !indicators) {
    console.error("Slides or indicators not initialized");
    return;
  }

  // Hide all slides
  slides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  // Show current slide
  if (slides[index]) {
    slides[index].classList.add("active");
  }
  if (indicators[index]) {
    indicators[index].classList.add("active");
  }

  // Update slide counter
  const currentSlideElement = document.getElementById("current-slide");
  if (currentSlideElement) {
    currentSlideElement.textContent = index + 1;
  }
}

function changeSlide(direction) {
  currentSlideIndex += direction;

  // Loop around if at beginning or end
  if (currentSlideIndex >= totalSlides) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = totalSlides - 1;
  }

  showSlide(currentSlideIndex);
}

function currentSlide(index) {
  currentSlideIndex = index - 1;
  showSlide(currentSlideIndex);
}

// Keyboard navigation
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowUp":
      changeSlide(-1);
      break;
    case "ArrowRight":
    case "ArrowDown":
    case " ": // Spacebar
      event.preventDefault();
      changeSlide(1);
      break;
    case "Home":
      currentSlide(1);
      break;
    case "End":
      currentSlide(totalSlides);
      break;
    case "Escape":
      // Toggle fullscreen mode
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
      break;
  }
});

// Touch/swipe support for mobile
let startX = 0;
let startY = 0;

document.addEventListener("touchstart", function (event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
});

document.addEventListener("touchend", function (event) {
  if (!startX || !startY) {
    return;
  }

  const endX = event.changedTouches[0].clientX;
  const endY = event.changedTouches[0].clientY;

  const diffX = startX - endX;
  const diffY = startY - endY;

  // Determine if swipe was more horizontal or vertical
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Horizontal swipe
    if (Math.abs(diffX) > 50) {
      // Minimum swipe distance
      if (diffX > 0) {
        // Swiped left (next slide)
        changeSlide(1);
      } else {
        // Swiped right (previous slide)
        changeSlide(-1);
      }
    }
  }

  // Reset values
  startX = 0;
  startY = 0;
});

// Auto-advance slides (optional - commented out by default)
// let autoAdvanceInterval;
//
// function startAutoAdvance() {
//     autoAdvanceInterval = setInterval(() => {
//         changeSlide(1);
//     }, 10000); // Advance every 10 seconds
// }
//
// function stopAutoAdvance() {
//     clearInterval(autoAdvanceInterval);
// }
//
// // Start auto-advance
// startAutoAdvance();
//
// // Pause auto-advance on user interaction
// document.addEventListener('click', stopAutoAdvance);
// document.addEventListener('keydown', stopAutoAdvance);
// document.addEventListener('touchstart', stopAutoAdvance);

// Presentation mode toggle
function togglePresentationMode() {
  document.body.classList.toggle("presentation-mode");
}

// Add presentation mode styles
const presentationModeStyles = `
    .presentation-mode .navigation,
    .presentation-mode .slide-indicators,
    .presentation-mode .slide-counter {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .presentation-mode:hover .navigation,
    .presentation-mode:hover .slide-indicators,
    .presentation-mode:hover .slide-counter {
        opacity: 1;
    }
`;

// Inject presentation mode styles
const styleSheet = document.createElement("style");
styleSheet.textContent = presentationModeStyles;
document.head.appendChild(styleSheet);

// Add keyboard shortcut for presentation mode (P key)
document.addEventListener("keydown", function (event) {
  if (event.key === "p" || event.key === "P") {
    togglePresentationMode();
  }
});

// Initialize
showSlide(currentSlideIndex);

// Add smooth scrolling for better transitions
document.addEventListener("DOMContentLoaded", function () {
  // Add any initialization code here
  console.log("Pitch deck loaded successfully!");
  console.log("Keyboard shortcuts:");
  console.log("- Arrow keys or spacebar: Navigate slides");
  console.log("- Home/End: Go to first/last slide");
  console.log("- P: Toggle presentation mode");
  console.log("- Escape: Toggle fullscreen");
});
