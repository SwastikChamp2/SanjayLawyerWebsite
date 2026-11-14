import { site } from '../data.jsx';
import { Reveal, RevealText, Rule } from './Motion.jsx';

const Item = ({ icon, label, delay, children }) => (
    <Reveal variant="left" delay={delay} className="group flex gap-[18px] py-5 border-b border-gold/25">
        <div className="flex size-11 flex-none items-center justify-center rounded-full border border-gold text-gold transition duration-500 group-hover:bg-gold group-hover:text-navy-deep group-hover:rotate-[360deg]" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{icon}</svg>
        </div>
        <div>
            <div className="text-xs tracking-[.16em] uppercase text-gold font-semibold">{label}</div>
            {children}
        </div>
    </Reveal>
);

// Used on Home and Practice index
export default function Contact() {
    const link = 'text-white no-underline text-[17px]';
    return (
        <section className="block-section bg-navy text-[#d8e1e4]" id="contact">
            <div className="wrap">
                <Reveal variant="fade" className="eyebrow">Contact</Reveal>
                <RevealText as="h2" className="h2 !text-white" delay={0.1}>Chambers</RevealText>
                <Rule />
                <div className="grid grid-cols-1 gap-[60px] min-[901px]:grid-cols-2">
                    <address>
                        <Item label="Office" delay={0} icon={<><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>}>
                            <div className="text-white text-[17px]">{site.officeAddress}</div>
                        </Item>
                        <Item label="Telephone" delay={0.12} icon={<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />}>
                            <a className={link} href={`tel:${site.phone}`}>{site.phone}</a>
                        </Item>
                        <Item label="Email" delay={0.24} icon={<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>}>
                            <a className={link} href={`mailto:${site.email}`}>{site.email}</a>
                        </Item>
                        <Item label="Office Hours" delay={0.36} icon={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>}>
                            <div className="text-white text-[17px]">Monday – Saturday · by appointment</div>
                        </Item>
                    </address>
                    <Reveal variant="clip" duration={1.5} delay={0.2} className="min-h-[380px] border border-gold [filter:grayscale(.4)_contrast(1.05)]">
                        <iframe title="Office location" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                            className="block size-full min-h-[380px] border-0"
                            src="https://www.google.com/maps?q=Neptune+Flying+Colors,+Mulund+West,+Mumbai&output=embed" />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}