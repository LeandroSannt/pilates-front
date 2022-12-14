import styled from 'styled-components'

export const Teste = styled.div `
       
        margin: 50px auto 0 auto;
        max-width: 1224px;
        padding: 2rem 1rem ;
        color: #191970;
        h1{
            margin-bottom: 50px;
            text-align: center;
        }
        
        .containerCards{
            display: grid;
            grid-template-columns: repeat(4,1fr);
            .cards{
                width: 70%;
                height: 50%;
                .card{
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    cursor: pointer;
                    img{
                        border-radius: 4px;
                        width: 100%;
                        height: 100%;
                        max-width: 100%;
                        -moz-transition: all 0.3s;
                        -webkit-transition: all 0.3s;
                        transition: all 0.3
                    }
                    
                    img:hover {
                        -moz-transform: scale(1.1);
                        -webkit-transform: scale(1.1);
                        transform: scale(1.1);
                    }
                }
                p{  
                        width: 100%;
                        font-size: 1.2rem;
                        margin-top: 1.2rem;
                        color: gray;
                    }
                }
            }
            @media(max-width:1130px){
            .containerCards{
                grid-template-columns:1fr 1fr;
                gap:50px;
                position:initial;
                place-items: center;
            }
        }
`

export const Container = styled.div`


  scroll-behavior: smooth;

  font: 400 1rem var(--body-font);
  background: var(--body-color);
  color: var(--text-color);




/* --------------------- RESET ----------------------- */



/* --------------------- VARIABLES ----------------------- */


/* --------------------- BASE ----------------------- */


.title {
  font: 700 var(--title-font-size) var(--title-font);
  color: var(--title-color);
}

.button {
  background-color: var(--base-color);
  color: var(--text-color-light);
  height: 3.5rem;
  display: inline-flex;
  align-items: center;
  padding: 0 2rem;
  border-radius: 0.25rem;
  font: 500 1rem var(--body-font);
  transition: background 0.3s;
}

.button:hover {
  background: var(--base-color-alt);
}

.divider-1 {
  height: 1px;
  background: linear-gradient(
    270deg,
    hsla(var(--hue), 36%, 57%, 1),
    hsla(var(--hue), 65%, 88%, 0.34)
  );
}

.divider-2 {
  height: 1px;
  background: linear-gradient(
    270deg,
    hsla(var(--hue), 65%, 88%, 0.34),
    hsla(var(--hue), 36%, 57%, 1)
  );
}

/* --------------------- LAYOUT ----------------------- */
.container {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}


@media(max-width:720px){
  .container {
  margin-left: 0rem;
  padding: 0 10px;
}
}

.grid {
  display: grid;
  gap: 2rem;
}

.section {
  padding: calc(5rem + var(--header-height)) 0;
}

.section .title {
  margin-bottom: 1rem;
}

.section .subtitle {
  font-size: var(--subtitle-font-size);
}

.section header {
  margin-bottom: 4rem;
}

.section header strong {
  color: var(--base-color);
}

#header {
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 2rem;
  display: flex;
  width: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: var(--body-color);
  transition: background 0.9s;
}

#header.scroll {
  background: var(--base-color);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
  transition: background 0.9s;
}

#header.scroll .logo span {
  color: white;
  transition: background 0.9s;
}

#header.scroll .icon-menu {
  color: white;
  transition: background 0.9s;
}



/* --------------------- LOGO ----------------------- */
.logo {
  font: 700 1.31rem var(--title-font);
  color: var(--title-color);
}

.logo span {
  color: var(--base-color);
}

.logo-alt span {
  color: var(--body-color);
}

/* --------------------- NAVIGATION ----------------------- */
nav {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

nav ul.grid {
  gap: 4rem;
}

nav ul li {
  text-align: center;
}

nav ul li a {
  transition: color 0.2s;
  position: relative;
}
nav ul li a:hover,
nav ul li a.active {
  color: var(--base-color);
}
nav ul li a::after {
  content: '';
  width: 0%;
  height: 2px;
  background: var(--base-color);

  position: absolute;
  left: 0;
  bottom: -1rem;

  transition: width 0.2s;
}

nav ul li a:hover::after,
nav ul li a.active::after {
  width: 100%;
}

nav .menu {
  opacity: 0;
  visibility: hidden;
  top: -20rem;
  transition: 0.2s;
}

/* ------- Show menu ------- */
nav.show .menu {
  opacity: 1;
  visibility: visible;

  background: var(--body-color);
  height: 100vh;
  width: 100vw;

  position: fixed;
  top: 0;
  left: 0;

  display: grid;
  place-content: center;
}

nav .menu ul {
  display: none;
}

nav.show .menu ul {
  display: grid;
}

nav.show ul.grid {
  gap: 4rem;
}

/* ------- Toggle menu ------- */
.toggle {
  color: var(--base-color);
  font-size: 1.5rem;
  cursor: pointer;
}

nav .icon-close {
  visibility: hidden;
  opacity: 0;

  position: absolute;
  top: -1.5rem;
  right: 1.5rem;

  transition: 0.2s;
}

nav.show .icon-close {
  visibility: visible;
  opacity: 1;
  top: 1.5rem;
}

/* --------------------- HOME ----------------------- */
#home {
  overflow: hidden;
}

#home .container {
  margin: 0;
}

#home .image {
  position: relative;
}

#home .image::before {
  content: '';
  height: 100%;
  width: 100%;
  background: var(--base-color-second);
  position: absolute;
  top: -16.8%;
  left: 16.7%;
  z-index: 0;
}

#home .image img {
  position: relative;
  right: 2.93rem;
}

#home .image img,
#home .image::before {
  border-radius: 0.25rem;
}

#home .text {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  text-align: center;
}

#home .text h1 {
  margin-bottom: 1rem;
}

#home .text p {
  margin-bottom: 2rem;
}

/* --------------------- ABOUT ----------------------- */
#about {
  background: white;
}

#about .container {
  margin: 0;
}

#about .image {
  position: relative;
}

#about .image::before {
  content: '';
  height: 100%;
  width: 100%;
  background: var(--base-color-second);
  position: absolute;
  top: -8.3%;
  left: -33%;
  z-index: 0;
}

#about .image img {
  position: relative;
}

#about .image img,
#about .image::before {
  border-radius: 0.25rem;
}

#about .text {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}

/* --------------------- SERVICES ----------------------- */
.cards.grid {
  gap: 1.5rem;
}

.card {
  padding: 3.625rem 2rem;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08);
  border-bottom: 0.25rem solid var(--base-color);
  border-radius: 0.25rem 0.25rem 0 0;
  text-align: center;
}

.card i {
  display: block;
  margin-bottom: 1.5rem;
  font-size: 5rem;
  color: var(--base-color);
}

.card .title {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

/* --------------------- TESTIMONIALS ----------------------- */

#testimonials {
  background: white;
  
}

#testimonials header {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  margin-bottom: 0;
}

#testimonials .container {
  margin-left: 0;
  margin-right: 0;
}

#testimonials blockquote {
  padding: 2rem;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08);
  border-radius: 0.25rem;
  min-height: 228px;
}

#testimonials blockquote p{
  position: relative;
  text-indent: 1.875rem;
  margin-bottom: 1.5rem;
  color: var(--title-color);
}

#testimonials blockquote p span{
  font: 400 2.5rem serif;
  position: absolute;
  top: -0.375rem;
  left: -1.875rem;
  color: var(--base-color);
}

#testimonials cite{
  display: flex;
  align-items: center;
  font-style: normal;
}

#testimonials cite img{
  width: 2rem;
  height: 2rem;
  object-fit: cover;
  clip-path: circle(); /* SUBSTITUI O BORDER RADIUS E DEIXA A IMG CIRCULAR*/
  margin-right: 0.5rem;
}

/* -------------------- SWIPER ----------------------- */

 .swiper-slide{
   height: auto;
   padding: 4rem 1rem;
 }
 .swiper-pagination-bullet-active {
  background: var(--base-color);
 }

 /* -------------------- CONTACT ----------------------- */
  #contact .grid{
    gap: 4rem;
  }

  #contact .text p {
    margin-bottom: 2rem;
  }

  #contact .button i,
  #contact ul li i{
    font-size: 1.5rem;
    margin-right: 0.625rem;
  }

  #contact ul.grid{
    gap: 2rem;
  }

  #contact ul li{
    display: flex;
    align-items: center;
  }

  #contact ul li i {
    color: var(--base-color);
  }

/* -------------------- FOOTER ----------------------- */
footer {
  background: var(--base-color);
}

footer.section {
  padding: 4rem 0;
}

footer .logo {
  display: inline-block;
  margin-bottom: 1.5rem;
}

footer .brand p {
  color: var(--text-color-light);
  margin-bottom: 0.75rem;
}

footer i {
  font-size: 1.5rem;
  color: var(--text-color-light);
}

footer .social{
  grid-auto-flow: column;
  width: fit-content;
}
footer .social a {
  display: inline-block;
  transition: 0.3s;
}

footer .social a:hover {
  transform: translateY(-8px);
}

/* -------------------- ARROW ----------------------- */
.back-to-top {
  background: var(--base-color);
  color: var(--text-color-light);

  position: fixed;
  right: 1rem;
  bottom: 1rem;

  padding: 0.5rem;
  clip-path: circle();

  font-size: 1.5rem;
  line-height: 0;

  visibility: hidden;
  opacity: 0;

  transition: 0.3s;
  transform: translateY(100%);
}

.back-to-top.show{
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

/* -------------------- RESPONSIVE ----------------------- */
@media (min-width: 1200px) {
  .container{
    max-width:1120px;
    margin-left: auto;
    margin-right: auto;
  }

  .section{
    padding: 10rem 0;
  }

  .section header,
  #testimonials header{
    max-width: 32rem;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .button {
    height: 3.125rem;
  }

  #header.scroll {
    background: var(--body-color);
  }

  /*MENU*/
  nav .menu{
    opacity: 1;
    visibility: visible;
    top: 0;
  }

  nav .menu ul{
    display: flex;
    gap: 2rem;
  }

  nav .menu ul li a.title{
    font: 400 1rem var(--body-font);
    -webkit-font-smoothing: antialiased;
  }

  nav .menu ul li a.title.active {
    font-weight: bold;
    -webkit-font-smoothing: auto;

  }

  nav .icon-menu {
    display: none;
  }

  /*LAYOUT*/
  main {
    margin-top: var(--header-height);
  }

  /*HOME*/
  #home .container{
    grid-auto-flow: column;
    justify-content: space-between;
    margin: 0 auto;
  }

  #home .image{
    order: 1;
  }

  #home .text{
    order: 0;
    max-width: 24rem;
    text-align: left;
  }

  /*ABOUT*/
  #about .container{
    margin: 0 auto;
    grid-auto-flow: column;
  }

  /*SERVICES*/
  .cards{
    grid-template-columns: 1fr 1fr 1fr;
  }

  .card {
   padding-left: 3rem;
   padding-right: 3rem;
  }

  /*TESTIMONIALS*/
  #testimonials .container{
    margin-left: auto;
    margin-right: auto;
  }

  /*CONTACT*/
  #contact .container{
    grid-auto-flow: column;
    align-items: center;
  }  

  #contact .text{
    max-width: 25rem;
  }

  /*FOOTER*/
  footer.section {
    padding: 3.75rem 0;
  }
  
  footer .container{
    grid-auto-flow: column;
    align-items: center;
    justify-content: space-between;
  }

  footer .logo{
    font-size: 2.25rem;
  }
  
}

@media (min-width: 992px) {
  :root {
    --title-font-size: 2.25rem;
    --subtitle-font-size: 1.125rem;
  }
}
`