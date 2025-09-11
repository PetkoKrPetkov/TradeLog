export default function ErrorBanner({ children }) {
  return (
    <div
      role="alert"
      style={{
        color: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.08)',
        border: '1px solid rgba(220, 38, 38, 0.25)',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '15px',
        textAlign: 'center',
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}

