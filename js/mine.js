// إضافة كلاس الأنيميشن لكل section
$('section').addClass('fade-section').css('opacity', 0);

function fadeInSectionOnView() {
    $('.fade-section').each(function() {
        var $section = $(this);
        var sectionTop = $section.offset().top;
        var sectionBottom = sectionTop + $section.outerHeight();
        var winTop = $(window).scrollTop();
        var winBottom = winTop + $(window).height();

        if (winBottom > sectionTop && winTop < sectionBottom) {
            if (!$section.hasClass('fade-in-activated')) {
                $section.addClass('fade-in-activated').css({
                    'animation': 'fadeInUp 2s ease-in-out forwards, fadeIn 3s ease-in-out forwards',
                    'opacity': 1
                });
            }
        }
    });
}

$(document).ready(function() {
    fadeInSectionOnView(); // تشغيل الحركة عند تحميل الصفحة
    $(window).on('scroll', fadeInSectionOnView);
});
// حركة الإحصائيات
$(document).ready(function() {
    function animateStats() {
        $('.stat-number').each(function(i) {
            var $this = $(this);
            var countTo = parseInt($this.attr('data-count'), 10);
            setTimeout(function() {
                $this.addClass('stat-animate');
                $({ countNum: 0 }).animate({ countNum: countTo }, {
                    duration: 1200,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(countTo);
                        setTimeout(function() {
                            $this.removeClass('stat-animate');
                        }, 600);
                    }
                });
            }, i * 200);
        });
    }

    var statsAnimated = false;

    function checkStatsAnimation() {
        var statsOffset = $('.stats-table-container').offset().top - $(window).height() + 100;
        if (!statsAnimated && $(window).scrollTop() > statsOffset) {
            animateStats();
            statsAnimated = true;
        }
    }
    function resetStatsIfOutOfView() {
        var statsTop = $('.stats-table-container').offset().top;
        var statsBottom = statsTop + $('.stats-table-container').outerHeight();
        var winTop = $(window).scrollTop();
        var winBottom = winTop + $(window).height();

        if (statsAnimated && (winBottom < statsTop || winTop > statsBottom)) {
            statsAnimated = false;
            $('.stat-number').text('0');
        }
        if (!statsAnimated && winBottom > statsTop + 100) {
            animateStats();
            statsAnimated = true;
        }
    }
    $(window).on('scroll', function() {
        checkStatsAnimation();
        $('.stat-number').each(function() {
            var $this = $(this);
            var offsetTop = $this.offset().top - $(window).height() + 100;
            if ($(window).scrollTop() > offsetTop && !$this.hasClass('stat-animate')) {
                $this.addClass('stat-animate');
                $this.text($this.attr('data-count'));
            }
        });
        resetStatsIfOutOfView();
    });
    if ($('.stats-table-container').length && $(window).scrollTop() > $('.stats-table-container').offset().top - $(window).height() + 100) {
        animateStats();
        statsAnimated = true;
    }
    $('.stat-number').on('mouseenter', function() {
        $(this).addClass('stat-animate');
    }).on('mouseleave', function() {
        $(this).removeClass('stat-animate');
    });
});

       // حركة عند تمرير الماوس على عناصر القائمة
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {  
    link.addEventListener('mouseenter', function() {
        this.classList.add('animate__animated', 'animate__pulse');
    }
    );
    link.addEventListener('mouseleave', function() {
        this.classList.remove('animate__animated', 'animate__pulse');
    }
    );
});
// حركة عند تمرير الماوس على زر القائمة المنسدلة
const dropdownLinks = document.querySelectorAll('.dropdown-item');
dropdownLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.classList.add('animate__animated', 'animate__fadeIn');
    }
    );
    link.addEventListener('mouseleave', function() {
        this.classList.remove('animate__animated', 'animate__fadeIn');
    }
    );
});

    



     
               







// تقليب الصور كل 3 ثواني مع عرض صورتين وأسهم جانبية لتقليب يدوي
(function() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    const images = [
        "photo/hacker-cracking-binary-code-data-security.jpg",
        "photo/2953998.jpg",
        "photo/66e9a4d007bc4867cb9a8e9f_pexels-zachtheshoota-1838640.avif",
        "photo/66e9a4d007bc4867cb9a8ea3_pexels-alexander-mass-748453803-27872051.webp",
        "photo/close-up-programmer-typing-keyboard.jpg",
        "photo/teacher1.avif",
        "photo/teacher2.avif",
        "photo/8711572.jpg",
        "photo/66e9a4d007bc4867cb9a8e9d_pexels-max-fischer-5211478.webp",
        "photo/66e9a4d007bc4867cb9a8e9f_pexels-zachtheshoota-1838640.avif",
    ];
    let currentStart = 0;
    const imagesPerView = 2;

    // إنشاء الأسهم
    const leftArrow = document.createElement('span');
    leftArrow.className = 'gallery-arrow gallery-arrow-left';
    leftArrow.innerHTML = '&#10099;';
    const rightArrow = document.createElement('span');
    rightArrow.className = 'gallery-arrow gallery-arrow-right';
    rightArrow.innerHTML = '&#10098;';
    grid.appendChild(leftArrow);
    grid.appendChild(rightArrow);

    // إنشاء الصور في البداية
    for (let i = 0; i < imagesPerView; i++) {
        const img = document.createElement('img');
        img.className = 'gallery-img';
        img.src = images[i % images.length];
        grid.appendChild(img);
    }

    function updateGallery() {
        const imgs = grid.querySelectorAll('.gallery-img');
        for (let i = 0; i < imgs.length; i++) {
            const idx = (currentStart + i) % images.length;
            imgs[i].src = images[idx];
        }
    }

    function next() {
        currentStart = (currentStart + imagesPerView) % images.length;
        updateGallery();
    }
    function prev() {
        currentStart = (currentStart - imagesPerView + images.length) % images.length;
        updateGallery();
    }

    rightArrow.onclick = next;
    leftArrow.onclick = prev;

    let interval = setInterval(next, 3000);

    // إيقاف التقليب التلقائي عند المرور بالماوس
    grid.addEventListener('mouseenter', () => clearInterval(interval));
    grid.addEventListener('mouseleave', () => interval = setInterval(next, 3000));

    // تحديث المعرض عند التحميل
    updateGallery();

    // عند النقر على صورة، عرضها في نافذة منبثقة
    grid.addEventListener('click', function(event) {
        if (event.target.classList.contains('gallery-img')) {
            let src = event.target.src;
            let currentIdx = images.findIndex(img => src.includes(img.split('/').pop()));
            if (currentIdx === -1) currentIdx = 0;

            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <span class="arrow arrow-left">&#10099;</span>
                <span class="arrow arrow-right">&#10098;</span>
                <span class="close">&times;</span>
                <img class="modal-content" src="${images[currentIdx]}">
            `;
            document.body.appendChild(modal);

            const modalImg = modal.querySelector('.modal-content');
            const closeBtn = modal.querySelector('.close');
            const leftArrow = modal.querySelector('.arrow-left');
            const rightArrow = modal.querySelector('.arrow-right');

            function showImage(idx) {
                if (idx < 0) idx = images.length - 1;
                if (idx >= images.length) idx = 0;
                currentIdx = idx;
                modalImg.src = images[currentIdx];
            }

            leftArrow.onclick = function(e) {
                e.stopPropagation();
                showImage(currentIdx - 1);
            };
            rightArrow.onclick = function(e) {
                e.stopPropagation();
                showImage(currentIdx + 1);
            };
            closeBtn.onclick = function() {
                document.body.removeChild(modal);
            };
            modal.tabIndex = -1;
            modal.focus();
            modal.onkeydown = function(e) {
                if (e.key === "ArrowLeft") {
                    showImage(currentIdx - 1);
                } else if (e.key === "ArrowRight") {
                    showImage(currentIdx + 1);
                } else if (e.key === "Escape") {
                }
            };
        }
    });
})();

// عرض الأحداث في الجدول الزمني عند التمرير
   function revealTimelineEvents() {
      var events = document.querySelectorAll('.timeline-event');
      var windowHeight = window.innerHeight;
      events.forEach(function(event) {
        var rect = event.getBoundingClientRect();
        if (rect.top < windowHeight - 100 && rect.bottom > 100) {
          event.classList.add('visible');
        }
        else {
          event.classList.remove('visible');
        }
        if (rect.top < windowHeight - 100 && !event.classList.contains('animated')) {
          event.classList.add('animated');
          event.style.animation = 'fadeInUp 0.5s ease forwards';
        }else if (rect.top >= windowHeight - 100 && event.classList.contains('animated')) {
          event.classList.remove('animated');
          event.style.animation = '';
        }

      });
    }
    document.addEventListener('DOMContentLoaded', function() {
      revealTimelineEvents();
      window.addEventListener('scroll', revealTimelineEvents);
        window.addEventListener('resize', revealTimelineEvents);
        window.addEventListener('load', revealTimelineEvents);
        window.addEventListener('orientationchange', revealTimelineEvents);
        window.addEventListener('touchmove', revealTimelineEvents, { passive: true });
        window.addEventListener('touchstart', revealTimelineEvents, { passive: true });
        window.addEventListener('touchend', revealTimelineEvents, { passive: true });
        window.addEventListener('touchcancel', revealTimelineEvents, { passive: true });
        window.addEventListener('pointermove', revealTimelineEvents, { passive: true });
        window.addEventListener('pointerdown', revealTimelineEvents, { passive: true });
        window.addEventListener('pointerup', revealTimelineEvents, { passive: true });
        window.addEventListener('pointercancel', revealTimelineEvents, { passive: true });
        window.addEventListener('wheel', revealTimelineEvents, { passive: true });
        window.addEventListener('mousewheel', revealTimelineEvents, { passive: true });
        window.addEventListener('keydown', function(e) {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                revealTimelineEvents();
            }
        });
        window.addEventListener('keyup', function(e) {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                revealTimelineEvents();
            }
        });
        window.addEventListener('focus', revealTimelineEvents);
        window.addEventListener('blur', revealTimelineEvents);
        window.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'visible') {
                revealTimelineEvents();
            }
        });
        window.addEventListener('pageshow', function(event) {
            if (event.persisted || window.performance && window.performance.navigation.type === 2) {
                revealTimelineEvents();
            }
        });
        window.addEventListener('load', function() {
            setTimeout(revealTimelineEvents, 100); // تأخير بسيط للتأكد من تحميل كل العناصر
        });
     
    });




// إقائمة الأسئلة الشائعة
 document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', function() {
        const item = this.parentElement;
        item.classList.toggle('active');
        // Close others
        document.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
      });
    });





// Smooth scroll for nav links, card hover, header scroll, contact form, back to top
$(document).ready(function() {
    $('.nav a').on('click', function(e) {
        var target = $(this.hash);
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 700);
        }
    });

    $('.card').hover(
        function() {
            $(this).addClass('shadow-lg').css('transform', 'scale(1.05)');
        },
        function() {
            $(this).removeClass('shadow-lg').css('transform', 'scale(1)');
        }
    );

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
 

$(function() {
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    // محاكاة إرسال النموذج
    $('#formMsg').hide().removeClass('text-danger text-success');
    var name = $('#name').val().trim();
    var email = $('#email').val().trim();
    var message = $('#message').val().trim();
    if(name && email && message) {
      $('#formMsg').addClass('text-success').text('تم إرسال رسالتك بنجاح! سنقوم بالرد قريباً.').fadeIn();
      this.reset();
    } else {
      $('#formMsg').addClass('text-danger').text('يرجى ملء جميع الحقول.').fadeIn();
    }
  });
}); 

    var backToTopBtn = $('#backToTop');
    if (backToTopBtn.length) {
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 300) {
                backToTopBtn.fadeIn();
            } else {
                backToTopBtn.fadeOut();
            }
        });
        backToTopBtn.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 700);
        });
    }
});
 
