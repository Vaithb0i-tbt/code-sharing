document.addEventListener("scroll", function() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        // If section is in view
        if (sectionTop <= windowHeight * 0.8) {
            section.classList.add('visible');
        }
    });
});
