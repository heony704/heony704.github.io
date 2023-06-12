import React from 'react';
import './style.scss';

function Bio({ author }) {
  if (!author) return null;
  const { bio, name } = author;
  return (
    <div className="bio">
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
    </div>
  );
}

export default Bio;
