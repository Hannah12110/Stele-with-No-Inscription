
import React, { useState, useEffect } from 'react';
import { Attributes, EndingType, Question, Reaction } from './types';
import { QUESTIONS, INITIAL_ATTRIBUTES } from './constants';
import { generateInscription } from './services/geminiService';
import AttributeBars from './components/AttributeBars';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'calculating' | 'result'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attributes, setAttributes] = useState<Attributes>(INITIAL_ATTRIBUTES);
  const [choices, setChoices] = useState<string[]>([]);
  const [inscription, setInscription] = useState<string>("");
  const [ending, setEnding] = useState<EndingType>(EndingType.DEFAULT);
  
  // 情绪张力：历史人物反应
  const [activeReaction, setActiveReaction] = useState<Reaction | null>(null);
  const [isReactionVisible, setIsReactionVisible] = useState(false);

  // 不可逆节点标记
  const [liXianDead, setLiXianDead] = useState(false);
  const [coolOfficialsActive, setCoolOfficialsActive] = useState(false);

  // 临时存储待处理的属性更新，以便在阅读完史实后应用
  const [pendingState, setPendingState] = useState<{attrs: Attributes, choice: string, choices: string[]}>({
    attrs: INITIAL_ATTRIBUTES,
    choice: '',
    choices: []
  });

  const calculateEnding = (attrs: Attributes, lastChoice: string): EndingType => {
    const { cunning: c, benevolence: b, innovation: i, integrity: s } = attrs;
    if (c >= 80 && s <= 30 && i >= 60) return EndingType.IRON_EMPRESS;
    if (s >= 70 && b >= 60 && c >= 50) return EndingType.SAINT_MONARCH;
    if (b <= 30 && (c <= 40 || s <= 20)) return EndingType.LONELY_DEATH;
    if (i >= 80 && b >= 50 && s <= 50) return EndingType.INNOVATOR;
    if (c >= 40 && c <= 70 && b >= 40 && b <= 70 && i >= 40 && i <= 70 && s >= 40 && s <= 70 && lastChoice === 'C') {
      return EndingType.BLANK_SLATE;
    }
    return EndingType.SAINT_MONARCH;
  };

  const handleAnswer = (optionLabel: string, scores: [number, number, number, number], reaction?: Reaction) => {
    const newAttributes = {
      cunning: attributes.cunning + scores[0],
      benevolence: attributes.benevolence + scores[1],
      innovation: attributes.innovation + scores[2],
      integrity: attributes.integrity + scores[3],
    };
    const newChoices = [...choices, optionLabel];
    
    // 逻辑节点判断
    if (currentQuestionIndex === 4 && optionLabel === 'C') {
      setLiXianDead(true);
    }
    if (currentQuestionIndex === 5 && optionLabel === 'B') {
      setCoolOfficialsActive(true);
    }

    setPendingState({ attrs: newAttributes, choice: optionLabel, choices: newChoices });

    // 展示回响与史实
    if (reaction) {
      setActiveReaction(reaction);
      setIsReactionVisible(true);
    } else {
      // 最后一题可能没 reaction，直接进行下一步
      proceedToNext(newAttributes, optionLabel, newChoices);
    }
  };

  const handleContinue = () => {
    setIsReactionVisible(false);
    proceedToNext(pendingState.attrs, pendingState.choice, pendingState.choices);
  };

  const proceedToNext = (finalAttrs: Attributes, lastChoice: string, finalChoices: string[]) => {
    // 只有在非 reaction 展示状态下才真正更新全局属性，避免数值在弹窗展示时跳变
    setAttributes(finalAttrs);
    setChoices(finalChoices);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameState('calculating');
      const finalEnding = calculateEnding(finalAttrs, lastChoice);
      setEnding(finalEnding);
      generateInscription(finalAttrs, finalEnding, finalChoices).then(res => {
        setInscription(res);
        setGameState('result');
      });
    }
  };

  const resetGame = () => {
    setAttributes(INITIAL_ATTRIBUTES);
    setChoices([]);
    setCurrentQuestionIndex(0);
    setGameState('start');
    setInscription("");
    setLiXianDead(false);
    setCoolOfficialsActive(false);
  };

  const MiniBar = ({ label, value }: { label: string, value: number }) => {
    const percentage = Math.min((value / 150) * 100, 100);
    return (
      <div className="flex flex-col gap-1 w-20 md:w-28">
        <div className="flex justify-between text-[10px] md:text-xs font-bold text-stone-400">
          <span>{label}</span>
          <span className="text-yellow-600">{value}</span>
        </div>
        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-stone-800">
          <div 
            className={`h-full progress-bar-fill`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // 动态题目渲染
  const currentQuestion = QUESTIONS[currentQuestionIndex];
  
  // 处理题干逻辑：酷吏政治下的恐怖
  let displayQuestionText = currentQuestion.text;
  if (currentQuestion.id === 8 && coolOfficialsActive) {
    displayQuestionText = "第八问：酷吏横行已久，因你先前纵容告密，朝堂已成炼狱。百姓入睡不知明日之首，狄仁杰下狱，血溅金銮。你可有悔意？当止否？";
  }

  // 处理选项逻辑
  const renderedOptions = currentQuestion.options.map(opt => {
    // 李显的恐惧
    if (currentQuestion.id === 9 && opt.label === 'B' && liXianDead) {
      return { ...opt, text: "召回李显。李显闻兄死讯，终日惶惧，梦魇缠身，其心已折，恐难当大任。" };
    }
    // 酷吏统治下的狄仁杰
    if (currentQuestion.id === 8 && opt.label === 'A' && coolOfficialsActive) {
        return { ...opt, text: "此时方知悔过？立即罢酷吏，哪怕朝堂已是元气大伤，也要强扶狄公回朝。" };
    }
    return opt;
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* 情绪张力遮罩层（包含史实对照） */}
      {isReactionVisible && activeReaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="text-center max-w-2xl p-8 space-y-10">
            <div className="space-y-4">
                <div className="h-px w-24 bg-[#d4a373] mx-auto opacity-50"></div>
                <p className="text-[#d4a373] text-xl font-bold tracking-[0.8em]">{activeReaction.speaker}</p>
                <div className="h-px w-24 bg-[#d4a373] mx-auto opacity-50"></div>
            </div>
            
            <p className="text-3xl md:text-5xl text-stone-100 font-weibei leading-relaxed animate-fade-in-up drop-shadow-lg">
              {activeReaction.text}
            </p>

            <div className="bg-stone-800/40 p-6 rounded border border-[#d4a373]/20 animate-fade-in delay-500">
               <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">📜</span>
                  <span className="text-[#d4a373] font-bold text-sm tracking-widest">史实对照</span>
               </div>
               <p className="text-stone-400 text-left text-sm md:text-base leading-relaxed font-serif italic">
                 {currentQuestion.historicalFact}
               </p>
            </div>

            <button 
              onClick={handleContinue}
              className="parchment-btn px-12 py-3 text-yellow-500 hover:text-yellow-100 transition-all duration-300 text-lg tracking-[0.3em] font-bold font-weibei"
            >
              执 笔 续 史
            </button>
          </div>
        </div>
      )}

      {gameState === 'start' && (
        <div className="max-w-2xl w-full text-center space-y-12 animate-fade-in bg-stone-900/40 p-12 border border-stone-800/50 rounded-lg shadow-2xl">
          <h1 className="text-6xl md:text-8xl font-weibei text-[#d4a373] gold-glow">无字碑</h1>
          <div className="history-divider"></div>
          <div className="space-y-6">
            <p className="text-2xl italic text-stone-400 font-weibei">“己之功过，留待后人评说”</p>
            <p className="text-lg leading-relaxed text-stone-300 px-6 font-serif">
              大唐史官，请研墨执笔。
              <br />
              历史的巨轮即将转动，十个决定命运的时刻，
              你的每一个选择都将重塑这座石碑下的帝魂。
            </p>
          </div>
          <button 
            onClick={() => setGameState('playing')}
            className="parchment-btn px-16 py-5 text-yellow-500 hover:text-yellow-200 transition-all duration-300 text-2xl tracking-[0.5em] font-bold font-weibei"
          >
            启 阅
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="max-w-4xl w-full space-y-8 animate-fade-in-up bg-[#2d241e]/60 p-6 md:p-10 border border-[#d4a373]/30 rounded-lg shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#d4a373]/20 pb-6 gap-4">
            <span className="text-[#d4a373] font-bold tracking-widest text-lg md:text-xl border-l-4 border-[#d4a373] pl-3">
              📜 史册第 {currentQuestionIndex + 1} 章
            </span>
            <div className="flex flex-wrap gap-3 md:gap-6 w-full md:w-auto">
              <MiniBar label="权谋" value={attributes.cunning} />
              <MiniBar label="仁德" value={attributes.benevolence} />
              <MiniBar label="革新" value={attributes.innovation} />
              <MiniBar label="守正" value={attributes.integrity} />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-4xl leading-snug text-stone-100 font-bold font-serif min-h-[120px]">
            {displayQuestionText}
          </h2>

          <div className="grid grid-cols-1 gap-5 mt-8">
            {renderedOptions.map((opt) => (
              <button
                key={opt.label}
                disabled={isReactionVisible}
                onClick={() => handleAnswer(opt.label, opt.scores, opt.reaction)}
                className={`group relative text-left p-5 md:p-7 bg-black/30 border border-stone-700 hover:border-[#d4a373] hover:bg-stone-800/40 transition-all duration-300 rounded-sm overflow-hidden ${isReactionVisible ? 'opacity-50 blur-sm scale-95' : 'scale-100'}`}
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#d4a373] scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                <div className="flex items-start gap-6">
                  <span className="text-[#d4a373] font-bold text-2xl md:text-3xl group-hover:scale-110 transition-transform font-serif">{opt.label}</span>
                  <p className="text-stone-300 group-hover:text-stone-100 leading-relaxed text-lg md:text-xl font-serif">{opt.text}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {gameState === 'calculating' && (
        <div className="flex flex-col items-center space-y-8">
          <div className="w-20 h-20 border-4 border-[#d4a373] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-3xl font-weibei text-[#d4a373] gold-glow animate-pulse">史官研墨，铭刻碑文...</p>
        </div>
      )}

      {gameState === 'result' && (
        <div className="max-w-5xl w-full space-y-12 animate-fade-in p-4 py-12">
          <div className="text-center space-y-4">
            <p className="text-[#d4a373] tracking-[1em] font-bold uppercase text-sm">天 命 终 结</p>
            <h2 className="text-5xl md:text-7xl font-weibei text-yellow-500 gold-glow">{ending}</h2>
          </div>

          <div className="flex flex-col xl:flex-row gap-12 items-stretch">
            <div className="xl:w-3/5 w-full order-2 xl:order-1">
              <div className="tombstone-texture p-10 md:p-16 border-y-8 border-[#d4a373]/20 min-h-[550px] flex justify-center items-center shadow-inner overflow-hidden">
                <div className="writing-vertical-rl text-[#fefae0] text-2xl md:text-4xl leading-[1.6] font-weibei opacity-90 h-full max-h-[500px]">
                  <p className="whitespace-pre-wrap animate-typing">
                    {inscription}
                  </p>
                </div>
              </div>
              <p className="text-center text-stone-500 mt-8 text-lg font-serif italic tracking-widest">“唯 智 者，可见碑中深意”</p>
            </div>

            <div className="xl:w-2/5 w-full space-y-8 order-1 xl:order-2 flex flex-col justify-between">
              <div className="bg-[#1a140f] p-8 border-2 border-[#d4a373]/30 rounded-lg shadow-xl">
                <h3 className="text-[#d4a373] text-xl font-bold border-b border-[#d4a373]/20 pb-4 mb-6 tracking-widest uppercase">皇 权 衡 柱</h3>
                <AttributeBars attributes={attributes} />
              </div>

              <div className="bg-stone-900/60 p-8 border border-stone-800 rounded-lg text-stone-400 text-lg leading-relaxed font-serif italic">
                <p>
                  “历史从不沉默，只是在等待一位懂它的人。你不仅是一个过客，更是这无字碑的共鸣者。在权力的漩涡与仁慈的微光中，你已写就了属于自己的盛唐。”
                </p>
              </div>

              <button 
                onClick={resetGame}
                className="parchment-btn w-full py-6 text-yellow-500 hover:text-yellow-100 transition-all duration-300 tracking-[0.4em] text-xl font-bold font-weibei"
              >
                再 启 尘 封 之 史
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
