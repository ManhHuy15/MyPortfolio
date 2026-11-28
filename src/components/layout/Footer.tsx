import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '@/assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/ManhHuy15" target="_blank" rel="noreferrer"><GitHubIcon/></a>
        <a href="https://www.linkedin.com/in/nguyenmanhhuy2003/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
      </div>
      <p>Portfolio designed & built by <a href="https://github.com/ManhHuy15" target="_blank" rel="noreferrer">Nguyen Manh Huy</a></p>
    </footer>
  );
}

export default Footer;