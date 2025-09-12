const Footer = () => {
  return (
    <footer className="border-t bg-background h-full flex items-center">
      <div className="container py-10 text-sm w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Mel Bao • Made in a Home Kitchen. Permitted by Santa Clara County Department of Environmental Health. Permit #PT0505791
          </p>
          <nav className="flex gap-4">
            <a href="#menu" className="hover:opacity-80">Menu</a>
            <a href="#instagram" className="hover:opacity-80 transition">Gallery</a>
            <a href="#about" className="hover:opacity-80">About</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
