// Portfolio JavaScript

// Frosted Glass Cursor
let glass;
let mouseX = 0;
let mouseY = 0;
let glassX = 0;
let glassY = 0;

function initGlassCursor() {
    glass = document.querySelector('.glass');
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    document.addEventListener('mouseenter', () => {
        glass.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        glass.style.opacity = '0';
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .nav-btn, .thumbnail, .nav-arrow');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            glass.style.transform = 'translate(-50%, -50%) scale(1.2)';
        });
        el.addEventListener('mouseleave', () => {
            glass.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Animate glass cursor
    function animateGlass() {
        glass.style.left = mouseX + 'px';
        glass.style.top = mouseY + 'px';
        
        requestAnimationFrame(animateGlass);
    }
    
    animateGlass();
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Image database
const imageDatabase = {
    portraits: [
        {
            title: 'Portrait 1',
            description: '',
            src: 'images/portrait1.jpg'
        },
        {
            title: 'Portrait 2',
            description: '',
            src: 'images/portrait2.jpg'
        },
        {
            title: 'Portrait 3',
            description: '',
            src: 'images/portrait3.jpg'
        },
        {
            title: 'Portrait 4',
            description: '',
            src: 'images/portrait4.jpg'
        }
    ],
    life: [
        {
            title: 'Hangang Park Bicycle',
            description: '',
            src: 'images/life1.png'
        },
        {
            title: 'Grandpa and Dog',
            description: '',
            src: 'images/life2.png'
        },
        {
            title: 'Sohyun',
            description: '',
            src: 'images/life3.png'
        },
        {
            title: 'Workers in Safety Vests',
            description: '',
            src: 'images/life4.png'
        },
        {
            title: 'Corals at Namdaemun Market',
            description: '',
            src: 'images/life5.png'
        },
        {
            title: 'Haebangchon TV Bus Stop',
            description: '',
            src: 'images/life6.png'
        },
        {
            title: 'Beautiful Flowers in Haebangchon',
            description: '',
            src: 'images/life7.png'
        },
        {
            title: 'Yongsan Park Lights',
            description: '',
            src: 'images/life8.png'
        }
    ],
    landscapes: [
        {
            title: 'Children in Hanbok',
            description: '',
            src: 'images/DreamForest1.png'
        },
        {
            title: 'Lonely Man',
            description: '',
            src: 'images/DreamForest2.png'
        },
        {
            title: 'Kite Flying Moment',
            description: '',
            src: 'images/DreamForest3.png'
        },
        {
            title: 'Father and Daughter with Kite',
            description: '',
            src: 'images/DreamForest4.png'
        },
        {
            title: 'Enjoying the Fountain',
            description: '',
            src: 'images/DreamForest5.png'
        },
        {
            title: 'Who Lives Here?',
            description: '',
            src: 'images/DreamForest6.png'
        },
        {
            title: 'Cute Duck',
            description: '',
            src: 'images/DreamForest7.png'
        }
    ],
    street: [
        {
            title: 'Gyeongungung',
            description: '',
            src: 'images/palace3.png'
        },
        {
            title: 'Inside Gyeongungung',
            description: '',
            src: 'images/palace4.png'
        },
        {
            title: 'Eaves of Gyeongungung',
            description: '',
            src: 'images/palace5.png'
        },
        {
            title: 'Building near Seokjojeon',
            description: '',
            src: 'images/palace6.png'
        },
        {
            title: 'Deoksugung Seokjojeon',
            description: '',
            src: 'images/palace7.png'
        },
        {
            title: 'Campsis Grandiflora',
            description: '',
            src: 'images/palace8.png'
        }
    ],
    night: [
        {
            title: 'Nightscape of Seoulro 7017 #1',
            description: '',
            src: 'images/Night1.png'
        },
        {
            title: 'Nightscape of Seoulro 7017 #2',
            description: '',
            src: 'images/Night2.png'
        },
        {
            title: 'Rose Blossom',
            description: '',
            src: 'images/Night3.png'
        },
        {
            title: 'Purple Spotlight',
            description: '',
            src: 'images/Night4.png'
        },
        {
            title: 'Bokeh Effect',
            description: '',
            src: 'images/Night5.png'
        }
    ]
};

// State
let activeSection = 'portraits';
let currentImageIndex = {
    portraits: 0,
    life: 0,
    landscapes: 0,
    street: 0,
    night: 0
};
let isMobile = false;

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn, .mobile-nav-btn');
const sections = document.querySelectorAll('.gallery-section, .contact-section');
const navArrows = document.querySelectorAll('.nav-arrow');
const thumbnails = document.querySelectorAll('.thumbnail');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initGlassCursor();
    checkMobile();
    setupEventListeners();
    setupScrollSpy();
    setupKeyboardNavigation();
    setupGSAPAnimations();
    
    // Set initial active section
    setActiveSection('portraits');
    
    // Initial fade-in animation
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // 초기 이미지 부드러운 로딩
    setTimeout(() => {
        const initialImages = document.querySelectorAll('.life-image, .landscape-image, .palace-image');
        initialImages.forEach(img => {
            if (img.complete) {
                gsap.set(img, { opacity: 1, x: 0 });
            } else {
                img.onload = () => {
                    gsap.set(img, { opacity: 1, x: 0 });
                };
            }
        });
    }, 100);
});

// Check if mobile
function checkMobile() {
    isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
        document.querySelector('.desktop-layout').style.display = 'none';
        document.querySelector('.mobile-layout').style.display = 'block';
    } else {
        document.querySelector('.desktop-layout').style.display = 'flex';
        document.querySelector('.mobile-layout').style.display = 'none';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Resize listener
    window.addEventListener('resize', checkMobile);
    
    // Navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            navigateToSection(section);
        });
    });
    
    // Image navigation arrows
    navArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            const direction = this.getAttribute('data-direction');
            
            if (direction === 'prev') {
                prevImage(section);
            } else {
                nextImage(section);
            }
        });
    });
    
    // Thumbnails (이벤트 위임 개선)
    document.addEventListener('click', function(e) {
        // 썸네일 버튼 또는 내부 img 클릭 모두 처리
        let thumbBtn = e.target;
        if (thumbBtn.classList.contains('thumbnail')) {
            // ok
        } else if (thumbBtn.closest('.thumbnail')) {
            thumbBtn = thumbBtn.closest('.thumbnail');
        } else {
            return;
        }
        const index = parseInt(thumbBtn.getAttribute('data-index'));
        // 섹션을 정확히 찾기 위해 부모 section 탐색
        const section = thumbBtn.closest('.gallery-section')?.id || activeSection;
            goToImage(section, index);
    });
}

// Setup scroll spy
function setupScrollSpy() {
    const options = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId) {
                    // Only update navigation buttons, don't change section visibility
                    activeSection = sectionId;
                    navButtons.forEach(button => {
                        button.classList.remove('active');
                        if (button.getAttribute('data-section') === sectionId) {
                            button.classList.add('active');
                        }
                    });
                }
            }
        });
    }, options);

    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                if (activeSection !== 'contact') {
                    prevImage(activeSection);
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (activeSection !== 'contact') {
                    nextImage(activeSection);
                }
                break;
            case '1':
                e.preventDefault();
                navigateToSection('portraits');
                break;
            case '2':
                e.preventDefault();
                navigateToSection('landscapes');
                break;
            case '3':
                e.preventDefault();
                navigateToSection('street');
                break;
            case '4':
                e.preventDefault();
                navigateToSection('contact');
                break;
        }
    });
}

// Setup GSAP animations
function setupGSAPAnimations() {
    // Floating images animation
    setupFloatingImages();
    
    // Fade in animations for sections
    gsap.utils.toArray('.gallery-section, .contact-section').forEach(section => {
        gsap.fromTo(section, 
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Fade in animations for section titles
    gsap.utils.toArray('.gallery-section h2, .contact-section h2').forEach(title => {
        gsap.fromTo(title,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 90%",
                    end: "bottom 10%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Fade in animations for image displays
    gsap.utils.toArray('.image-display').forEach(display => {
        gsap.fromTo(display,
            {
                opacity: 0,
                y: 25
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: display,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Fade in animations for section descriptions
    gsap.utils.toArray('.section-description').forEach(desc => {
        gsap.fromTo(desc,
            {
                opacity: 0,
                y: 15
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: desc,
                    start: "top 95%",
                    end: "bottom 5%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Contact section specific animations
    gsap.utils.toArray('.contact-content > *').forEach((element, index) => {
        gsap.fromTo(element,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.3,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    end: "bottom 10%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}



// Setup floating images animation
function setupFloatingImages() {
    const floatingImages = document.querySelectorAll('.floating-image');
    
    // Define specific areas for each image to avoid overlap
    const imageAreas = [
        { x: [-180, 180], y: [-110, 100] }
      ];
      
    
    floatingImages.forEach((image, index) => {
        const area = imageAreas[0];
        
        // Set initial position (아까 위치 기준)
        gsap.set(image, {
            x: 0,
            y: 0
        });
        
        // Create floating animation within a larger area
        gsap.to(image, {
            x: () => Math.random() * (area.x[1] - area.x[0]) + area.x[0],
            y: () => Math.random() * (area.y[1] - area.y[0]) + area.y[0],
            duration: 1 + Math.random(),
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.6
        });
        
        // Add more visible scale animation
        gsap.to(image, {
            scale: 0.92 + Math.random() * 0.16, // 0.92-1.08
            duration: 1.5 + Math.random() * 0.5,  // **★ 여기 (1.5 ~ 2 초)**
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.4
        });
    });
}

// Navigate to section
function navigateToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
    }
}

// Set active section
function setActiveSection(sectionId) {
    activeSection = sectionId;
    
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the active section
    const activeSectionElement = document.getElementById(sectionId);
    if (activeSectionElement) {
        activeSectionElement.classList.add('active');
    }
    
    // Update navigation buttons
    navButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-section') === sectionId) {
            button.classList.add('active');
        }
    });
}

// Next image
function nextImage(section) {
    const maxIndex = imageDatabase[section].length - 1;
    currentImageIndex[section] = currentImageIndex[section] >= maxIndex ? 0 : currentImageIndex[section] + 1;
    updateImageDisplay(section, 'next');
    updateCounter(section);
    updateThumbnails(section);
}

// Previous image
function prevImage(section) {
    const maxIndex = imageDatabase[section].length - 1;
    currentImageIndex[section] = currentImageIndex[section] <= 0 ? maxIndex : currentImageIndex[section] - 1;
    updateImageDisplay(section, 'prev');
    updateCounter(section);
    updateThumbnails(section);
}

// Go to specific image
function goToImage(section, index) {
    if (!imageDatabase[section] || index < 0 || index >= imageDatabase[section].length) return;
    
    const direction = index > currentImageIndex[section] ? 'next' : 'prev';
    currentImageIndex[section] = index;
    updateImageDisplay(section, direction);
    updateCounter(section);
    updateThumbnails(section);
}

// Update image display with GSAP slide animation
function updateImageDisplay(section, direction = 'next') {
    const sectionElement = document.getElementById(section);
    if (!sectionElement) return;
    
    const currentImage = imageDatabase[section][currentImageIndex[section]];
    
    // 아주 미세한 슬라이드 애니메이션
    const slideOutX = -10;  // 매우 작은 거리
    const slideInX = 10;    // 매우 작은 거리
    
    // Life 섹션 이미지 처리
    if (section === 'life') {
        const img = sectionElement.querySelector('.life-image');
        if (img) {
            // 아주 미세한 슬라이드 아웃
            gsap.to(img, {
                x: slideOutX,
                opacity: 0.8,
                duration: 0.2,
                ease: "power1.out",
                onComplete: () => {
                    img.src = currentImage.src;
                    img.alt = currentImage.title;
                    
                    // 아주 미세한 슬라이드 인
                    gsap.fromTo(img, 
                        { x: slideInX, opacity: 0.8 },
                        { 
                            x: 0, 
                            opacity: 1, 
                            duration: 0.2, 
                            ease: "power1.out" 
                        }
                    );
                }
            });
        }
        // 썸네일 이미지도 업데이트
        const sectionThumbnails = sectionElement.querySelectorAll('.thumbnail');
        sectionThumbnails.forEach((thumb, index) => {
            const thumbImg = thumb.querySelector('img');
            if (thumbImg && imageDatabase.life[index]) {
                thumbImg.src = imageDatabase.life[index].src;
                thumbImg.alt = imageDatabase.life[index].title;
            }
        });
    }
    
    // Landscapes 섹션 이미지 처리
    if (section === 'landscapes') {
        const img = sectionElement.querySelector('.landscape-image');
        if (img) {
            // 아주 미세한 슬라이드 아웃
            gsap.to(img, {
                x: slideOutX,
                opacity: 0.8,
                duration: 0.2,
                ease: "power1.out",
                onComplete: () => {
                    img.src = currentImage.src;
                    img.alt = currentImage.title;
                    
                    // 아주 미세한 슬라이드 인
                    gsap.fromTo(img, 
                        { x: slideInX, opacity: 0.8 },
                        { 
                            x: 0, 
                            opacity: 1, 
                            duration: 0.2, 
                            ease: "power1.out" 
                        }
                    );
                }
            });
        }
        // 썸네일 이미지도 업데이트
        const sectionThumbnails = sectionElement.querySelectorAll('.thumbnail');
        sectionThumbnails.forEach((thumb, index) => {
            const thumbImg = thumb.querySelector('img');
            if (thumbImg && imageDatabase.landscapes[index]) {
                thumbImg.src = imageDatabase.landscapes[index].src;
                thumbImg.alt = imageDatabase.landscapes[index].title;
            }
        });
    }
    
    // Palace 섹션 이미지 처리
    if (section === 'street') {
        const img = sectionElement.querySelector('.palace-image');
        if (img) {
            // 아주 미세한 슬라이드 아웃
            gsap.to(img, {
                x: slideOutX,
                opacity: 0.8,
                duration: 0.2,
                ease: "power1.out",
                onComplete: () => {
                    img.src = currentImage.src;
                    img.alt = currentImage.title;
                    
                    // 아주 미세한 슬라이드 인
                    gsap.fromTo(img, 
                        { x: slideInX, opacity: 0.8 },
                        { 
                            x: 0, 
                            opacity: 1, 
                            duration: 0.2, 
                            ease: "power1.out" 
                        }
                    );
                }
            });
        }
        // 썸네일 이미지도 업데이트
        const sectionThumbnails = sectionElement.querySelectorAll('.thumbnail');
        sectionThumbnails.forEach((thumb, index) => {
            const thumbImg = thumb.querySelector('img');
            if (thumbImg && imageDatabase.street[index]) {
                thumbImg.src = imageDatabase.street[index].src;
                thumbImg.alt = imageDatabase.street[index].title;
            }
        });
    }
    
    // Night 섹션 이미지 처리
    if (section === 'night') {
        const img = sectionElement.querySelector('.night-image');
        if (img) {
            // 아주 미세한 슬라이드 아웃
            gsap.to(img, {
                x: slideOutX,
                opacity: 0.8,
                duration: 0.2,
                ease: "power1.out",
                onComplete: () => {
                    img.src = currentImage.src;
                    img.alt = currentImage.title;
                    
                    // 아주 미세한 슬라이드 인
                    gsap.fromTo(img, 
                        { x: slideInX, opacity: 0.8 },
                        { 
                            x: 0, 
                            opacity: 1, 
                            duration: 0.2, 
                            ease: "power1.out" 
                        }
                    );
                }
            });
        }
        // 썸네일 이미지도 업데이트
        const sectionThumbnails = sectionElement.querySelectorAll('.thumbnail');
        sectionThumbnails.forEach((thumb, index) => {
            const thumbImg = thumb.querySelector('img');
            if (thumbImg && imageDatabase.night[index]) {
                thumbImg.src = imageDatabase.night[index].src;
                thumbImg.alt = imageDatabase.night[index].title;
            }
        });
    }
    
    // Update placeholder content
    const titleElement = sectionElement.querySelector('.placeholder-content .title');
    const subtitleElement = sectionElement.querySelector('.placeholder-content .subtitle');
    const formatElement = sectionElement.querySelector('.placeholder-content .format');
    
    if (titleElement) titleElement.textContent = currentImage.title;
    if (subtitleElement) subtitleElement.textContent = 'Image placeholder';
    if (formatElement && currentImage.isPortfolio) {
        formatElement.textContent = 'Portfolio format';
        formatElement.style.display = 'block';
    } else if (formatElement) {
        formatElement.style.display = 'none';
    }
    
    // Update image info
    const infoTitle = sectionElement.querySelector('.image-info h3');
    const infoDescription = sectionElement.querySelector('.image-info p');
    
    if (infoTitle) infoTitle.textContent = currentImage.title;
    if (infoDescription) infoDescription.textContent = currentImage.description;
    
    // Update counter
    const currentCounter = sectionElement.querySelector('.image-counter .current');
    if (currentCounter) {
        currentCounter.textContent = currentImageIndex[section] + 1;
    }
    
    // Update thumbnails
    const sectionThumbnails = sectionElement.querySelectorAll('.thumbnail');
    sectionThumbnails.forEach((thumb, index) => {
        thumb.classList.remove('active');
        if (index === currentImageIndex[section]) {
            thumb.classList.add('active');
        }
    });
    
    // Update image container format
    const imageContainer = sectionElement.querySelector('.image-container');
    if (imageContainer && currentImage.isPortfolio) {
        imageContainer.classList.remove('landscape-format');
        imageContainer.classList.add('portfolio-format');
    } else if (imageContainer && section !== 'portraits') {
        // portraits 섹션은 portrait-format을 유지
        imageContainer.classList.remove('portfolio-format');
        imageContainer.classList.add('landscape-format');
    }
    // portraits 섹션은 기존 portrait-format 클래스를 유지
}

// Section descriptions
const sectionDescriptions = {
    portraits: "Each portrait tells a story of the human experience. Through careful attention to light, composition, and connection, I aim to capture the essence of each individual's unique character and spirit.",
    landscapes: "The natural world offers endless inspiration. These landscapes capture moments of tranquility, power, and beauty found in diverse environments from mountains to oceans to forests.",
    street: "Deoksugung Palace showcases the beauty of traditional Korean architecture and royal heritage.",
    night: "The city at night offers a different kind of charm. These are moments where light and darkness meet."
};

// Initialize descriptions
document.addEventListener('DOMContentLoaded', function() {
    Object.keys(sectionDescriptions).forEach(section => {
        const sectionElement = document.getElementById(section);
        const descriptionElement = sectionElement?.querySelector('.section-description p');
        if (descriptionElement) {
            descriptionElement.textContent = sectionDescriptions[section];
        }
    });
});

/* ---------- Portfolio grid: 섹션 공통 Fade+Slide ---------- */
gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 20 },          // 시작값 (CSS와 동일)
      {
        opacity: 1,
        y: 0,                         // 제자리
        duration: 0.6,                // 다른 요소와 같은 속도감
        ease: 'power2.out',           // 동일 이징
        delay: i * 0.08,              // 살짝 스태거 (0.08 s)
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',           // 이미지·타이틀과 같은 트리거
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  