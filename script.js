document.addEventListener('DOMContentLoaded', () => {
    // Set current date
    const currentDateEl = document.getElementById('currentDate');
    if (currentDateEl) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        currentDateEl.textContent = today.toLocaleDateString('en-US', options);
    }

    // Love counter animation
    const animateCountUp = (el, end, duration) => {
        let start = 0;
        const range = end - start;
        let current = start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        
        const timer = setInterval(() => {
            current += increment;
            el.textContent = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    };

    const text = "A Word From My Deepest Heart";
    const typewriterElement = document.getElementById('typewriter-title');
        let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typewriterElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100); // Kecepatan mengetik
        }
    }

    // Jalankan saat elemen terlihat di layar (bisa dikombinasikan dengan Intersection Observer)
    // Untuk sederhananya, kita jalankan setelah halaman dimuat:
    window.addEventListener('load', typeWriter);

    const daysTogether = document.getElementById('daysTogether');
    const momentsShared = document.getElementById('momentsShared');
    const smilesGiven = document.getElementById('smilesGiven');

    if (daysTogether && momentsShared && smilesGiven) {
        // Replace with your actual dates and numbers
        const startDate = new Date('2022-01-01');
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        animateCountUp(daysTogether, diffDays, 2000);
        animateCountUp(momentsShared, 1500, 2500); // Example number
        animateCountUp(smilesGiven, 9999, 3000);   // Example number
    }

    // Memories Slider
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (slider && slides.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;

        function showSlide(index) {
            if (index < 0) {
                currentIndex = slides.length - 1;
            } else if (index >= slides.length) {
                currentIndex = 0;
            }
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function nextSlide() {
            currentIndex++;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex--;
            showSlide(currentIndex);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 10000);
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        let autoSlideInterval = setInterval(nextSlide, 10000);
    }

    // Music controls: play / pause / volume / mute and dynamic panel toggle
    const backgroundMusic = document.getElementById('background-music');
    const playBtn = document.getElementById('music-play-btn');
    const pauseBtn = document.getElementById('music-pause-btn');
    const volumeSlider = document.getElementById('music-volume');
    const muteBtn = document.getElementById('music-mute-btn');
    const toggleBtn = document.getElementById('music-toggle');
    const musicPanel = document.getElementById('music-panel');
    const volumeLabel = document.getElementById('volume-label');

    if (backgroundMusic) {
        if (typeof backgroundMusic.volume === 'number') backgroundMusic.volume = 0.5;

        if (playBtn) playBtn.addEventListener('click', () => backgroundMusic.play().catch(() => {}));
        if (pauseBtn) pauseBtn.addEventListener('click', () => backgroundMusic.pause());

        const muteIcon = muteBtn ? muteBtn.querySelector('i') : null;

        const updateVolLabel = (v) => {
            if (volumeLabel) volumeLabel.textContent = Math.round(v * 100) + '%';
        };

        if (volumeSlider) {
            volumeSlider.value = backgroundMusic.volume;
            updateVolLabel(backgroundMusic.volume);
            volumeSlider.addEventListener('input', (e) => {
                const vol = parseFloat(e.target.value);
                backgroundMusic.volume = vol;
                backgroundMusic.muted = vol === 0;
                updateVolLabel(vol);
                if (muteIcon) {
                    muteIcon.classList.toggle('fa-volume-mute', backgroundMusic.muted);
                    muteIcon.classList.toggle('fa-volume-up', !backgroundMusic.muted);
                }
            });
        }

        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                backgroundMusic.muted = !backgroundMusic.muted;
                if (muteIcon) {
                    muteIcon.classList.toggle('fa-volume-mute', backgroundMusic.muted);
                    muteIcon.classList.toggle('fa-volume-up', !backgroundMusic.muted);
                }
                if (!backgroundMusic.muted && volumeSlider) volumeSlider.value = backgroundMusic.volume;
                if (volumeLabel) updateVolLabel(backgroundMusic.volume);
            });
        }
    }

    // Toggle panel behavior: clicking the music icon opens/closes the options panel.
    if (toggleBtn && musicPanel) {
        toggleBtn.addEventListener('click', (e) => {
            const opened = musicPanel.classList.toggle('open');
            toggleBtn.setAttribute('aria-expanded', opened);
            musicPanel.setAttribute('aria-hidden', !opened);
        });

        // Close the panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!musicPanel.classList.contains('open')) return;
            if (musicPanel.contains(e.target) || toggleBtn.contains(e.target)) return;
            musicPanel.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', false);
            musicPanel.setAttribute('aria-hidden', true);
        });
    }
});