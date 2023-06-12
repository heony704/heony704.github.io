import React from 'react';
import IconButtonBar from '../icon-button-bar';
import './style.scss';

function PageFooter({ author }) {
  const { social, name } = author;
  return (
    <footer className="page-footer-wrapper">
      <div className="page-footer">
        <div>
          © {new Date().getFullYear()}
          &nbsp;
          {name}
        </div>
        <div className="social-links">
          <IconButtonBar links={social} />
        </div>
      </div>
    </footer>
  );
}

export default PageFooter;
