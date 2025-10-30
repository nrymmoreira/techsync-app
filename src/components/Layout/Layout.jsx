/* eslint-disable react/prop-types */
import Navbar from "../Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {/*
        main gets padding-top equal to navbar height so pages don't need to hardcode offsets.
        Also expose a small set of FAQ CSS variables here so all FAQ pages inherit consistent spacing.
      */}
      <main
        style={{
          paddingTop: 'var(--navbar-height)',
          minHeight: 'calc(1000vh - var(--navbar-height))',
          // FAQ spacing tokens (can be overridden in higher scopes if needed)
          '--faq-page-vertical': '150px',
          '--faq-page-horizontal': '100px',
          '--faq-container-max-width': '1024px',
          '--faq-search-max-width': '48rem',
          '--faq-gap': '15px',
          '--faq-card-padding': '16px',
        }}
      >
        {children}
      </main>
    </>
  );
}
