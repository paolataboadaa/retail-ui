import plusSvg from '../assets/plus.svg'

const venta = [
    {
        type: 'venta',
        src: 'venta_virtuales.png',
        title: 'virtuales',
        class: 'venta_virtuales',
    },
    {
        type: 'venta',
        src: 'venta_bingo.png',
        title: 'bingo',
        class: 'venta_bingo',
    },
    {
        type: 'venta',
        src: 'venta_caballos.png',
        title: 'caballos',
        class: 'venta_caballos',
    },
    {
        type: 'venta',
        src: 'venta_torito.png',
        title: 'torito',
        class: 'venta_torito',
    }
]
const pago = [
    {
        type: 'pago',
        src: 'pago_sportsbook.png',
        title: 'sportsbook',
        class: 'pago_sportsbook',
    },
    {
        type: 'pago',
        src: 'pago_virtuales.png',
        title: 'virtuales',
        class: 'pago_virtuales',
    },
    {
        type: 'pago',
        src: 'pago_bingo.png',
        title: 'bingo',
        class: 'pago_bingo',
    },
    {
        type: 'pago',
        src: 'pago_caballos.png',
        title: 'caballos',
        class: 'pago_caballos',
    }
]
const saldo = [
    {
        type: 'saldo',
        src: 'saldo_web.png',
        title: 'web',
        class: 'saldo_web',
    },
    {
        type: 'saldo',
        src: 'recarga_autoservicio.png',
        title: 'recarga autoservicio',
        class: 'recarga_autoservicio',
    },
    {
        type: 'saldo',
        src: 'retiro_autoservicio.png',
        title: 'retiro autoservicio',
        class: 'retiro_autoservicio',
    },
]

export const UserPanel = () => {
  return (
    <div className="user__panel">
        <div className="panel__actions">
            <h3>Venta</h3>
            <div className="container-box">
                {
                    venta.map((item) => (
                        <div key={item.class} className={`action-box ${item.class}`} style={{backgroundImage: `url(/src/assets/panel/${item.src})`}}>
                            <img src={plusSvg} alt="Icono agregar" />
                            <p>{item.title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="panel__actions">
            <h3>Pago</h3>
            <div className="container-box">
                {
                    pago.map((item) => (
                        <div key={item.class} className={`action-box payment ${item.class}`} style={{backgroundImage: `url(/src/assets/panel/${item.src})`}}>
                            <img src={plusSvg} alt="Icono agregar" />
                            <p>{item.title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="panel__actions">
            <h3>Saldos</h3>
            <div className="container-box">
                {
                   saldo.map((item) => (
                        <div key={item.class} className={`action-box balance ${item.class}`} style={{backgroundImage: `url(/src/assets/panel/${item.src})`}}>
                            <img src={plusSvg} alt="Icono agregar" />
                            <p>{item.title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}
