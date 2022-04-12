import { getAlbumsByQuery } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';


const searchTemplate = (onSearch, albums, isLogged) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">
        ${albums.length == 0 ? html`<p class="no-result">No result.</p>` : albums.map(a => albumTemplate(a, isLogged)) }
        <!--If have matches-->
        <!-- <div class="card-box">
            <img src="./images/BrandiCarlile.png">
            <div>
                <div class="text-center">
                    <p class="name">Name: In These Silent Days</p>
                    <p class="artist">Artist: Brandi Carlile</p>
                    <p class="genre">Genre: Low Country Sound Music</p>
                    <p class="price">Price: $12.80</p>
                    <p class="date">Release Date: October 1, 2021</p>
                </div>
                <div class="btn-group">
                    <a href="#" id="details">Details</a>
                </div>
            </div>
        </div> -->

        
    </div>
</section>`;

const albumTemplate = (album, isLogged) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${isLogged ? html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>` : null}

    </div>
</div>`;


export async function searchPage(ctx) {

    const params = ctx.querystring.split('=')[1];
    let albums = [];

    if (params) {
        albums = await getAlbumsByQuery(params);
    }

    const userData = getUserData();
    const isLogged = userData ? 1 : 0;

    ctx.render(searchTemplate(onSearch, albums, isLogged));

    function onSearch(ev) {
        // ev.preventDefault();
        const search = ev.target.parentElement.querySelector('input').value.trim();

        if (search) {
            ctx.page.redirect('/search?query=' + search);
        } else {
            return alert('Please fill search field!');
        }
    }
}
