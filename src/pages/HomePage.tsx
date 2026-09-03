import CareerTimeline from '../components/CareerTimeLine';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import SkillsSection from '../components/SkillsSection';
import WordCloud from '../components/WordCloud';
import ActivityTimeline from '../components/ActivityTimeLine';
import ProjectsSection from '../components/ProjectsSection';
import BlogSection from '../components/BlogSection';
import ClosingSection from '../components/ClosingSection';
import Footer from '../components/Footer';

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