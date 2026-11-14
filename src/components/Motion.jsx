import { Fragment, useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export const ease = [0.22, 1, 0.36, 1]; // slow, soft "expo-out" — the luxury feel

const variants = {
    up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
    fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
    clip: { hidden: { clipPath: 'inset(0 0 100% 0)' }, show: { clipPath: 'inset(0 0 0% 0)' } },
};

// Generic scroll reveal. <Reveal as="li" variant="left" delay={0.1} className="...">
export function Reveal({ as = 'div', variant = 'up', delay = 0, duration = 1.1, className, children, ...rest }) {
    const Comp = motion[as];
    return (
        <Comp
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            variants={variants[variant]}
            transition={{ duration, delay, ease }}
            {...rest}
        >
            {children}
        </Comp>
    );
}

// Headline reveal: each word rises out of a mask. Pass a plain string.
export function RevealText({ as: Tag = 'div', children, className = '', wordClassName = '', delay = 0, stagger = 0.07 }) {
    const text = String(children);
    const words = text.split(' ');
    return (
        <Tag className={className} aria-label={text}>
            <motion.span
                aria-hidden="true"
                className="inline"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
            >
                {words.map((w, i) => (
                    <Fragment key={i}>
                        <span className="inline-block overflow-hidden align-bottom pb-[.15em] -mb-[.15em]">
                            <motion.span
                                className={`inline-block ${wordClassName}`}
                                variants={{ hidden: { y: '115%' }, show: { y: 0, transition: { duration: 1, ease } } }}
                            >
                                {w}
                            </motion.span>
                        </span>
                        {i < words.length - 1 && ' '}
                    </Fragment>
                ))}
            </motion.span>
        </Tag>
    );
}

// Gold rule that draws itself in
export function Rule({ className = '' }) {
    return (
        <motion.hr
            className={`rule origin-left ${className}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease, delay: 0.3 }}
        />
    );
}

// Number that counts up when scrolled into view
export function Counter({ to, duration = 2.2, className }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
    const reduce = useReducedMotion();
    useEffect(() => {
        if (!inView || !ref.current) return;
        if (reduce) { ref.current.textContent = to; return; }
        const c = animate(0, to, { duration, ease, onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v); } });
        return () => c.stop();
    }, [inView, to, duration, reduce]);
    return <span ref={ref} className={className}>0</span>;
}

// Wrapper that gently pulls its child toward the cursor (use on buttons)
export function Magnetic({ children, strength = 0.3, className = 'inline-block' }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 });
    const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 });
    const move = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const reset = () => { x.set(0); y.set(0); };
    return (
        <motion.div style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={reset} className={className}>
            {children}
        </motion.div>
    );
}