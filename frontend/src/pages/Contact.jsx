import styled from "styled-components";
const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              transform: scale(0.9);  
            }
          }
        }
      }
    }
  `;

  return (
    <Wrapper>
      <h2>Contact Page</h2>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3676941840763!2d85.3263983754673!3d27.705931376183457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a74aa1f23%3A0x74ebef82ad0e5c15!2sSoftwarica%20College!5e0!3m2!1sen!2snp!4v1706287803309!5m2!1sen!2snp"
        width="1000"
        height="450"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
      <div className="container">
        <div className="contact-form">
          <form action="https://formspree.io/f/mvoezwdn" method="POST" className="contact-inputs">
            <input className="form-control" type="text" placeholder="username" name="username" required autoComplete="off" />
            <input className="form-control" type="email" placeholder="email" name="Email" required autoComplete="off" />
            <textarea className="form-control" name="message" cols={30} rows={10} required autoComplete="off" placeholder="Enter your Message"></textarea>
            <input className="form-control" type="submit" value="Send" />
            {/* <button className="btn btn-primary">Send</button> */}
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
