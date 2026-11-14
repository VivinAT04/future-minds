
const programmes = [
  { number: "01", title: "School Tuition", detail: "Classes 6–12", description: "Academic support for Classes 6–12 across CBSE, ICSE, Tamil Nadu State Board and Matriculation, including Tamil and other subjects.", tags: ["CBSE", "ICSE", "State Board", "Matriculation", "Tamil"] },
  { number: "02", title: "Competitive Exams", detail: "NEET & JEE", description: "Concept-led preparation, focused practice and regular progress reviews for ambitious aspirants.", tags: ["NEET", "JEE Main", "JEE Advanced"] },
  { number: "03", title: "Engineering", detail: "Higher Education", description: "Academic pathways across CSE, biomedical, electronics, mechanical, civil and other engineering disciplines.", tags: ["CSE", "Biomedical", "ECE", "Mechanical", "Civil"] },
];

export default function Home() {
  return (
    <div className="site-shell">
      <main>
        <section className="hero" id="about">
          <div className="hero-main">
            <div className="eyebrow"><span className="eyebrow-line" /> EDUCATION WITH PURPOSE</div>
            <h1>Better learning.<br/><span>Brighter futures.</span></h1>
            <p className="hero-copy">A place to build confidence, master concepts and move towards your next big milestone. Welcome to a more thoughtful way to learn.</p>
            <div className="hero-actions"><a className="button-primary" href="#programmes">Explore programmes <span aria-hidden="true">↗</span></a><a className="button-secondary" href="#approach">Discover our approach <span aria-hidden="true">→</span></a></div>
            <div className="hero-foot"><div className="hero-foot-number">06<span>—</span>12</div><div className="hero-foot-copy">School tuition · Competitive exams<br/>Engineering education</div></div>
          </div>
          <div className="hero-art" aria-label="Future Minds learning programmes">
            <div className="learning-showcase">
              <div className="showcase-heading">
                <span className="showcase-eyebrow">A WORLD OF POSSIBILITIES</span>
                <h2>Knowledge today.<br/><span>Opportunity tomorrow.</span></h2>
                <p>Structured learning for every important academic milestone.</p>
              </div>

              <div className="showcase-feature">
                <div className="showcase-feature-top">
                  <span>YOUR LEARNING JOURNEY</span>
                  <span>01 — 03</span>
                </div>

                <div className="learning-step">
                  <span className="step-number">01</span>
                  <div>
                    <strong>Build your foundation</strong>
                    <small>School education · Classes 6–12</small>
                  </div>
                  <span className="step-arrow">↗</span>
                </div>

                <div className="learning-step">
                  <span className="step-number">02</span>
                  <div>
                    <strong>Prepare with purpose</strong>
                    <small>NEET · JEE Main · JEE Advanced</small>
                  </div>
                  <span className="step-arrow">↗</span>
                </div>

                <div className="learning-step">
                  <span className="step-number">03</span>
                  <div>
                    <strong>Go beyond the classroom</strong>
                    <small>Engineering education</small>
                  </div>
                  <span className="step-arrow">↗</span>
                </div>
              </div>

              <div className="showcase-footer">
                <span>THINK BIGGER</span>
                <span>LEARN BETTER</span>
                <span>GO FURTHER</span>
              </div>
            </div>
          </div>
        </section>
        <section className="statement" id="approach"><span className="section-kicker">THE FUTURE MINDS PHILOSOPHY</span><p>Education isn’t just about the next exam. <strong>It’s about building the mind for everything that comes after.</strong></p></section>
        <section className="programmes" id="programmes">
          <div className="section-header"><div><span className="section-kicker">WHAT WE TEACH</span><h2>Find your path<br/><span>forward.</span></h2></div><p>Focused academic programmes designed to meet learners where they are — and help them go further.</p></div>
          <div className="programme-grid">{programmes.map(programme => <article className="programme-card" key={programme.number}><div className="card-top"><span>{programme.number} / PROGRAMME</span><span className="card-arrow" aria-hidden="true">↗</span></div><div><span className="programme-detail">{programme.detail}</span><h3>{programme.title}</h3><p>{programme.description}</p></div><div className="card-tags">{programme.tags.map(tag=><span key={tag}>{tag}</span>)}</div></article>)}</div>
        </section>
        <section className="contact-panel" id="contact"><div><span className="section-kicker">BEGIN WITH FUTURE MINDS</span><h2>Every great future<br/>starts somewhere.</h2><p>We’re preparing something special. Admissions and enquiry details will be available soon.</p></div></section>
      </main>

    </div>
  );
}
