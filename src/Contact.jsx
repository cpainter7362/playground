import React from 'react';

const Contact = () => {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <h1 className="card-title text-center mb-4">Contact Us</h1>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label fw-semibold">Name</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    id="name"
                    placeholder="Enter your name" 
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-semibold">Email</label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    id="email"
                    placeholder="Enter your email" 
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="form-label fw-semibold">Message</label>
                  <textarea 
                    className="form-control form-control-lg" 
                    id="message" 
                    rows="5"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                <div className="text-center">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg px-5 py-3 fw-semibold"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 