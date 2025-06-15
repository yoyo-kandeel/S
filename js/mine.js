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



// تقليب الصور كل  3 ثواني
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
       
          // يمكنك إضافة المزيد من الصور هنا
        ];
        let currentStart = 0;
        function updateGallery() {
          const imgs = grid.querySelectorAll('.gallery-img');
          for (let i = 0; i < imgs.length; i++) {
            const idx = (currentStart + i) % images.length;
            imgs[i].src = images[idx];
          }
          currentStart = (currentStart + 1) % images.length;
        }
        setInterval(updateGallery, 3000); // كل 3 ثواني
        // إنشاء الصور في البداية
        for (let i = 0; i < 3; i++) {
          const img = document.createElement('img');
          img.className = 'gallery-img';
          img.src = images[i % images.length];
          grid.appendChild(img);
        }
        // تحديث المعرض عند التحميل
        updateGallery();
        // إضافة حدث عند النقر على الصور
        grid.addEventListener('click', function(event) {
          if (event.target.classList.contains('gallery-img')) {
            const src = event.target.src;
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `<span class="close">&times;</span><img class="modal-content" src="${src}">`;
            document.body.appendChild(modal);
            modal.querySelector('.close').onclick = function() {
              document.body.removeChild(modal);
            };
          }
        });
        // إضافة أنماط للنافذة المنبثقة
        const style = document.createElement('style');
        style.innerHTML = `
          .modal {
            display: flex;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            justify-content: center;
            align-items: center;
          }
          .modal-content {
            max-width: 90%;
            max-height: 90%;
          }
          .close {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
          }
        `;
        document.head.appendChild(style);

      })();


// إضافة تأثيرات على الأزرار
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseover', function() {
        this.classList.add('btn-hover');
    });
    btn.addEventListener('mouseout', function() {
        this.classList.remove('btn-hover');
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

    $('form').on('submit', function(e) {
        e.preventDefault();
        var name = $('input[name="name"]').val();
        var email = $('input[name="email"]').val();
        var message = $('textarea[name="message"]').val();

        if (name && email && message) {
            alert('شكراً لتواصلك معنا يا ' + name + '!');
            $(this).trigger('reset');
        } else {
            alert('يرجى ملء جميع الحقول.');
        }
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
 