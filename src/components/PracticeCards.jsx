import { Link } from 'react-router-dom';
import { practiceAreas } from '../data.jsx';
import { Reveal } from './Motion.jsx';

// Used on Home and Practice index
export default function PracticeCards() {
    return (
        <div className="grid grid-cols-1 min-[561px]:grid-cols-2 min-[1001px]:grid-cols-4 border-t border-l border-line">
            {practiceAreas.map((a, i) => (
                <Reveal as="article" key={a.slug} delay={(i % 4) * 0.1} className="group relative px-7 pt-[34px] pb-[38px] bg-paper border-r border-b border-line transition-colors duration-500 hover:bg-navy after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gold after:transition-all after:duration-[600ms] hover:after:w-full">
                    {a.icon}
                    <span className="absolute right-6 top-[30px] font-serif text-lg text-gold opacity-70 pointer-events-none" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-2xl mb-3 transition-colors duration-500 group-hover:text-gold">
                        <Link className="stretched text-inherit no-underline" to={`/practice/${a.slug}/`}>{a.title}</Link>
                    </h3>
                    <p className="text-[15px] text-muted transition-colors duration-500 group-hover:text-[#c8d5da]">{a.excerpt}</p>
                    <span className="block mt-4 text-[12.5px] tracking-[.12em] uppercase font-semibold text-gold transition-all duration-500 opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true">Read more →</span>
                </Reveal>
            ))}
        </div>
    );
}