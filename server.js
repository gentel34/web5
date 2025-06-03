import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© 2025 Сайт для вивчення українських історичних подій present by gentel 
        </p>
      </div>
    </footer>
  )
}

export default Footer

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});