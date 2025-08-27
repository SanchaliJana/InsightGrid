function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-700 to-teal-900 text-white text-center py-6 px-4 shadow-inner mt-auto">
      <p className="text-sm sm:text-base">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-yellow-300">Sanchali</span>. All rights reserved.
        <br className="sm:hidden" />
        
      </p>
    </footer>
  );
}

export default Footer;
