export default function QuizFrame({ title, stepText, timer, children, footer, badge, badgeRight }) {
  return (
    <div className="quiz-card" role="group" aria-label={title}>
      <header className="quiz-head">
      <div className="quiz-head-left">
         <h2 className="quiz-title">{title}</h2>
         {badge}
       </div>
        <div className="quiz-meta">
          {badgeRight}
          <span>{stepText}</span>
          {timer}
        </div>
      </header>
      {children}
      <footer className="quiz-foot">{footer}</footer>
    </div>
  );
}
