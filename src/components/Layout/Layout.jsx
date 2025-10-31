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
          // use a fallback for navbar height so layouts work even if the CSS var isn't inherited
          paddingTop: 'var(--navbar-height, 64px)',
          minHeight: 'calc(100vh - var(--navbar-height, 64px))',
          // FAQ spacing tokens (can be overridden in higher scopes if needed)
          '--faq-page-vertical': '48px',
          '--faq-page-horizontal': '24px',
          '--faq-container-max-width': '1024px',
          '--faq-search-max-width': '48rem',
          '--faq-gap': '12px',
          '--faq-card-padding': '16px',
        }}
      >
        {children}
      </main>
    </>
  );
}
