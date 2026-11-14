import { Link } from 'react-router-dom';
import { Reveal } from './Motion.jsx';

// Used on Home and Practice detail. `index` staggers the reveal.
export default function PostCard({ post, index = 0 }) {
    const date = new Date(post.date);
    return (
        <Reveal as="article" delay={(index % 3) * 0.12} className="group relative flex flex-col bg-paper border border-line transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-28px_rgba(18,60,79,.5)]">
            <div className="thumb relative aspect-video overflow-hidden bg-navy flex items-center justify-center">
                {post.image
                    ? <img src={post.image} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                    : <span className="relative z-[1] font-serif text-[22px] tracking-[.14em] uppercase text-gold transition-transform duration-700 group-hover:scale-105">{post.tagName}</span>}
            </div>
            <div className="flex flex-col gap-3 flex-1 px-[26px] pt-[26px] pb-[30px]">
                <div className="text-[12.5px] tracking-[.12em] uppercase text-gold font-semibold">
                    {post.tagName} · <time className="whitespace-nowrap" dateTime={post.date}>{date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                </div>
                <h3 className="text-2xl"><Link className="stretched text-inherit no-underline" to={`/article/${post.slug}/`}>{post.title}</Link></h3>
                <p className="text-[15px] text-muted">{post.excerpt}</p>
                <span className="mt-auto text-[13px] tracking-[.1em] uppercase font-semibold text-navy transition-transform duration-500 group-hover:translate-x-1">Read article</span>
            </div>
        </Reveal>
    );
}