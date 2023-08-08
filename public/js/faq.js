document.getElementById("faq").innerHTML = `
<div id="faq">
    <div
      class="modal fade"
      id="faqModal"
      tabindex="-1"
      aria-labelledby="faqModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="faqModalLabel">
              Preguntas frecuentes / FAQ
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body mx-auto">
            <div class="container-fluid">
              <div class="accordion" id="accordionFAQ">
                <div class="card">
                  <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                      <button
                        class="btn btn-block text-left"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        style="color: #f28f1d;"
                      >
                        <b>¿Qué es Bondzù?</b>
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseOne"
                    class="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordionFAQ"
                  >
                    <div class="card-body" style="text-align: justify;">
                      Bondzù es una iniciativa de educación y
                      concientización utilizando los nuevos medios de
                      comunicación que permite internet. Hace uso
                      intensivo de las redes sociales, aplicaciones para
                      teléfonos inteligentes y páginas web. Lo que
                      buscamos es darle vida digna a los animales en
                      cautiverio. Lo ideal es que los animales vivan en su
                      hábitat. Sin embargo, existen muchos animales en
                      cautiverio que es imposible liberar porque no
                      podrían adaptarse a un medio salvaje. Nuestra
                      contribución es darle información a la gente y
                      encender su amor por la naturaleza. Existen muchas
                      instituciones que hacen su mejor esfuerzo para
                      mantener en la mejor forma posible a estos animales
                      que están en cautiverio. Pero estas instituciones
                      necesitan que se conozcan sus esfuerzos y
                      contribuciones para recibir el apoyo de la gente, se
                      solidaricen y estén dispuestos a apoyar
                      económicamente sus actividades en favor de la
                      preservación de las especies. Bondzù trabaja todos
                      los días para que la gente pueda disfrutar de
                      imágenes en vivo de los animales. El departamento de
                      investigación y desarrollo está trabajando en el
                      diseño de diversos dispositivos robóticos y juguetes
                      para que sirvan como enriquecimiento ambiental y
                      contribuyan a una mayor actividad física de los
                      animales en cautiverio. Bondzù promueve el amor a
                      los animales pero sobre todo, una actitud de respeto
                      hacia todo ser vivo.
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header" id="headingTwo">
                    <h2 class="mb-0">
                      <button
                        class="btn btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                        style="color: #f28f1d;"
                      >
                        <b
                          >¿Se puede descargar la App en cualquier
                          dispositivo?</b
                        >
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseTwo"
                    class="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordionFAQ"
                  >
                    <div class="card-body" style="text-align: justify;">
                      Sí, se puede descargar la aplicación a través de un
                      teléfono inteligente o una tableta, también se puede
                      disfrutar de nuestro contenido en computadoras de
                      escritorio y portátiles a través de esta página web.
                      <br />
                      <br />

                      <b>En iOS: </b> Ve al App Store, busca Bondzù,
                      instala, y listo, disfruta de todo el contenido que
                      hemos preparado para ti.
                      <br />
                      <br />
                      <b>En Android:</b> Ve al Play Store, busca Bondzù,
                      instala, y listo, disfruta de todo el contenido que
                      hemos preparado para ti.
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header" id="headingThree">
                    <h2 class="mb-0">
                      <button
                        class="btn btn-block text-left collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                        style="color: #f28f1d;"
                      >
                        <b>¿Por qué debería adoptar?</b>
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseThree"
                    class="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordionFAQ"
                  >
                    <div class="card-body" style="text-align: justify;">
                      La función principal de los zoológicos es trabajar
                      para la preservación de las especies, así como su
                      protección; no buscan mantener a los animales fuera
                      de su entorno para vivir en condiciones inadecuadas,
                      como cuestión de hecho, estamos comprometidos con la
                      mejora de sus condiciones de vida. Para muchas
                      especies, los zoológicos se han convertido en los
                      centros que han impedido su extinción.
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
`;
