document.addEventListener('DOMContentLoaded', function() {
    // Play button logic
    document.querySelectorAll('.play-btn').forEach(button => {
      button.addEventListener('click', function() {
        const videoSection = this.closest('.hero-body');
        const videos = videoSection.querySelectorAll('video');  
        videos.forEach(video => {
          video.play();
        });
      });
    });
  
    // Pause button logic
    document.querySelectorAll('.pause-btn').forEach(button => {
      button.addEventListener('click', function() {
        const videoSection = this.closest('.hero-body');
        const videos = videoSection.querySelectorAll('video');  
        videos.forEach(video => {
          video.pause();
        });
      });
    });
  
    // Backward button logic (reset videos to the start)
    document.querySelectorAll('.backward-btn').forEach(button => {
      button.addEventListener('click', function() {
        const videoSection = this.closest('.hero-body');
        const videos = videoSection.querySelectorAll('video');
        videos.forEach(video => {
          video.currentTime = 0;  // Reset the time to the beginning
        });
      });
    });
  });
  