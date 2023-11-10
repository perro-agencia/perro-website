export default function ContactPage() {

  return (
    <div className='contactBody'>
      <div className="contactForm">
        <form>
          <div>
            <input className="primary-input" type="email" placeholder="Email" />
            <input className="primary-input" type="text" placeholder="Nombre" />
          </div>

          <div>
            <input className="primary-input" type="text" placeholder="Empresa" />
            <input className="primary-input" type="number" placeholder="Teléfono" />
          </div>

          <div>
            <textarea className="primary-textarea" id="" cols="30" rows="10" placeholder="Mensaje"></textarea>
          </div>

          <button className="primary-button" type="submit">Enviar</button>
        </form>
      </div>

      <div className="contactCopy">
        <h2>
          contannos tus ideeas
        </h2>

        <p>
          Ponete en contacto con nosotros y preparate para que llevemos tus ideas al siguiente nivel.
        </p>
      </div>
    </div>
  )
}