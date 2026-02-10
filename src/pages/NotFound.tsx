const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted bg-paper-texture">
      <div className="text-center space-y-4 p-8">
        <img
          src="/tofuchos/tofucho sorprendido.png"
          alt="Tofucho sorprendido"
          className="w-32 h-32 mx-auto mb-4 object-contain"
        />
        <h1 className="font-display text-6xl sm:text-8xl text-primary" style={{ WebkitTextStroke: '2px hsl(var(--ink))' }}>404</h1>
        <p className="font-display text-xl text-foreground">¡Ups! Esta página no existe</p>
        <p className="text-sm text-muted-foreground">Parece que te perdiste buscando tofu...</p>
        <a
          href="/"
          className="btn-brutal inline-block mt-4"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
