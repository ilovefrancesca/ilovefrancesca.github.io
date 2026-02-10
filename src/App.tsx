import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Grid, ShieldCheck, Save } from 'lucide-react';

// --- YOUR LOVE LETTER CONTENT ---
const LETTER_FRONT = `

My beautiful beautiful girl, i love you, so much. i am so extremely mad at myself for not being here to spend the day with you properly on valentines like i should,
but i wont let that get in the way of my overwhelming feelings of love for you. i have never, ever been this happy in my life. you singlehandedly have made me, depressed emo luca, the happiest he has ever been.
and you know what? i couldnt be more grateful. you deserve the fucking world, more than i could ever give you, really. you are so perfect in my eyes. i have not once found a flaw within you, and i mean that.
the way you giggle is so cute, the way you smile, the way i see you light up when we bully stupid retards in games, man, it makes me the happiest man in the world. youre so precious. youre my precious girl. 
youre MINE, i cant believe youre mine. a girl like you, ever wanting me is, beyond me really, but im greedy, and if i have the best there is, who am i to complain? 

youre one of a kind to me, the rest of the world is an absolute downgrade. anything that isnt you right now, is a downgrade. i need to be the person that stands between my beautiful girl and the world
that doesnt deserve her. you make me feel so territorial, i get SO angry when other people talk to you i should be locked up, being the only man that gets to have you, the real, the actual francesca gives me suuuuucchhhhh
an ego boost and you know my disorders love that lelelelelelelleellele 
i want all of your time, i want all your thoughts, all your attention, 'enough' isnt a thing when it comes to you, i look back to the pictures of my name in you so much because my brain goes,
wow gorgeous thighs and body and btw its all for you MMMM YUMMMMMM, thats so fucking hot, the cutting aspect is like whatever, obviously we wont be doing that anymore and i dont really care, you could write my name on you with sharpie and id cum to it
SO HARD you dont even know mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm yumyumyuyumyuymuyumyum even just the thought of you wearing an 'L' necklace everywhere or something MMMMM YUMMMMYY yumyum
really, i wanna leave such a mark on your life nobody even dares to fit in, you know i dont do things halfway, i love you so much, it consumes me.

youre so special to me, i remember falling for you so hard, thinking wow, this could be so great but i know its gonna go so wrong, and how wrong was i?
i am so, so in love with you, like nothing ive ever felt before, i want to spend the rest of my life with you, i will marry you. 
i will make you my wife, i will start a beautiful family with my beautiful girl.
you make me feel so much better, always, just getting to talk to you, hearing your pretty voice, the little things you do for me. 
even stupid shit like showing me tummy when i feel down, thats so fucking hot, not just because oo tummy yum but just, knowing you know what makes me happy, and trying your best to make me happy, always. it makes me so proud.
it makes me confident i can rely on you, i can rely on you to make me feel better when i feel bad, i know nothing could ever go wrong, because i have you, nothing will ever be bad, because i have you. 
even at the worst point of my life, id still have you, and thatd make it the best point of my life.

i find the little things you do for me so cute. you know me so well, you know how i am, you know what ill say, how ill react. i remember one time you told me something where if i was
mega insecure and retarded i couldve been like 'errrmm why did you do that in the first place' but without me even saying anything you were like, if youre wondering why i did this at all, its because xyz,
you give me no reason to doubt you. im so grateful for you, grateful for my girl. im so proud of you, ive noticed so much positive change in you, and really, i dont say how proud i am enough, im not only proud of you, but i am so fucking proud to call you mine.

youre so adorable, everything you do is so adorable to me, i love when you get all sleepy and all you can say is mhmmmmmmmm and youre just a sleepy little girl goodddddd thats so fucking cute,
its so cute, and so hot that you feel so safe around me, safe to be yourself, to be my little girl, you really make me feel like an accomplished father, and holy, that is the best thing ive ever felt.

i wanted to show you some new album songs but alex is being a CUNT and slowing down the release date but some of the lines are about you so when they release and you can listen to them ill tell you about it :D

you are, the best girl, in the whole fucking world.

i love you babe <3

xoxo kisses - husband luca

`;

const LETTER_BACK = `
    .......
    September 30th, 1998. 
    It's a day I'll never forget. 
    The cop inside me died that day. 
    And that night, Raccoon City was wiped out, 
    thanks to the bioweapons created by Umbrella. 
    
    Somehow, I made it out. 
    But too many others...weren't so lucky. 
    I was "asked" later to join a top-secret government program. 
    Not that I had a choice. 
    
    The training, the punishing missions...nearly killed me, 
    but at least they kept my mind off everything. 
    If I could just forget what happened that night - 
    the pain, even for a second? 
    
    This time, it can be different. 
    It has to.
    
    kay this seemed too funny not to have on the back of this
`;

const ADJECTIVES = [
    "beautiful",
    "gorgeous",
    "pretty",
    "sweet",
    "sexy",
    "amazing",
    "sweet",
    "stunning",
    "cute",
    "adorable",
    "loving",
    "best",
    "perfect"
];
// --- Types ---
type ItemType = 'file' | 'herb' | 'heal' | 'container' | 'key_item';

interface Item {
    id: string;
    name: string;
    icon: React.ReactNode | string;
    type: ItemType;
}

interface EmojiProps {
    emoji: string;
    size?: "sm" | "md" | "lg" | "xl";
}

// --- 1. ASSET LIBRARY ---

const AppleEmoji = ({ emoji, size = "md" }: EmojiProps) => {
    const width = { sm: 20, md: 32, lg: 48, xl: 64 }[size];
    const codePoint = emoji.codePointAt(0)?.toString(16);
    return (
        <img
            src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/${codePoint}.png`}
            alt={emoji}
            width={width}
            height={width}
            className="inline-block select-none pointer-events-none"
        />
    );
};

const TypewriterIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className}>
        <rect x="20" y="40" width="60" height="40" rx="2" fill="#333" />
        <rect x="25" y="20" width="50" height="30" fill="#f0f0f0" stroke="#333" strokeWidth="2" />
        <path d="M30 30 L70 30 M30 38 L60 38" stroke="#000" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="25" cy="60" r="4" fill="#555" />
        <circle cx="35" cy="60" r="4" fill="#555" />
        <circle cx="45" cy="60" r="4" fill="#555" />
        <rect x="75" y="55" width="8" height="20" fill="#1a1a1a" />
    </svg>
);

// --- FIXED UMBRELLA CORP LOGO ---
const BiohazardIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className}>
        {/* White Background Circle (Diagonals) */}
        <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#111" strokeWidth="1" />

        {/* Red Wedges (Cross) */}
        <g fill="#cc0000">
            {/* Top Wedge */}
            <path d="M50 50 L32.8 9.1 A 45 45 0 0 1 67.2 9.1 Z" />
            {/* Right Wedge */}
            <path d="M50 50 L90.9 32.8 A 45 45 0 0 1 90.9 67.2 Z" />
            {/* Bottom Wedge */}
            <path d="M50 50 L67.2 90.9 A 45 45 0 0 1 32.8 90.9 Z" />
            {/* Left Wedge */}
            <path d="M50 50 L9.1 67.2 A 45 45 0 0 1 9.1 32.8 Z" />
        </g>
    </svg>
);

// Animated ECG Monitor
const ECGMonitor = ({ status }: { status: string }) => {
    const color = status === "FINE" ? "#22c55e" : "#f59e0b"; // Green or Orange

    return (
        <div className="fixed top-4 right-4 z-[60] flex items-center gap-3 bg-black/80 p-2 rounded-lg border border-gray-600 shadow-xl backdrop-blur-md">
            <div className="text-right">
                <div className="text-[10px] text-gray-400 font-mono tracking-widest">CONDITION</div>
                <div className={`text-xl font-bold font-mono tracking-widest`} style={{ color }}>
                    {status}
                </div>
            </div>
            <div className="relative w-32 h-12 bg-[#051a05] rounded border border-gray-700 overflow-hidden">
                <svg className="w-full h-full">
                    <motion.path
                        d="M0 25 L10 25 L15 10 L20 40 L25 5 L30 25 L130 25"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ x: -130 }}
                        animate={{ x: 0 }}
                        transition={{
                            repeat: Infinity,
                            duration: status === "FINE" ? 1.5 : 0.8,
                            ease: "linear"
                        }}
                    />
                </svg>
                <div
                    className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] pointer-events-none"
                    style={{ backgroundSize: "100% 2px, 3px 100%" }}
                />
            </div>
        </div>
    );
};
// --- RUNAWAY BUTTON COMPONENT ---
const RunawayButton = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const moveButton = () => {
        // Generate random coordinates
        const randomX = Math.random() * 400 - 200;
        const randomY = Math.random() * 400 - 200;
        setPosition({ x: randomX, y: randomY });
    };

    return (
        <motion.button
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={moveButton}
            onClick={moveButton}
            className="px-6 py-3 bg-red-950/30 border border-red-900 text-red-800 font-bold uppercase tracking-widest text-xs z-50 cursor-not-allowed hover:bg-red-950 hover:text-red-700 transition-colors"
        >
            Decline Gift
        </motion.button>
    );
};
// DOOR LOADER
const DoorLoader = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.5 }}
                transition={{ duration: 4, ease: "easeIn" }}
                className="relative w-64 h-96 border-[8px] border-[#0f0f0f] bg-[#1a1a1a] shadow-[0_0_50px_rgba(0,0,0,0.8)] perspective-1000"
            >
                <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: -100 }}
                    transition={{ delay: 1, duration: 2.5, ease: "easeInOut" }}
                    style={{ transformOrigin: "left", transformStyle: "preserve-3d" }}
                    className="absolute inset-0 bg-[#3a3a3a] border-r-2 border-black flex items-center justify-center shadow-2xl"
                >
                    <div className="w-full h-full border-[10px] border-[#2a2a2a] opacity-50 absolute inset-0" />
                    <div className="w-4 h-4 rounded-full bg-yellow-700 absolute right-4 top-1/2 shadow-inner border border-yellow-900" />
                </motion.div>
            </motion.div>
            <div className="absolute bottom-10 right-10 animate-pulse flex items-center gap-2">
                <span className="text-gray-500 font-typewriter text-xs">LOADING...</span>
                <BiohazardIcon className="w-6 h-6" />
            </div>
        </div>
    );
};

// --- NEW SAFE TERMINAL MODAL ---
// --- MUSICIAN RIDDLE COMPONENT ---
const RiddleModal = ({ isOpen, onClose }: any) => {
    const [input, setInput] = useState("");
    const [phase, setPhase] = useState<'QUESTION' | 'PUNCHLINE' | 'LOVE'>('QUESTION');

    useEffect(() => {
        if (isOpen) {
            setPhase('QUESTION');
            setInput("");
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.toLowerCase().includes("baroque")) {
            setPhase('PUNCHLINE');
            setTimeout(() => {
                setPhase('LOVE');
            }, 2000); // Wait 2 seconds on "Baroque" before showing "I love you"
        } else {
            // Shake effect or error could go here, but for now just clear
            setInput("");
            alert("are you stupid bitch?");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[90] bg-black/95 flex items-center justify-center p-6"
                >
                    <div className="w-full max-w-md bg-[#e8d5a7] p-8 border-4 border-[#4a3b2a] shadow-2xl relative rotate-1">
                        {/* Tape effect */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/30 rotate-2 backdrop-blur-sm border-l border-r border-white/20" />

                        {phase === 'QUESTION' && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="text-center"
                            >
                                <div className="mb-6 text-[#4a3b2a]">
                                    <h3 className="font-typewriter text-xl font-bold mb-4 border-b-2 border-[#4a3b2a] pb-2 inline-block">
                                        TWIN...
                                    </h3>
                                    <p className="font-serif text-2xl italic leading-relaxed">
                                        what do you call a broke musician...?
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-[#4a3b2a] text-center text-xl font-typewriter focus:outline-none placeholder-[#4a3b2a]/30 text-[#2c2c2c] p-2 uppercase"
                                        placeholder="TYPE ANSWER..."
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="flex-1 py-2 font-mono text-xs text-[#4a3b2a] border border-[#4a3b2a] hover:bg-[#4a3b2a] hover:text-[#e8d5a7]"
                                        >
                                            CLOSE
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 py-2 font-bold font-mono text-xs bg-[#4a3b2a] text-[#e8d5a7] border border-[#4a3b2a] hover:bg-[#2c2c2c]"
                                        >
                                            ANSWER
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {phase === 'PUNCHLINE' && (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1.2, opacity: 1 }}
                                className="flex flex-col items-center justify-center py-10"
                            >
                                <h2 className="text-5xl font-black font-typewriter text-[#4a3b2a] uppercase tracking-tighter">
                                    BAROQUE!!!! 😂😂
                                </h2>
                                <p className="text-xs font-mono text-gray-500 mt-2"></p>
                            </motion.div>
                        )}

                        {phase === 'LOVE' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-6"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="text-4xl mb-4"
                                >
                                    ❤️
                                </motion.div>
                                <h2 className="text-3xl font-serif font-bold text-[#8b0000] mb-2 leading-none">
                                    <br/>
                                    im in love with you
                                </h2>
                                <p className="font-typewriter text-xs text-[#4a3b2a] mb-6">
                                </p>
                                <button
                                    onClick={onClose}
                                    className="w-full py-3 bg-[#8b0000] text-[#e8d5a7] font-bold font-mono uppercase tracking-widest hover:bg-[#660000]"
                                >
                                    i love my daddy
                                </button>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


const SafeTerminal = ({ isOpen, onClose, onUnlock }: any) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [attempts, setAttempts] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanInput = input.trim().toLowerCase();

        if (cleanInput === "papa") {
            onUnlock();
        } else {
            const currentAttempts = attempts + 1;
            setAttempts(currentAttempts);

            if (currentAttempts === 1) setError("ACCESS DENIED BABY");
            else if (currentAttempts === 2) setError("HINT: P _ _ _");
            else if (currentAttempts === 3) setError("HINT: P A _ _");
            else if (currentAttempts >= 4) setError("HINT: P A P _");

            setInput("");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4 font-mono"
                >
                    <div className="w-full max-w-md border-4 border-gray-600 bg-black p-6 shadow-[0_0_30px_rgba(0,255,0,0.1)] relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-900/50" />

                        <h2 className="text-green-500 text-xl mb-6 tracking-widest border-b border-green-900/50 pb-2">
                            SECURITY TERMINAL
                        </h2>

                        <div className="mb-8 space-y-4">
                            <p className="text-gray-400 text-sm">USER AUTHENTICATION REQUIRED</p>
                            <p className="text-white text-lg animate-pulse">
                                "I am your ____?"
                            </p>
                            <p className="text-xs text-gray-600"></p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                autoFocus
                                type="text"
                                maxLength={4}
                                value={input}
                                onChange={(e) => setInput(e.target.value.toUpperCase())}
                                className="w-full bg-[#0a0a0a] border-2 border-green-800 text-green-400 p-4 text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-green-500 placeholder-green-900/30"
                                placeholder="_ _ _ _"
                            />

                            {error && (
                                <motion.div
                                    initial={{ x: -10 }} animate={{ x: 0 }}
                                    className="text-red-500 text-center font-bold tracking-widest"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-3 border border-gray-700 text-gray-500 hover:bg-gray-900"
                                >
                                    ABORT
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-green-900/30 border border-green-600 text-green-400 hover:bg-green-900/50"
                                >
                                    ENTER
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

interface InventorySlotProps {
    item: Item | null;
    onClick: (item: Item) => void;
    isSelected: boolean;
}

const InventorySlot = ({ item, onClick, isSelected }: InventorySlotProps) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => item && onClick(item)}
        className={`aspect-square relative border-2 cursor-pointer transition-colors overflow-hidden
      ${isSelected
            ? 'border-green-400 bg-green-900/30 shadow-[0_0_15px_rgba(74,222,128,0.3)]'
            : 'border-gray-600 bg-gray-800/50 hover:border-gray-400'
        }
    `}
    >
        {item ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-2">
                <span className="text-4xl filter drop-shadow-lg">{item.icon}</span>
                <span className="absolute bottom-1 right-1 text-[9px] font-mono text-gray-300 uppercase tracking-tighter opacity-80">
          {item.name}
        </span>
            </div>
        ) : (
            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        )}
    </motion.div>
);

interface FileViewerProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
    backText: string;
}

const FileViewer = ({ isOpen, onClose, content, backText }: FileViewerProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
                >
                    <div className="relative w-full max-w-2xl h-[70vh] perspective-1000">
                        <motion.div
                            initial={false}
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.8, type: "spring", stiffness: 40 }}
                            className="w-full h-full relative preserve-3d"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* FRONT */}
                            <div
                                className="absolute inset-0 backface-hidden bg-[#f4e4bc] text-[#2c2c2c] rounded-lg shadow-2xl p-8 md:p-12 flex flex-col border-l-4 border-[#2c2c2c] overflow-hidden"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <div className="flex justify-between items-end border-b-2 border-[#2c2c2c] pb-4 mb-6 shrink-0">
                                    <h2 className="font-typewriter text-2xl font-bold uppercase tracking-widest">
                                        Confidential Letter
                                    </h2>
                                    <div className="border-2 border-red-800 px-2 py-1 -rotate-6 opacity-80">
                                        <span className="font-mono text-xs text-red-800 font-bold uppercase">Top Secret</span>
                                    </div>
                                </div>
                                <div className="font-typewriter text-base md:text-lg leading-relaxed whitespace-pre-wrap grow overflow-y-auto pr-4 scrollbar-thin">
                                    {content}
                                </div>
                                <div className="mt-4 pt-2 border-t border-gray-400/30 text-center text-xs text-gray-500 font-mono shrink-0">
                                    press 'flip to back' to flip it stupid girl
                                </div>
                            </div>

                            {/* BACK */}
                            <div
                                className="absolute inset-0 backface-hidden bg-[#e8d5a7] text-[#2c2c2c] rounded-lg shadow-2xl p-8 md:p-12 flex flex-col border-r-4 border-[#2c2c2c] overflow-hidden"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            >
                                <div className="font-typewriter text-base leading-relaxed whitespace-pre-wrap text-[#4a3b2a] grow overflow-y-auto pr-4 italic">
                                    {backText}
                                </div>

                                <p className="mt-auto font-typewriter text-xs text-center opacity-50">
                                    DO NOT DISCARD • RACCOON CITY PD
                                </p>
                            </div>
                        </motion.div>
                    </div>
                    <div className="absolute bottom-8 flex justify-center gap-6 w-full z-50">
                        <button
                            onClick={() => setIsFlipped(!isFlipped)}
                            className="px-8 py-3 bg-blue-900 text-white font-mono uppercase tracking-widest border border-blue-400 hover:bg-blue-800 shadow-lg active:scale-95 transition-transform rounded-sm"
                        >
                            {isFlipped ? "Flip to Front" : "Flip to Back"}
                        </button>
                        <button
                            onClick={() => { setIsFlipped(false); onClose(); }}
                            className="px-8 py-3 bg-gray-800 text-white font-mono uppercase tracking-widest border border-gray-600 hover:bg-gray-700 shadow-lg active:scale-95 transition-transform rounded-sm"
                        >
                            Close File
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- 3. MAIN APP LOGIC ---

export default function ValentineVaultRE() {
    const [gameState, setGameState] = useState<'START' | 'SAVING' | 'PLAYING' | 'VICTORY'>('START');
    const [health, setHealth] = useState("CAUTION");
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [showFile, setShowFile] = useState(false);
    const [showSafe, setShowSafe] = useState(false);
    // ... other states ...
    const [showRiddle, setShowRiddle] = useState(false); // <--- ADD THIS

    // ADD THIS NEW LINE:
    const [giftAccepted, setGiftAccepted] = useState(false);

    // --- WORD ROTATION STATE ---
    const [adjIndex, setAdjIndex] = useState(0);

    // ADJECTIVE ROTATION EFFECT
    useEffect(() => {
        const interval = setInterval(() => {
            setAdjIndex((prev) => (prev + 1) % ADJECTIVES.length);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const galleryRef = useRef<HTMLDivElement>(null);

    // Dynamic Title Effect
    useEffect(() => {
        const handleVisibilityChange = () => {
            document.title = document.hidden ? "⚠️ YOU DIED" : "Resident Valentine";
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    const [inventory, setInventory] = useState<(Item | null)[]>([
        { id: 'letter', name: 'Love Letter', icon: '📩', type: 'file' },
        { id: 'g_herb', name: 'Green Herb', icon: '🌿', type: 'herb' },
        { id: 'r_herb', name: 'Red Herb', icon: '🔴', type: 'herb' },
        { id: 'lock', name: 'Locked Safe', icon: '🔒', type: 'container' },
        { id: 'joke', name: 'Sheet Music', icon: '🎼', type: 'key_item' }, null // Empty slots
    ]);

    const [galleryRevealed, setGalleryRevealed] = useState([false, false, false, false]);

    // --- ACTIONS ---

    const handleStartGame = () => {
        setGameState('SAVING');
        setTimeout(() => {
            setGameState('PLAYING');
        }, 4000); // 4 seconds for door animation
    };

    const mixHerbs = () => {
        const newInv = [...inventory];
        const gIndex = newInv.findIndex(i => i && i.id === 'g_herb');
        const rIndex = newInv.findIndex(i => i && i.id === 'r_herb');

        if (gIndex !== -1 && rIndex !== -1) {
            newInv[gIndex] = { id: 'm_herb', name: 'Mixed Herb', icon: '🪴', type: 'heal' };
            newInv[rIndex] = null;
            setInventory(newInv);
            setSelectedItem(null);
        }
    };

    const handleInventoryClick = (item: Item) => {
        if (!item) return;
        if (selectedItem && selectedItem.id !== item.id) {
            if ((selectedItem.id === 'g_herb' && item.id === 'r_herb') ||
                (selectedItem.id === 'r_herb' && item.id === 'g_herb')) {
                mixHerbs();
                return;
            }
        }
        setSelectedItem(item);
    };

    const handleUnlockSafe = () => {
        setShowSafe(false);
        setGameState('VICTORY');
    };

    const handleExamine = () => {
        if (!selectedItem) return;
        if (selectedItem.type === 'file') {
            setShowFile(true);
        } else if (selectedItem.id === 'm_herb') {
            alert("A mixture of herbs that fully restores health... You should use this now.");
        } else if (selectedItem.type === 'herb') {
            alert("A native herb. Looks like it can be combined.");
        } else if (selectedItem.id === 'lock') {
            setShowSafe(true);
        } else if (selectedItem.id === 'joke') {  // <--- ADD THIS BLOCK
            setShowRiddle(true);
        }
    };

    const handleUse = () => {
        if (!selectedItem) return;
        if (selectedItem.id === 'm_herb') {
            setHealth("FINE");
            setInventory(prev => prev.map(slot => slot && slot.id === 'm_herb' ? null : slot));
            setSelectedItem(null);
            setTimeout(() => {
                galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 800);
        } else if (selectedItem.id === 'lock') {
            setShowSafe(true);
        } else {
            alert("Can't use this right now.");
        }
    };

    // DIRECT IMAGE LINKS with positioning correction
    const bicepImages = [
        { src: "https://i.ibb.co/qM8YH6PZ/IMG-0291.jpg", caption: "hi", pos: "50% 25%" }, // MOVED DOWN (TOP 25%)
        { src: "https://i.ibb.co/7Jjkc6hS/IMG-0292.jpg", caption: "i", pos: "center" },
        { src: "https://i.ibb.co/9HCGgJNJ/IMG-0294.jpg", caption: "love", pos: "center" },
        { src: "https://i.ibb.co/Y789vdPN/IMG-0295.jpg", caption: "you", pos: "center" }
    ];

    // --- RENDERS ---

    if (gameState === 'START') {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl md:text-6xl font-serif text-red-600 mb-8 tracking-widest animate-pulse text-center">RESIDENT... VALENTINE...</h1>
                {/* --- ANIMATED SUBTEXT --- */}
                <div className="flex items-center gap-2 font-typewriter text-red-400/80 text-sm md:text-lg mb-10 h-8 justify-center">
                    <span>HAPPY VALENTINES DAY MY</span>
                    <div className="relative w-24 md:w-32 h-full text-center">
                        <AnimatePresence mode="popLayout">
                            <motion.span
                                key={ADJECTIVES[adjIndex]}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="absolute inset-0 font-bold text-red-600 uppercase"
                            >
                                {ADJECTIVES[adjIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    <span>GIRL!! I LOVE YOU SO MUCH</span>
                </div>
                <button
                    onClick={handleStartGame}
                    className="group relative px-8 py-4 bg-gray-900 border border-gray-600 hover:border-green-500 transition-all"
                >
                    <div className="flex flex-col items-center gap-2">
                        <TypewriterIcon className="w-16 h-16 fill-gray-400 group-hover:fill-green-400" />
                        <span className="font-typewriter text-xl tracking-widest group-hover:text-green-400">USE INK RIBBON</span>
                    </div>
                </button>
                <p className="mt-4 text-gray-500 font-mono text-xs">Twin.. you need to save to continue</p>
            </div>
        );
    }

    if (gameState === 'SAVING') {
        return <DoorLoader />;
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-gray-200 overflow-x-hidden font-sans selection:bg-red-900 selection:text-white pb-20">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        .font-typewriter { font-family: 'Special Elite', monospace; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background-color: #888; border-radius: 3px; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>

            <ECGMonitor status={health} />

            <header className="pt-20 pb-10 text-center px-4">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-6xl font-serif text-gray-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                >
                    I LOVE MY FUCKING WIFE
                </motion.h1>
                <p className="text-red-500 font-typewriter mt-2 tracking-widest text-sm">FEB. 14. 2026 - RACCOON CITY</p>
            </header>

            <main className="max-w-4xl mx-auto px-4 space-y-24">

                {/* --- INVENTORY --- */}
                <section className="relative">
                    <div className="flex items-center gap-2 mb-2 text-gray-400">
                        <Grid size={18} />
                        <h2 className="font-typewriter text-lg uppercase">Inventory</h2>
                    </div>

                    <div className="bg-[#2d2d2d] p-1 border-2 border-gray-500 shadow-2xl rounded-sm">
                        <div className="grid grid-cols-3 gap-1 bg-[#1a1a1a] p-1">
                            {inventory.map((item, idx) => (
                                <InventorySlot
                                    key={idx}
                                    item={item}
                                    isSelected={selectedItem?.id === item?.id}
                                    onClick={handleInventoryClick}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 flex gap-4 justify-center">
                        <button
                            onClick={handleUse}
                            disabled={!selectedItem}
                            className="px-6 py-2 bg-gray-800 border border-gray-600 font-mono text-sm uppercase tracking-widest hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Use / Mix
                        </button>
                        <button
                            onClick={handleExamine}
                            disabled={!selectedItem}
                            className="px-6 py-2 bg-gray-800 border border-gray-600 font-mono text-sm uppercase tracking-widest hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Examine
                        </button>
                    </div>

                    <div className="mt-4 text-center text-xs text-gray-500 font-typewriter">
                        {selectedItem
                            ? `SELECTED: ${selectedItem.name}`
                            : "SELECT AN ITEM TO PERFORM ACTIONS"}
                    </div>
                </section>

                {/* --- GALLERY --- */}
                <section ref={galleryRef} className="relative min-h-[50vh] scroll-mt-20">
                    <div className="flex items-center gap-2 mb-4 text-gray-400 justify-center">
                        <ShieldCheck size={18} />
                        <h2 className="font-typewriter text-lg uppercase">Gallery Data</h2>
                    </div>

                    {health !== "FINE" && (
                        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center border-t-4 border-red-900 transition-all">
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="flex flex-col items-center"
                            >
                                <BiohazardIcon className="w-24 h-24 mb-4" />
                                <h3 className="text-red-600 font-serif text-3xl tracking-widest font-bold">twin.. you are too low hp to access this area...</h3>
                                <p className="text-red-400/80 font-typewriter mt-4 text-lg border-2 border-red-900 px-4 py-1 bg-black">
                                    CONDITION CRITICAL
                                </p>
                                <p className="text-gray-500 font-mono text-xs mt-4 uppercase tracking-wider">
                                    Restore health to proceed
                                </p>
                            </motion.div>
                        </div>
                    )}

                    <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 ${health !== "FINE" ? "opacity-20 blur-sm pointer-events-none" : "opacity-100"}`}>
                        {bicepImages.map((img, idx) => (
                            <div key={idx} className="relative aspect-square bg-black rounded border border-gray-700 overflow-hidden group">
                                <img
                                    src={img.src}
                                    className="w-full h-full object-cover opacity-80"
                                    style={{ objectPosition: img.pos }}
                                    alt="Bicep"
                                />

                                {/* LOCKED STATE */}
                                {!galleryRevealed[idx] && (
                                    <div
                                        onClick={() => {
                                            const newRev = [...galleryRevealed];
                                            newRev[idx] = true;
                                            setGalleryRevealed(newRev);
                                        }}
                                        className="absolute inset-0 bg-gray-900/80 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800/80 transition-colors border border-gray-600"
                                    >
                                        <Lock className="text-gray-500 mb-2" />
                                        <span className="text-[10px] font-mono text-gray-400 border border-gray-600 px-2 py-1">LOCKED</span>
                                    </div>
                                )}

                                {/* REVEALED STATE + SAVE BUTTON */}
                                {galleryRevealed[idx] && (
                                    <>
                                        <div className="absolute top-2 right-2 z-20">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(img.src, '_blank');
                                                }}
                                                className="bg-black/80 hover:bg-green-900 text-white p-2 border border-gray-500 rounded-sm transition-colors group/btn"
                                                title="Save Data"
                                            >
                                                <Save size={16} className="text-gray-300 group-hover/btn:text-white" />
                                            </button>
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1 text-center">
                                            <span className="text-green-500 font-typewriter text-xs tracking-widest">{img.caption}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            <div className="mt-20 text-center opacity-10 text-[10px] hover:opacity-100 hover:text-red-600 transition-colors cursor-help pb-10">
                i wanna drug you
            </div>

            {/* --- MODALS --- */}

            <FileViewer
                isOpen={showFile}
                onClose={() => setShowFile(false)}
                content={LETTER_FRONT}
                backText={LETTER_BACK}
            />

            <SafeTerminal
                isOpen={showSafe}
                onClose={() => setShowSafe(false)}
                onUnlock={handleUnlockSafe}
            />

            <RiddleModal
                isOpen={showRiddle}
                onClose={() => setShowRiddle(false)}
            />

            <AnimatePresence>
                {gameState === 'VICTORY' && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
                    >
                        <div className="text-center max-w-lg w-full border-4 border-yellow-600 p-8 rounded-lg bg-gray-900 relative">

                            {!giftAccepted ? (
                                /* --- PHASE 1: OFFERING THE GIFT --- */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                >
                                    <motion.div
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        transition={{ type: "spring", bounce: 0.5 }}
                                        className="mb-6"
                                    >
                                        <AppleEmoji emoji="🎁" size="xl" />
                                    </motion.div>

                                    <h2 className="text-4xl font-serif text-yellow-500 mb-2">yeahhhhh thats right good girl</h2>

                                    {/* ITEM CARD */}
                                    <div className="bg-black border-2 border-gray-700 p-6 my-6 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 bg-green-700 text-white text-[10px] px-2 py-1 uppercase font-bold">Key Item</div>
                                        <div className="flex flex-col items-center gap-4">
                                            <BiohazardIcon className="w-16 h-16" />
                                            <div className="text-center">
                                                <h3 className="text-green-500 font-typewriter text-xl font-bold uppercase tracking-wider">Resident Evil 9 (REPRESENT)</h3>
                                                <p className="text-gray-400 font-serif text-lg italic">"Requiem... (wat does that even mean)"</p>
                                                <p className="text-gray-600 text-xs mt-2 uppercase border-t border-gray-800 pt-2">i pre ordered it for u xoxo</p>
                                                <p className="text-gray-600 text-[10px] uppercase">Est. Arrival: Feb 27</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-gray-400 font-typewriter text-sm mb-6">
                                        i couldnt gift it for whatever reason so u get a deluxe key on release day :D
                                    </div>

                                    {/* BUTTONS */}
                                    <div className="flex gap-4 items-center justify-center mt-8 w-full">
                                        {/* Accept Button - Takes 50% width */}
                                        <button
                                            onClick={() => setGiftAccepted(true)}
                                            className="flex-1 py-4 bg-yellow-700 text-white font-bold hover:bg-yellow-600 border border-yellow-500 uppercase tracking-widest shadow-[0_0_15px_rgba(234,179,8,0.5)] z-10"
                                        >
                                            Accept Gift
                                        </button>

                                        {/* Decline Button Wrapper - Takes 50% width */}
                                        <div className="flex-1 flex justify-center relative h-14 items-center">
                                            {/* Z-index 50 ensures it sits ON TOP if they overlap */}
                                            <div className="z-50">
                                                <RunawayButton />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                /* --- PHASE 2: AFTER ACCEPTING ("YEAH GOOD BITCH") --- */
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-12 flex flex-col items-center justify-center"
                                >
                                    <motion.div
                                        initial={{ scale: 2, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                        className="text-green-500 text-6xl mb-6"
                                    >
                                        <ShieldCheck size={80} />
                                    </motion.div>

                                    <h2 className="text-4xl md:text-5xl font-serif text-gray-100 mb-6 tracking-widest leading-tight">
                                        <span className="text-green-500 font-bold">good bitch.</span>
                                    </h2>

                                    <p className="text-gray-500 font-typewriter text-sm mb-10">
                                        ITEM ADDED TO INVENTORY
                                    </p>

                                    <button
                                        onClick={() => {
                                            setGiftAccepted(false); // Reset for next time
                                            setGameState('PLAYING'); // Close modal
                                        }}
                                        className="px-8 py-3 bg-gray-800 border border-gray-600 hover:bg-green-900 hover:text-white hover:border-green-500 text-gray-400 uppercase tracking-widest transition-all"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            )}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}