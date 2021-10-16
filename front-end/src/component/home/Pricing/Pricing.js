import React,{useState} from 'react'

import css from "./Pricing.css"

import 'bootstrap/dist/css/bootstrap.min.css'
function Pricing() 
{
  const [price, setPrice] = useState(true)

    return (
      <div className='pricingScroll pricing1 py-5 bg-light'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-8 text-center'>
              <h3 className='mt-3 font-weight-medium mb-1'>
                Pricing to make your Work Effective
              </h3>
              <h6 className='subtitle'>
                We offer 100% satisafaction
              </h6>
              <div className='switcher-box mt-4 d-flex align-items-center justify-content-center'>
                <span className='font-14 font-weight-medium'>MONTHLY</span>
                <div className='onoffswitch position-relative mx-2'>
                  <input
                    type='checkbox'
                    name='onoffswitch1'
                    className='onoffswitch-checkbox d-none'
                    id='myonoffswitch1'
                    onClick={() => setPrice(!price)}
                  />
                  <label
                    className='onoffswitch-label d-block overflow-hidden'
                    for='myonoffswitch1'
                  >
                    <span className='onoffswitch-inner d-block'></span>
                    <span className='onoffswitch-switch d-block bg-white position-absolute'></span>
                  </label>
                </div>
                <span className='font-14 font-weight-medium'>YEARLY</span>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-lg-3 col-md-6'>
              <div className='card text-center card-shadow on-hover border-0 mb-4'>
                <div className='card-body font-14'>
                  <h5 className='mt-3 mb-1 font-weight-medium'>BASIC</h5>
                  <h6 className='subtitle font-weight-normal'>
                  Less than 200 students 
                  </h6>
                  <div className='pricing my-3'>
                    <sup>Rs</sup>
                    {price ? (
                      <span className='monthly display-5'>80</span>
                    ) : (
                      <span className='monthly display-5'>800</span>
                    )}
                    {price ? (
                      <small className='monthly'>/mo</small>
                    ) : (
                      <small className='monthly'>/yr</small>
                    )}
                  </div>
                  <ul className='list-inline'>
                  <li className='d-block py-2'>Per Student</li>
                    <li className='d-block py-2'>Perfect of Tution Centers</li>
                    
                     <li className='d-block py-2'></li>
                     <li className='d-block py-2'></li>
                     <li className='d-block py-2'></li> 
                  </ul>
                  <div className='bottom-btn'>
                    <a
                      className='btn btn-success-gradiant btn-md text-white btn-block'
                      href='#f1'
                    >
                      <span>Choose Plan</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-3 col-md-6'>
              <div className='card text-center card-shadow on-hover border-0 mb-4'>
                <div className='card-body font-14'>
                  <span className='badge badge-inverse p-2 position-absolute price-badge font-weight-normal'>
                    Popular
                  </span>
                  <h5 className='mt-3 mb-1 font-weight-medium'>INTERMEDIATE</h5>
                  <h6 className='subtitle font-weight-normal'>
                  For 200-450 students
                  </h6>
                  <div className='pricing my-3'>
                    <sup>Rs</sup>
                    {price ? (
                      <span className='monthly display-5'>60</span>
                    ) : (
                      <span className='monthly display-5'>600</span>
                    )}
                    {price ? (
                      <small className='monthly'>/mo</small>
                    ) : (
                      <small className='monthly'>/yr</small>
                    )}
                  </div>
                  <ul className='list-inline'>
                  <li className='d-block py-2'>Per Student</li>
                    <li className='d-block py-2'>Perfect for Small Schools</li>
    
                  
                     <li className='d-block py-2'></li>
                     <li className='d-block py-2'></li>
                     <li className='d-block py-2'></li> 
                     <li className='d-block py-2'></li> 
                  </ul>
                  <div className='bottom-btn'>
                    <a
                      className='btn btn-danger-gradiant btn-md text-white btn-block'
                      href='#f1'
                    >
                      <span>Choose Plan</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-3 col-md-6'>
              <div className='card text-center card-shadow on-hover border-0 mb-4'>
                <div className='card-body font-14'>
                  <h5 className='mt-3 mb-1 font-weight-medium'>
                    HIGH CLASS
                  </h5>
                  <h6 className='subtitle font-weight-normal'>
                  For 450-750 students
                  </h6>
                  <div className='pricing my-3'>
                    <sup>Rs</sup>
                    {price ? (
                      <span className='monthly display-5'>45</span>
                    ) : (
                      <span className='monthly display-5'>450</span>
                    )}
                    {price ? (
                      <small className='monthly'>/mo</small>
                    ) : (
                      <small className='monthly'>/yr</small>
                    )}
                  </div>
                  <ul className='list-inline'>
                  <li className='d-block py-2'>Per Student</li>
                     <li className='d-block py-2'>Perfect for Colleges</li>
                     
                     <li className='d-block py-2'></li>
                     <li className='d-block py-2'></li>
                     <li className='d-block py-2'></li> 
                  </ul>
                  <div className='bottom-btn'>
                    <a
                      className='btn btn-success-gradiant btn-md text-white btn-block'
                      href='#f1'
                    >
                      <span>Choose Plan</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-3 col-md-6'>
              <div className='card text-center card-shadow on-hover border-0 mb-4'>
                <div className='card-body font-14'>
                  <h5 className='mt-3 mb-1 font-weight-medium'>SUPREME</h5>
                  <h6 className='subtitle font-weight-normal'>
                    For 750+ students
                  </h6>
                  <div className='pricing my-3'>
                    <sup>Rs</sup>
                    {price ? (
                      <span className='monthly display-5'>40</span>
                    ) : (
                      <span className='monthly display-5'>400</span>
                    )}
                    {price ? (
                      <small className='monthly'>/mo</small>
                    ) : (
                      <small className='monthly'>/yr</small>
                    )}
                  </div>
                  <ul className='list-inline'>
                  <li className='d-block py-2'>Per Student</li>
                    <li className='d-block py-2'>Perfect for Large Institutes</li>
                   
                    <li className='d-block py-2'></li>
                    <li className='d-block py-2'></li>
                    <li className='d-block py-2'></li>
                  </ul>
                  <div className='bottom-btn'>
                    <a
                      className='btn btn-success-gradiant btn-md text-white btn-block'
                      href='#f1'
                    >
                      <span>Choose Plan</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Pricing
