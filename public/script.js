$(document).ready(() => {
    // Check if the user is logged in and display appropriate content
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user) {
      // User is logged in
      $('#loginForm').hide();
      $('#dashboard').show();
      $('#username').text(user.username);
      loadVideoList();
    } else {
      // User is not logged in
      $('#loginForm').show();
      $('#dashboard').hide();
    }
  
    // Handle login form submission
    $('#loginForm').submit((e) => {
      e.preventDefault();
  
      const username = $('#usernameInput').val();
      const password = $('#passwordInput').val();
  
      // Send a POST request to your authentication API
      $.post('/auth/login', { username, password }, (data) => {
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.user));
          location.reload();
        } else {
          alert('Login failed. Please check your credentials.');
        }
      });
    });
  
    // Handle logout button click
    $('#logoutBtn').click(() => {
      localStorage.removeItem('user');
      location.reload();
    });
  
    // Load the list of videos
    function loadVideoList() {
      $.get('/videos', (videos) => {
        const videoList = $('#videoList');
        videoList.empty();
  
        videos.forEach((video) => {
          const videoItem = `
            <div class="video-item">
              <h3>${video.title}</h3>
              <iframe width="560" height="315" src="${video.url}" frameborder="0" allowfullscreen></iframe>
              <button class="watchBtn" data-video-id="${video.id}">Watch</button>
            </div>
          `;
          videoList.append(videoItem);
        });
  
        // Handle watch button click
        $('.watchBtn').click(function () {
          const videoId = $(this).data('video-id');
          watchVideo(videoId);
        });
      });
    }
  
    // Watch a video
    function watchVideo(videoId) {
      // Send a POST request to update the watch counter
      $.post('/videos/watch', { videoId }, (data) => {
        if (data.success) {
          alert('Video watched!');
        } else {
          alert('Failed to update watch count.');
        }
      });
    }
  });
  