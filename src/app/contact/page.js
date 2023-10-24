export default function ContactPage() {

  return (
    <div className='contactBody'>
      <div className="contactForm">
        <form>
          <div>
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Nombre" />
          </div>

          <div class="form-element">
            <input type="text" placeholder="Empresa" />
            <input type="number" placeholder="Teléfono" />
          </div>

          <div class="form-element">
            <textarea id="" cols="30" rows="10" placeholder="Mensaje"></textarea>
          </div>

          <button type="submit">Enviar</button>
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