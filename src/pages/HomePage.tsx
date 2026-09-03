import NavBar from '../components/navbar';
import Hero from '../components/hero';
import CareerTimeline from '../components/career';
import WordCloud from '../components/wordcloud';
import SkillsSection from '../components/skill';
import ActivityTimeline from '../components/activity';
import ProjectsSection from '../components/project';
import BlogSection from '../components/blog';
import ClosingSection from '../components/closing';
import Footer from '../components/footer';

export default function HomePage() {
  return (
    <>
      <NavBar />
      <section id="home"><Hero /></section>
      <section id="career"><CareerTimeline /></section>
      <section id="wordcloud"><WordCloud /></section>
      <section id="skills"><SkillsSection /></section>
      <section id="activity"><ActivityTimeline /></section>
      <section id="projects"><ProjectsSection /></section>
      <section id="blog"><BlogSection /></section>
      <section id="closing"><ClosingSection /></section>
      <Footer />
    </>
  );
}
