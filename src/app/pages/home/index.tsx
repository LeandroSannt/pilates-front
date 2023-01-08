import { useWindowWidth } from '@react-hook/window-size';
import React from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { FiFacebook, FiInstagram } from 'react-icons/fi';
import { Element, Link } from 'react-scroll';
import { Keyboard, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Container } from './styles';

import "./carrousel.css";
import "animate.css/animate.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home:React.FC = () =>{

  const onlyWidth = useWindowWidth()

  return(

    
    <Container>
      <header id="header">
      <nav className="container">
        <a className="logo" href="#"> Cintia<span>Freitas</span>. </a>

        <div className="menu">
          <ul className="grid">
          <li><Link activeClass="title" to="home" spy={true} smooth={true} duration={250} >Início</Link></li>
          <li><Link activeClass="title" to="about" spy={true} smooth={true} duration={250} >Sobre</Link></li>
          <li><Link activeClass="title" to="services" spy={true} smooth={true} duration={250} >Beneficios</Link></li>
          <li><Link activeClass="title" to="testimonials" spy={true} smooth={true} duration={250} >Depoimentos</Link></li>
          <li><Link activeClass="title" to="contact" spy={true} smooth={true} duration={250} >Contato</Link></li>
          </ul>
        </div>

      </nav>
      </header>


      <main>

        <Element name="home" className="element big">
          <section className="section" id="home">
            <div className="container grid">
              <div className="image">
                <img
                  src={'../../../assets/pilates2.jpg'}
                  alt="duas pessoas fazendo pilates"
                />
              </div>

              <div className="text">
                <h2 className="title">Pilates é a completa coordenação de corpo, mente e espírito.</h2>

                <p>
                  Pilates não é sobre ser melhor que os outros. É sobre ser melhor do que costumava ser.
                </p>

                <a
                href="https://api.whatsapp.com/send?phone=+5511998666219&text=Oi, gostaria de agendar um horário."
                className="button"
                target="_blank"
                ><i className="icon-whatsapp"></i>Entrar em contato</a
              >
              </div>
            </div>
          </section>
        </Element>


        <div className="divider-1"></div>
        <AnimationOnScroll animateOnce   animateIn="animate__fadeIn">
          <Element name="about" className="element big">
            <section className="section" id="about">
              <div className="container grid">
                <div className="image">
                  <img
                    src={'../../..//assets/pilates1.jpg'}
                    alt="Três mulheres sorrindo"
                  />
                </div>
                <div className="text">
                  <h2 className="title">Sobre nós</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                    tempore culpa rerum molestias blanditiis. Harum earum numquam,
                    quaerat sit dolorem laboriosam magni, reprehenderit quisquam nihil
                    eveniet iste deleniti nostrum nisi.
                  </p>
                  <br />
                  <p>
                    In placerat, felis vitae sodales dictum, lacus quam pretium mi, ut
                    pretium urna turpis eu dui. Vestibulum id ullamcorper nibh. Donec
                    luctus, nunc finibus elementum suscipit, tortor augue vulputate
                    sapien, vitae feugiat enim augue sed.
                  </p>
                  <br />
                  <p>
                    Quisque id aliquam elit. Suspendisse congue pharetra maximus. Duis
                    rutrum velit a leo euismod dictum. Sed sodales est efficitur arcu
                    tincidunt tincidunt. Curabitur fringilla, risus at feugiat
                    feugiat, nisl nulla tincidunt tellus, elementum elementum lorem
                    nisl eleifend dolor. Nullam eget dui at sem ullamcorper luctus.
                  </p>
                  <h2 className="title"></h2>
                  <h2 className="title"></h2>
                </div>
              </div>
            </section>
          </Element>
        </AnimationOnScroll>
        <div className="divider-2"></div>

        <AnimationOnScroll animateOnce   animateIn="animate__fadeIn">
          <Element name="services" className="element big">
            <section className="section" id="services">
              <div className="container grid">
                <header>
                  <h2 className="title  text-center">Beneficios</h2>
                  <p className="subtitle text-center">
                    Com mais de 10 anos no mercado, o <strong> Beautysalon</strong> já
                    conquistou clientes de inúmeros países com seus tratamentos
                    exclusivos e totalmente naturais
                  </p>
                </header>

                <div className="cards grid">
                  <div className="card">
                    <i className="icon-woman-hair"></i>
                    <h3 className="title">Terapia capilar</h3>
                    <p>
                      Terapia completa para couro cabeludo e fios, protegendo todos os
                      tipos de cabelos, inclusive os longos e finos.
                    </p>
                  </div>
                  <div className="card">
                    <i className="icon-trim"></i>
                    <h3 className="title">Corte</h3>
                    <p>
                      A nossa equipe é repleta de profissionais renomados, famosos por
                      lançarem tendências com cortes diferenciados e clássicos.
                    </p>
                  </div>
                  <div className="card">
                    <i className="icon-cosmetic"></i>
                    <h3 className="title">Tratamento</h3>
                    <p>
                      O beautysalon conta com diversos tratamentos naturais e
                      totalmente veganos, para qualquer tipo de cabelo.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </Element>
        </AnimationOnScroll>



        <div className="divider-1"></div>
        <AnimationOnScroll animateOnce scrollableParentSelector={''}   animateIn="animate__fadeIn">

          <Element name="testimonials" className="element big">
            <section className="section" id="testimonials">
              <div className="container">
                <header>
                  <h2 className="title">Depoimentos de quem já passou por aqui</h2>
                </header>
                <Swiper
                  slidesPerView={onlyWidth >  720 ? 2 : 1}
                  spaceBetween={30}
                  keyboard={{
                    enabled: true,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={false}
                  modules={[Keyboard, Pagination, Navigation]}
                  className="mySwiper"
                >
                <SwiperSlide>
                  <div className="testimonial ">
                    <blockquote>
                      <p>
                        <span>&ldquo;</span>
                        Eu sou cliente do Beautysalon há 5 anos e não troco por
                        nada! Certamente meu cabelo mudou muito depois que comecei a
                        tratar somente com produtos naturais e veganos. São
                        profissionais incríveis e qualificados.
                      </p>
                      <cite>
                        <img
                          src="https://randomuser.me/api/portraits/women/68.jpg"
                          alt=""
                        />
                        Wanessa Souza
                      </cite>
                    </blockquote>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial ">
                    <blockquote>
                      <p>
                        <span>&ldquo;</span>
                        Eu sou cliente do Beautysalon há 5 anos e não troco por
                        nada! Certamente meu cabelo mudou muito depois que comecei a
                        tratar somente com produtos naturais e veganos. São
                        profissionais incríveis e qualificados.
                      </p>
                      <cite>
                        <img
                          src="https://randomuser.me/api/portraits/women/68.jpg"
                          alt=""
                        />
                        Wanessa Souza
                      </cite>
                    </blockquote>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial ">
                    <blockquote>
                      <p>
                        <span>&ldquo;</span>
                        Eu sou cliente do Beautysalon há 5 anos e não troco por
                        nada! Certamente meu cabelo mudou muito depois que comecei a
                        tratar somente com produtos naturais e veganos. São
                        profissionais incríveis e qualificados.
                      </p>
                      <cite>
                        <img
                          src="https://randomuser.me/api/portraits/women/68.jpg"
                          alt=""
                        />
                        Wanessa Souza
                      </cite>
                    </blockquote>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial ">
                    <blockquote>
                      <p>
                        <span>&ldquo;</span>
                        Eu sou cliente do Beautysalon há 5 anos e não troco por
                        nada! Certamente meu cabelo mudou muito depois que comecei a
                        tratar somente com produtos naturais e veganos. São
                        profissionais incríveis e qualificados.
                      </p>
                      <cite>
                        <img
                          src="https://randomuser.me/api/portraits/women/68.jpg"
                          alt=""
                        />
                        Wanessa Souza
                      </cite>
                    </blockquote>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial ">
                    <blockquote>
                      <p>
                        <span>&ldquo;</span>
                        Eu sou cliente do Beautysalon há 5 anos e não troco por
                        nada! Certamente meu cabelo mudou muito depois que comecei a
                        tratar somente com produtos naturais e veganos. São
                        profissionais incríveis e qualificados.
                      </p>
                      <cite>
                        <img
                          src="https://randomuser.me/api/portraits/women/68.jpg"
                          alt=""
                        />
                        Wanessa Souza
                      </cite>
                    </blockquote>
                  </div>
                </SwiperSlide>
                
                <SwiperSlide>
                  <div className="testimonial ">
                    <blockquote>
                      <p>
                        <span>&ldquo;</span>
                        Minha mãe frequenta o salão há anos e me levou um dia para
                        conhecer. Minha experiência foi incrível, eu continuo
                        fazendo o a terapia capilar e isso salvou o meu cabelo.
                        Adoro todos os profissionais do Beautysalon.
                      </p>
                      <cite>
                        <img
                          src="https://randomuser.me/api/portraits/women/92.jpg"
                          alt=""
                        />
                        Franciele Silva
                      </cite>
                    </blockquote>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial ">
                    <blockquote>
                      <p>
                        <span>&ldquo;</span>
                        Lorem ipsum dolor sit amet, consectetur adip
                      </p>
                      <cite>
                        <img
                          src="https://randomuser.me/api/portraits/women/88.jpg"
                          alt=""
                        />
                        Valesca Santos
                      </cite>
                    </blockquote>
                  </div>
                </SwiperSlide>

                </Swiper>
              </div>
            </section>
          </Element>
        </AnimationOnScroll>


        <div className="divider-2"></div>

        <AnimationOnScroll animateOnce   animateIn="animate__fadeIn">

        <Element name="contact" className="element big">
          
          
        <section className="section" id="contact">
          <div className="container grid">
            <div className="text">
              <h2 className="title">Entre em contato com a gente!</h2>
              <p>
                Entre em contato com a Beautysalon, queremos tirar suas dúvidas,
                ouvir suas críticas e sugestões.
              </p>

              <a
                href="https://api.whatsapp.com/send?phone=+5511998666219&text=Oi, gostaria de agendar um horário."
                className="button"
                target="_blank"
                ><i className="icon-whatsapp"></i>Entrar em contato</a
              >
            </div>

            <div className="links">
              <ul className="grid">
                <li><i className="icon-phone"></i> 85 99866-6219</li>
                <li><i className="icon-map-pin"></i> R. Cônego Braveza, 757</li>
                <li><i className="icon-mail"></i>cintia.sfreitasfisio@gmail.com</li>
              </ul>
            </div>
          </div>
        </section>
        </Element>
        </AnimationOnScroll>


        <div className="divider-1"></div>
      </main>

      <footer className="section">
        <div className="container grid">
          <div className="brand">
            <a className="logo logo-alt" href="#home"> Cintia<span>Freitas</span>.</a>

            <p>©2021 Cintia Freitas.</p>
            <p>Todos os direitos reservados.</p>
          </div>

          <div className="social grid">
            <a href="https://www.instagram.com/" target="_blank"><FiInstagram size={35} color={"fff"}/></a>
            <a href="https://www.facebook.com/" target="_blank"><FiFacebook size={35} color={"fff"}/></a>
          </div>
        </div>
      </footer>

    </Container>
  )
}
export default Home