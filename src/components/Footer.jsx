import './Footer.css'

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>© {year} Сайт для вивчення українських історичних подій present by gentel 
        </p>
      </div>
    </footer>
  )
}

export default Footer