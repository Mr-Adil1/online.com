const home = document.querySelector('.home');
header = home.querySelector('.header');
productname = home.querySelector('.title');
menu = home.querySelector('.fa-bars');
const overlay = document.querySelector('.overlay');
// function for show sidebar
menu.addEventListener('click', () => {
    home.classList.toggle('active');
    overlay.classList.toggle('lair');
});


// searchbar
const searchicon = home.querySelector('.fa-search');
const closeicon = home.querySelector('bxs-x-circle');
const searchsection = document.querySelector('.search-section');
const closs = searchsection.querySelector('.bxs-x-circle');
const searchoutput = searchsection.querySelector('.search-output');
// show searchbar & hide searchbar function
searchicon.addEventListener('click', () => {
    searchsection.classList.add('block');
    document.body.style.overflowY = 'hidden';
    container = document.getElementsByClassName('product-container');
    for (let c = 0; c < container.length; c++) {
        let col = container[c].querySelectorAll('.col');
        col.forEach(element => {
            let col_span = element.getElementsByTagName('span');
            for (let s = 0; s < col_span.length; s++) {
                let span_text = col_span[s].textContent
                let col_img = element.getElementsByTagName('img');
                for (let i = 0; i < col_img.length; i++) {
                    let img_src = col_img[i].src;
                    let list = `<li><span>${span_text}</span> <img src="${img_src}"></li>`;
                    searchoutput.insertAdjacentHTML('beforeend', list)
                }
            }

        });
    }
});
// creat closs function to hide searchsection
closs.addEventListener('click', () => {
    searchsection.classList.remove('block');
    searchoutput.classList.remove('search-active');
    document.body.style.overflowY = '';
    searchoutput.innerHTML = '';
});

// creat search engines
let myfunction = () => {
    const myinput = searchsection.querySelector('input').value.toUpperCase();
    const searchoutput = searchsection.querySelector('.search-output');
    const list = searchoutput.querySelectorAll('li');
    for (var i = 0; i < list.length; i++) {
        let a = list[i].getElementsByTagName('span')[0];

        if (a) {
            let textvalue = a.textContent || a.innerHTML;

            if (textvalue.toUpperCase().indexOf(myinput) > -1) {
                list[i].style.display = '';
            } else {
                list[i].style.display = 'none';
            }
        }
    }
    if (myinput.value != a.textContent || a.innerHTML) {
        let li = `<li>!oops Product you looking for is not avalibal</li>`;
        searchoutput.insertAdjacentElement('beforeend', li);
    }
}

// fetching products
asideUL = document.getElementsByClassName('myul');
for (let i = 0; i < asideUL.length; i++) {
    let element = asideUL[i];
    element.onclick = ({ target }) => {
        document.querySelector('.shope-btn').click();
        let fetchme;
        document.querySelector('.loading-line').style.display = 'block';
        let loading = `<div class="loading">Loading...</div>`
        document.getElementById('fetch-container').innerHTML = loading;
        setTimeout(() => {
            fetch(fetchme).then(res => {
                return res.text();
            }).then(data => {
                document.getElementById('fetch-container').innerHTML = data;
            }).catch(err => {
                document.getElementById('fetch-container').innerHTML = '!oops Somthing wrong';
            });
            document.querySelector('.loading-line').style.display = 'none';
        }, 3000)
        if (target.classList.contains('jeans')) {
            fetchme = 'jeans.html';
            header.classList.remove('center');
            header.style.background = 'url("images/jeans-header.png")';
            productname.textContent = 'Jeans';
        } else if (target.classList.contains('shirt')) {
            fetchme = 'shirt.html';
            header.classList.add('center');
            header.style.background = 'url("images/tshirt-header.png")';
            productname.textContent = 'Shirt';
        } else if (target.classList.contains('suit')) {
            fetchme = 'suit.html';
            header.style.background = 'url("https://img.freepik.com/free-photo/picture-elegant-young-fashion-man_158595-527.jpg?size=626&ext=jpg&ga=GA1.2.1743083152.1650193687")';
            productname.textContent = 'Suit';
        } else if (target.classList.contains('watch')) {
            fetchme = 'watch.html';
            header.style.background = 'url("https://img.freepik.com/free-photo/gray-scale-shot-black-watch_181624-422.jpg?size=626&ext=jpg&ga=GA1.2.1743083152.1650193687")';
            productname.textContent = 'Watches';
        } else if (target.classList.contains('shoes')) {
            fetchme = 'shoes.html';
            header.classList.add('center');
            header.style.background = 'url("https://img.freepik.com/free-photo/denim-sneakers-street-style_53876-15369.jpg?size=626&ext=jpg&ga=GA1.2.1743083152.1650193687")';
            productname.textContent = 'Shoes';
        }
    }
}


// windows events
// hide sidebar on scrolling window
window.onscroll = () => {
        home.classList.remove('active');
        overlay.classList.remove('lair');
    }
    //  hide sidebar when click outside of the sidbar
window.onclick = (event) => {
    if (!event.target.matches('.fa-bars') && !event.target.matches('aside')) {
        var home = document.getElementsByClassName('home');
        var i;
        for (i = 0; i < home.length; i++) {
            if (home[i].classList.contains('active') && overlay.classList.contains('lair')) {
                home[i].classList.remove('active');
                overlay.classList.remove('lair');
            };
        };
    };
};

window.onload = () => {
    document.querySelector('.loading-line').style.display = 'none';
}