import { Link } from 'react-router-dom';

// Used on Home and Practice detail
export default function PostCard({ post }) {
    const date = new Date(post.date);
    return (
        <article className="reveal group relative flex flex-col bg-paper border border-line transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_40px_-28px_rgba(18,60,79,.5)]">
            <div className="thumb relative aspect-video overflow-hidden bg-navy flex items-center justify-center">
                {post.image
                    ? <img src={post.image} alt="" className="absolute inset-0 size-full object-cover" />
                    : <span className="relative z-[1] font-serif text-[22px] tracking-[.14em] uppercase text-gold">{post.tagName}</span>}
            </div>
            <div className="flex flex-col gap-3 flex-1 px-[26px] pt-[26px] pb-[30px]">
                <div className="text-[12.5px] tracking-[.12em] uppercase text-gold font-semibold">
                    {post.tagName} · <time className="whitespace-nowrap" dateTime={post.date}>{date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                </div>
                <h3 className="text-2xl"><Link className="stretched text-inherit no-underline" to={`/insights/${post.slug}/`}>{post.title}</Link></h3>
                <p className="text-[15px] text-muted">{post.excerpt}</p>
                <span className="mt-auto text-[13px] tracking-[.1em] uppercase font-semibold text-navy">Read article</span>
            </div>
        </article>
    );
}