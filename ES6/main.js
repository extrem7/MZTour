window.onload = function () {
    function a(a, b) {
        var c = /^(?:file):/, d = new XMLHttpRequest, e = 0;
        d.onreadystatechange = function () {
            4 == d.readyState && (e = d.status), c.test(location.href) && d.responseText && (e = 200), 4 == d.readyState && 200 == e && (a.outerHTML = d.responseText)
        };
        try {
            d.open("GET", b, !0), d.send()
        } catch (f) {
        }
    }

    var b, c = document.getElementsByTagName("*");
    for (b in c) c[b].hasAttribute && c[b].hasAttribute("data-include") && a(c[b], c[b].getAttribute("data-include"))
};

function bodyClass($class) {
    return $('body').hasClass($class);
}

function header() {
    $('.header .toggle-btn').click(() => {
        $('.header nav').fadeToggle();
        $('.toggle-btn').toggleClass('active');
        $('body').toggleClass('overflow');
    });
}

function mainTabs() {
    $('.main-tabs').on('shown.bs.tab', function (e) {
        const $this = $(e.target),
            oldClass = $(e.relatedTarget).attr('href').replace('#', '');
        tabClass = $this.attr('href').replace('#', ''),
            title = $this.attr('data-title'),
            subtitle = $this.attr('data-subtitle');


        $('.main-tabs').removeClass(oldClass).addClass(tabClass);
        $('.main-tabs .title').html(title);
        $('.main-tabs .subtitle').html(subtitle);
        $('.tabs-control .indicators .active').removeClass('active');
        $(`.tabs-control .indicators a[href=${tabClass}]`).addClass('active');
    });
    $('.tabs-control .arrow').click(e => {
        e.preventDefault();
        const $this = $(e.currentTarget),
            prev = $('.nav-tabs .nav-link.active').parent().prev().find('.nav-link'),
            next = $('.nav-tabs .nav-link.active').parent().next().find('.nav-link');
        if ($this.hasClass('arrow-right')) {
            if (next.length !== 0) {
                next.click();
            } else {
                $('.nav-tabs .nav-item:first-child .nav-link').click();
            }
        } else {
            if (prev.length !== 0) {
                prev.click();
            } else {
                $('.nav-tabs .nav-item:last-child .nav-link').click();
            }
        }
    });
    $('.tabs-control .indicators a').click(e => {
        e.preventDefault();
        $(`.nav-tabs .nav-link[href="#${$(e.currentTarget).attr('href')}"]`).click();
    });
}

function priceSlider() {
    if ($(".slider-range").length > 0) {
        $(".slider-range").slider({
            range: true,
            min: 850,
            max: 10000,
            values: [2500, 6500],
            slide: function (event, ui) {
                $(this).parent().find('.slider-from').val(ui.values[0]);
                $(this).parent().find('.slider-to').val(ui.values[1]);
            }
        });
        $('.slider-from').each(function () {
            console.log(this)
            $(this).val($(this).closest('.price-block').find('.slider-range').slider("values", 0));
        });
        $('.slider-to').each(function () {
            console.log(this)
            $(this).val($(this).closest('.price-block').find('.slider-range').slider("values", 0));
        });
    }
}

function hotelSlider() {
    let slidesToShow = 5;
    if (bodyClass('booking-page')) {
        slidesToShow = 6;
    }
    $('.photos-row').slick({
        infinite: false,
        slidesToShow: slidesToShow,
        prevArrow: "<i class=\"fa fa-caret-left\" aria-hidden=\"true\"></i>",
        nextArrow: "<i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i>",
    });
    $('.photos-row img,.car-photos-row img').click(e => {
        const $this = $(e.currentTarget),
            src = $this.attr('src');
        $this.closest('.hotel-slider, .car-slider').find('.main-photo, .main-photo img').attr('src', src);
    });
}

function refreshSelect() {
    $('.refresh').click(e => {
        let $this = $(e.currentTarget),
            prev = $this.prev().find('select').val(),
            next = $this.next().find('select').val(),
            buffer = prev;
        $this.css({transform: 'rotate(-180deg)'},)
        setTimeout(() => {
            $this.css({transition: 'none', transform: 'rotate(0deg)'});
            setTimeout(() => {
                $this.css({transition: 'all .4s'})
            }, 400);
        }, 400);
        $this.prev().find('select').val(next);
        $this.next().find('select').val(buffer);
    });
}

function buttonsAnimals() {
    $('.booking-form .count button').click(e => {
        const $this = $(e.currentTarget),
            count = $this.siblings('span'),
            countInt = parseInt(count.text());

        if (countInt >= 1 && $this.hasClass('plus')) {
            count.text(countInt + 1);
            $this.siblings('.minus').removeClass('disabled');
            $this.closest('.animals').find('.fields').append('<div class="animal">\n' +
                '                        <label class="select-block input-block">\n' +
                '                            Животное\n' +
                '                            <select>\n' +
                '                                <option selected>Собака</option>\n' +
                '                                <option>Собака</option>\n' +
                '                                <option>Собака</option>\n' +
                '                                <option>Собака</option>\n' +
                '                            </select>\n' +
                '                        </label>\n' +
                '                        <label class="input-block">\n' +
                '                            Размер контейнера\n' +
                '                            <input type="text" placeholder="82 x 57 x 60">\n' +
                '                        </label>\n' +
                '                        <label class="input-block">\n' +
                '                            Вес животного в кг.\n' +
                '                            <input type="text" placeholder="до 8">\n' +
                '                        </label>\n' +
                '                    </div>')
        }
        if (countInt > 1 && $this.hasClass('minus')) {
            count.text(countInt - 1);
            $this.closest('.animals').find('.fields .animal:last-child').remove()
            if ((countInt - 1) === 1) {
                $this.addClass('disabled');
            }
        }
    });
}

function clientTabs() {
    $('.client-control .button').click(e => {
        const $this = $(e.currentTarget),
            target = $this.attr('href'),
            $links = $this.closest('.client').find('.nav-tabs');
        $links.find('a').removeClass('active');
        $links.find(`a[href="${target}"]`).addClass('active');
        $this.removeClass('active');
    });
}

$(() => {
    setTimeout(() => {
        $("input[type=tel]").mask("+7 (999) 999-99-99");
        $(".date-range").mask("99.99-99.99");
        priceSlider();
        header();
        refreshSelect();
        mainTabs();
        buttonsAnimals();
        clientTabs();
        if (bodyClass('home')) {
            $('.hotels').slick({
                infinite: true,
                slidesToShow: 5,
                arrows: false,
                variableWidth: true,
                responsive: [
                    {
                        breakpoint: 1700,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 1360,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            centerMode: true,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });
            $('#popular-tours .row').slick({
                infinite: true,
                slidesToShow: 4,
                arrows: false,
                dots: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 3,
                            centerMode: true,
                            variableWidth: true
                        }
                    }
                ]
            });
        }
        if (bodyClass('post-type-archive-stock') || bodyClass('single-stock')) {
            $('.stock-banner').slick({
                infinite: true,
                slidesToShow: 2,
                autoplay: true,
                autoplaySpeed: 5000,
                arrows: false,
                dots: true,
                variableWidth: true,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 1,
                            centerMode: true
                        }
                    }
                ]
            });
        }
        if (bodyClass('booking-avia')) {
            $('.date-slider .dates').slick({
                slidesToShow: 6,
                infinite: false,
                variableWidth: true,
                prevArrow: "<a href=\"#\" class=\"arrow arrow-left\"></a>",
                nextArrow: "<a href=\"#\" class=\"arrow arrow-right\"></a>",
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            variableWidth: false,
                            // centerMode: true,
                            slidesToShow: 1
                        }
                    },
                ]
            });
        } else {
            $('.date-slider .dates').slick({
                slidesToShow: 5,
                infinite: false,
                initialSlide: 3,
                variableWidth: true,
                prevArrow: "<a href=\"#\" class=\"arrow arrow-left\"></a>",
                nextArrow: "<a href=\"#\" class=\"arrow arrow-right\"></a>",
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            variableWidth: false,
                            // centerMode: true,
                            slidesToShow: 1
                        }
                    },
                ]
            });
        }
        hotelSlider();
        $('.additional-search').click(e => {
            e.preventDefault();
            // $('.forms').toggleClass('forms-extended');
            $(e.currentTarget).closest('.tab-pane').toggleClass('extended-tab');
        });
        $('.hide-additional').click(e => {
            e.preventDefault();
            const $this = $(e.currentTarget);
            $this.closest('.tab-content').find('.additional').slideToggle();
            if ($this.hasClass('closed')) {
                $this.html('<i class="fa fa-long-arrow-up"></i>Свернуть подробную информацию');
                $this.removeClass('closed');
            } else {
                $this.html('<i class="fa fa-long-arrow-down"></i>Открыть подробную информацию');
                $this.addClass('closed');
            }
        });
        $('.hide-fields').click(e => {
            e.preventDefault();
            const $this = $(e.currentTarget),
                $client = $this.closest('.client');
            $client.toggleClass('active');
            $client.find('.client-main').slideToggle();
            if ($this.hasClass('closed')) {
                $this.html('<i class="fa fa-caret-up"></i>Скрыть все поля анкеты');
                $this.removeClass('closed');
            } else {
                $this.html('<i class="fa fa-caret-down"></i>Открыть все поля анкеты');
                $this.addClass('closed');
            }
        });
    }, 1000)
});