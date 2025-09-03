import React from "react";
import "../../styles/layout/footer.css";

function GitHubIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.35-1.75-1.35-1.75-1.1-.75.09-.74.09-.74 1.21.09 1.85 1.24 1.85 1.24 1.08 1.86 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.46-1.33-5.46-5.9 0-1.31.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.92 1.24 3.23 0 4.59-2.8 5.59-5.47 5.89.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5ZM18 6.3a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2.01A9.95 9.95 0 0 0 2 12.06a9.86 9.86 0 0 0 1.51 5.2L2 22l4.86-1.49a9.96 9.96 0 1 0 5.18-18.5Zm5.75 15.19c-.24.67-1.38 1.26-1.9 1.3-.49.05-1.1.07-1.77-.11a9.38 9.38 0 0 1-4.04-2.34 10.63 10.63 0 0 1-2.29-3.02c-.48-.88-.9-1.86-1-2.92-.1-1.07.32-2.25.75-2.7.34-.36.76-.39 1-.39h.72c.23 0 .55-.09.86.66l.66 1.58c.07.17.11.36.02.57-.08.2-.12.32-.24.49-.12.18-.26.4-.37.53-.12.14-.25.29-.11.54.13.25.6.99 1.28 1.61.9.84 1.66 1.12 1.93 1.25.27.13.43.11.59-.07.16-.17.69-.8.87-1.07.18-.26.36-.22.6-.13.25.08 1.55.73 1.82.86.27.13.45.2.52.31.07.12.07.7-.17 1.37Z" />
    </svg>
  );
}

function YouTubeIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.5 7.2a3.6 3.6 0 0 0-2.53-2.55C19.05 4.2 12 4.2 12 4.2s-7.05 0-8.97.45A3.6 3.6 0 0 0 .5 7.2C.05 9.12.05 12 .05 12s0 2.88.45 4.8A3.6 3.6 0 0 0 3.03 19.35c1.92.45 8.97.45 8.97.45s7.05 0 8.97-.45a3.6 3.6 0 0 0 2.53-2.55c.45-1.92.45-4.8.45-4.8s0-2.88-.45-4.8ZM9.75 15.02V8.98L15.51 12l-5.76 3.02Z" />
    </svg>
  );
}

export default function Footer({
  brand = "ClimatologiaBits",
  startYear = 2025,
  github = "https://github.com/Yuri-Hostins",
  instagram = "https://www.instagram.com/yurihr.___/",
  whatsapp = "https://api.whatsapp.com/send/?phone=554797588370&text&type=phone_number&app_absent=0",
  youtube = "https://www.youtube.com/@HRTech-Solutions",
}) {
  const yearRange = startYear === new Date().getFullYear()
    ? `${startYear}`
    : `${startYear} - ${new Date().getFullYear()}`;

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-topbar" aria-hidden="true" />
      <div className="gb-shell footer-inner">
        <small className="footer-copy">
          &copy; {brand} {yearRange} •  Desenvolvido por <strong>Yuri Hostins Raimundo</strong>
        </small>


        <nav className="footer-social" aria-label="Redes sociais">
          <a className="sbtn" href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a className="sbtn" href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a className="sbtn" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
          <a className="sbtn" href={youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <YouTubeIcon />
          </a>
        </nav>
      </div>
    </footer>
  );
}
