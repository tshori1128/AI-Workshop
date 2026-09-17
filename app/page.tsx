export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <header className="hero">
        <h1>Tiffany Horimoto</h1>
        <p>a junior at UH Manoa studying SLS</p>
      </header>

      <main>
        <section className="section" aria-labelledby="about-heading">
          <h2 id="about-heading">About</h2>
          <p>
            Tiffany is a junior at the University of Hawai&apos;i at Manoa,
            where she studies Second Language Studies (SLS). She&apos;s
            interested in how people acquire and use languages beyond their
            first, and how that understanding can shape better teaching and
            learning. Outside of coursework, she enjoys exploring the ways
            language connects communities across Hawai&apos;i and beyond.
          </p>
        </section>

        <section className="section" aria-labelledby="semester-heading">
          <h2 id="semester-heading">This semester</h2>
          <ul>
            <li>Placeholder: Second Language Acquisition Theory coursework</li>
            <li>Placeholder: a classroom observation or tutoring project</li>
            <li>Placeholder: active in a language exchange or club on campus</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>
          Tiffany Horimoto &middot; {year}
        </p>
      </footer>
    </>
  );
}
