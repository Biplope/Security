import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../styles/AnimatedText';

const HomePage = () => {
  // get user data from local storage
  return (
    <>
      <div class="row mt-4">
        <div class="px-5 ml-50 col-md-6 col-lg-5 ml-auto d-flex align-items-center mt-4 mt-md-0 mb-4 mb-md-0">
          <div>
            <p class="paragraph1 fs-5 fw-bold text-uppercase">
              The secret to win            </p>
            <p class="paragraph2 display-3 fw-bold text-break">
              POCO
              X5 Pro 5G
            </p>
            <p class="paragraph3">
              Snapdragon® 778G processor

            </p>
            <p> 120Hz FHD+ AMOLED DotDisplay</p>
            <p>
              108MP pro-grade main camera</p><p>
              67W turbo charging</p><Link to={'/user/dashboard'}>
              <button type="button" class="btn btn-primary">Find out more</button></Link>
            <span class="p-4 Demoo">
              <i class="fa-solid fa-circle-play fa-2xl" style={{ color: '#df6951' }}></i>
              <span class="demo">Play Demo</span>
            </span>
          </div>
        </div>
        <div class="col-md-6 mb-4 mb-md-0">
          <div>
            <img alt="Web Studio" class="img-fluid" src="/assets/images/pocox5.jpg" />
          </div>
        </div>
      </div>



      <div className="min-h-screen flex items-center justify-center m-5 px-5">
        <div className="flex flex-col items-center justify-between w-full">
          <div className="w-1/2">
            <img src="../assets/images/lap.png" alt="BM" className="w-full h-auto" />
          </div>


          <div className='container '>
            <div className='row'>
              <div className='col text-center ps-5 ms-5 mt-5 m-5'><AnimatedText
                text="2021 ASUS TUF Dash F15"
                className="!text-6x1 !text-left"
              />
              </div>
            </div >
            <div className='w-full'>
              <figcaption className=' ps-5 ms-5 blockquote-footer'>Windows 10 Home - ASUS recommends Windows 11 Pro for business</figcaption>
              <figcaption className='ps-5 ms-5 blockquote-footer'>Windows 11 Pro for business</figcaption>
              <figcaption className='ps-5 ms-5 blockquote-footer'>NVIDIA® GeForce RTX™ 3060 Laptop GPU</figcaption>
              <figcaption className='ps-5 ms-5 blockquote-footer'>Up to 11th Gen Intel® Core™ i7-11370H</figcaption>
              <figcaption className='ps-5 ms-5 blockquote-footer'>512GB M.2 NVMe™ PCIe® 3.0 SSD</figcaption>
              <figcaption className='ps-5 ms-5 blockquote-footer'>Up to 32 GB memory</figcaption>
              <figcaption className='ps-5 ms-5 blockquote-footer'>Up to 15.6” FHD 240Hz/3ms 100% sRGB</figcaption>
              <figcaption className='ps-5 ms-5 blockquote-footer'>Thunderbolt 4 Support</figcaption></div>


          </div>



        </div>

      </div>
      <div class="container">
        <footer class="py-3 my-4">
          <ul class="nav justify-content-center border-bottom pb-3 mb-3">
            <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Features</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Pricing</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">FAQs</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">About</a></li>
          </ul>
          <p class="text-center text-body-secondary">© 2023 Company, Inc</p>
        </footer>

      </div>
    </>
  );
}

export default HomePage
