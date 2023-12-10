export default function blockRoute() {
  return (
    <main>
      <main className="flex flex-col justify-center items-center h-96">
        <h2 className="flex flex-wrap gap-2 text-lg font-semibold justify-center text-center">
          <span>Too many requests...</span>
          <span>Try again at a later time</span>
        </h2>
      </main>
    </main>
  );
}
