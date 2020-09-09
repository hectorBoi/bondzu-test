document.getElementById("faq").innerHTML = `
<div id="faq">
  <div
    class="modal fade"
    id="faqModal"
    tabindex="-1"
    aria-labelledby="faqModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="faqModalLabel">FAQ</h5>
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
                      style="color: #f28f1d"
                    >
                      <b>What is Bondzù</b>
                    </button>
                  </h2>
                </div>

                <div
                  id="collapseOne"
                  class="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordionFAQ"
                >
                  <div class="card-body" style="text-align: justify">
                    Bondzù is an education and awareness initiative using the
                    new means of communication that the internet enables. Makes
                    heavy use of social media, smartphone apps, and web pages.
                    What we seek is to give animals in captivity a dignified
                    life. Ideally, animals should live in their habitat;
                    however, there are many animals in captivity that it is
                    impossible to release, because they could not adapt to a
                    wild environment. Our contribution is to give people
                    information and ignite their love for nature. There are many
                    institutions that do their best to keep these captive
                    animals in the best possible shape. But these institutions
                    need that their efforts and contributions to be known to
                    receive the support of the people, to show solidarity and to
                    be willing to financially support their activities in favor
                    of the preservation of the species. Bondzù works every day
                    so that people can enjoy live images of animals. The
                    research and development department is working on the design
                    of various robotic devices and toys to serve as
                    environmental enrichment and contribute to greater physical
                    activity for animals in captivity. Bondzù promotes the love
                    of animals, but above all, an attitude of respect towards
                    all living beings.
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
                      style="color: #f28f1d"
                    >
                      <b>Can the App be downloaded on any device?</b>
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseTwo"
                  class="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionFAQ"
                >
                  <div class="card-body" style="text-align: justify">
                    Yes, you can download the application to a smartphone or
                    tablet, you can also enjoy our content on desktop and laptop
                    computers through this website
                    <br />
                    <br />

                    <b>On iOS: </b> Go to the App Store, search for Bondzù,
                    install, and ready, enjoy all the content we have prepared
                    for you
                    <br />
                    <br />
                    <b>On Android:</b> Go to the Play Store, search for Bondzù,
                    install, and ready, enjoy all the content we have prepared
                    for you.
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
                      style="color: #f28f1d"
                    >
                      <b>Why should you “adopt” an animal?</b>
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseThree"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordionFAQ"
                >
                  <div class="card-body" style="text-align: justify">
                    The main function of zoos is to work for the preservation of
                    species, as well as their protection; They do not seek to
                    keep animals out of their environment to live in inadequate
                    conditions, as a matter of fact, we are committed to
                    improving their living conditions. For many species, zoos
                    have become the centers that have prevented their
                    extinction.
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
