import React from 'react';
import './style.scss';

function Bio({ author, language = 'ko' }) {
  if (!author) return null;
  const { bio, name } = author;
  return (
    <div className="bio">
      {language === 'ko' ? (
        <div className="introduction">
          <p className="title">
            안녕하세요.
            <br />
            {bio.role} <strong>{name}</strong>입니다.
            <br />
          </p>
          {bio.description.map((description, index) => (
            <p className="description" key={index}>
              {description}
            </p>
          ))}
        </div>
      ) : (
        <div className="introduction english">
          <p className="title">
            Hello,
            <br />
            my name is
            <br />
            <strong>{name}</strong>
            .<br />
          </p>
          <p className="description">
            <br />
          </p>
        </div>
      )}
    </div>
  );
}

export default Bio;
