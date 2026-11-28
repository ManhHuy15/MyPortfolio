import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import '@/assets/styles/Main.scss';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src="https://avatars.githubusercontent.com/u/128281613?v=4" alt="Nguyễn Mạnh Huy" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/ManhHuy15" target="_blank" rel="noreferrer" title="GitHub"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/nguyenmanhhuy2003/" target="_blank" rel="noreferrer" title="LinkedIn"><LinkedInIcon/></a>
            <a href="mailto:nguyenmanhhuy.dev@gmail.com" target="_blank" rel="noreferrer" title="Email"><EmailIcon/></a>
          </div>
          <h1>Nguyễn Mạnh Huy</h1>
          <p>Software Engineer</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/ManhHuy15" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/nguyenmanhhuy2003/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="mailto:nguyenmanhhuy.dev@gmail.com" target="_blank" rel="noreferrer"><EmailIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
