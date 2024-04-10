'use client';

import React from 'react';

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <style jsx>{`
        body {
          color: #000;
          background: #fff;
          margin: 0;
        }
        .next-error-h1 {
          border-right: 1px solid gray;
        }
        @media (prefers-color-scheme: dark) {
          body {
            color: #fff;
            background: #000;
          }
        }
      `}</style>
      <h1
        className='next-error-h1'
        style={{
          display: 'inline-block',
          margin: '0px 20px 0px 0px',
          padding: '0px 23px 0px 0px',
          fontSize: '24px',
          fontWeight: 500,
          verticalAlign: 'top',
          lineHeight: '49px',
        }}
      >
        404
      </h1>
      <div style={{ display: 'inline-block' }}>
        <h2
          style={{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '49px',
            margin: '0px',
          }}
        >
          This page could not be found.
        </h2>
      </div>
    </div>
  );
};

export default NotFoundPage;
