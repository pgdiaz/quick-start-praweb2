const path = window.location.pathname;
const cleanPath = path.replace(/^\//, '');
const pageName = cleanPath.replace(/\.html.*/, '');
const menuItems = document.querySelectorAll('.nav-link');
menuItems.forEach(item => {
    if (item.getAttribute('href') === pageName + '.html') {
        item.parentElement.classList.add('active');
    }
});
