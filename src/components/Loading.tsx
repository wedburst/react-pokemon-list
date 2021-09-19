export const Loading = () => {
  return (
    <div>
      <div className="alert alert-info">
        <p>Cargando...</p>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </div>
  );
};
