// console.log('it works!');
// import * as api from './api/data.js';

// window.api = api;

import { page, render } from './lib.js';
import { logout } from './api/data.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { catalogPage } from './views/catalog.js';
import { editPage } from './views/edit.js';
import { detailsPage } from './views/details.js';
import { searchPage } from './views/search.js';



const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContex);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/catalog', catalogPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/search', searchPage);



updateUserNav();
page.start();


function decorateContex(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        [...document.querySelectorAll('.user')].forEach(e => e.style.display = 'inline');
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    } else {
        [...document.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display = 'inline');
    }
}


function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}
