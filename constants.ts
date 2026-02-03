import { Question, Attributes, EndingType } from './types';

export const INITIAL_ATTRIBUTES: Attributes = {
  cunning: 20,
  benevolence: 20,
  innovation: 20,
  integrity: 20,
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "第一问：入宫十二年，你仍只是个小才人。唐太宗病重，你与太子李治在御榻前暗生情愫。此时太宗想测试你的胆识，问你如何驯服烈马“狮子骢”，你当如何？",
    background: "/assets/bgs/bg_q1.jpg",
    historicalFact: "武则天曾言：“臣妾能制之，然需三物，一铁鞭，二铁锤，三匕首。”展现了其非凡的铁腕潜质。",
    newCharacters: [
      {
        name: "唐太宗",
        title: "大唐第二位皇帝",
        bio: "贞观之治的开创者。他既是你政治生涯的导师，也是你最初需要翻越的大山。",
        wikiUrl: "https://baike.baidu.com/item/%E6%9D%8E%E4%B8%96%E6%B0%91/44058"
      },
      {
        name: "唐高宗 (李治)",
        title: "晋王 / 太子",
        bio: "性格温润，深爱武氏。此时的他还是那个在病榻前为你心动的少年。",
        wikiUrl: "https://baike.baidu.com/item/%E6%9D%8E%E6%B2%BB/5399?fromtitle=%E5%94%90%E9%AB%98%E5%AE%97&fromid=617075"
      }
    ],
    options: [
      { label: "A", text: "铁鞭、铁锤、匕首，不服则杀之。", scores: [15, -5, 10, 0], reaction: { speaker: "唐太宗", text: "尔后宫女子，竟有如此烈性？有趣。" } },
      { label: "B", text: "以柔克刚，辅以草料与耐心。", scores: [0, 10, -5, 15], reaction: { speaker: "唐太宗", text: "中规中矩，倒是像个寻常才人。" } },
      { label: "C", text: "低头不语，观察太子的神情。", scores: [10, 0, 0, 5], reaction: { speaker: "李治", text: "（悄悄耳语）媚娘，莫要惊扰父皇。" } }
    ]
  },
  {
    id: 2,
    text: "第二问：太宗驾崩，你被发配感业寺为尼。青灯古佛，容颜渐老。李治回京祭奠时，你该如何抓住这最后的机会？",
    background: "/assets/bgs/bg_q2.jpg",
    historicalFact: "武则天在感业寺与高宗重逢，泣不成声，高宗亦为之动容，遂有复召入宫之意。",
    // 修改：删除新人物登场
    newCharacters: [],
    options: [
      { label: "A", text: "写下《如意娘》，以诗传情，诉说相思。", scores: [10, 5, 15, 0], reaction: { speaker: "李治", text: "媚娘，朕终究还是舍不得你." } },
      { label: "B", text: "默默流泪，展现受苦之态引起怜悯。", scores: [15, 0, 0, 5], reaction: { speaker: "感业寺老尼", text: "苦海无边，施主又是何苦？" } },
      { label: "C", text: "直接请求陛下带你回宫。", scores: [5, -5, 5, 10], reaction: { speaker: "李治", text: "此举不妥，朕需从长计议。" } }
    ]
  },
  {
    id: 3,
    text: "第三问：重回后宫，王皇后与萧淑妃斗得不可开交。为了彻底铲除对手，你甚至不惜利用自己刚出生的女儿，你会？",
    background: "/assets/bgs/bg_q3.jpg",
    historicalFact: "“小公主暴卒”是武则天夺后之路上的罗生门，王皇后因此被废，武氏由此上位。",
    // 修改：保持不变
    newCharacters: [
      {
        name: "王皇后",
        title: "大唐原配皇后",
        bio: "出身名门太原王氏，虽有家世支撑，却在政治斗争中节节败退。",
        wikiUrl: "https://baike.baidu.com/item/%E7%8E%8B%E7%9A%87%E5%90%8E/9333918"
      },
      {
        name: "萧淑妃",
        title: "高宗宠妃",
        bio: "才貌双全，曾与武则天争宠，最终落得悲惨结局。",
        wikiUrl: "https://baike.baidu.com/item/%E8%90%A7%E6%B7%91%E5%A6%83/7590873"
      }
    ],
    options: [
      { label: "A", text: "嫁祸王皇后，哪怕代价是失去血肉。", scores: [20, -15, 5, -10], reaction: { speaker: "王皇后", text: "武氏，你竟如此狠毒，连亲生骨肉都..." } },
      { label: "B", text: "联手萧淑妃先废掉皇后，再图后效。", scores: [10, 5, 0, 5], reaction: { speaker: "萧淑妃", text: "姐姐所言极是，愿与姐姐共谋。" } },
      { label: "C", text: "在皇帝面前隐忍，以德服人。", scores: [5, 15, -5, 15], reaction: { speaker: "李治", text: "后宫之中，唯有媚娘最懂朕的心。" } }
    ]
  },
  {
    id: 4,
    text: "第四问：“废王立武”遭到长孙无忌等老臣强烈反对。李治犹豫不决，你建议他去询问老将李勣，得到的回复是：“此陛下家事，无须问外人。”你的反应是？",
    background: "/assets/bgs/bg_q4.jpg",
    historicalFact: "李勣的中立态度打破了平衡，武则天随后对反对派老臣展开了残酷清算。",
    newCharacters: [
      {
        name: "李勣",
        title: "隋末至唐朝初年重要的军事将领佬",
        bio: "三朝元元老。他在关键时刻的“家事”论，为你扫清了登后的最后障碍。",
        wikiUrl: "https://baike.baidu.com/item/%E6%9D%8E%E5%8B%A3/919950"
      },
      {
        name: "长孙无忌",
        title: "唐朝宰相",
        bio: "凌烟阁二十四功臣之首，坚决反对立武则天为后，是守旧势力的旗帜。",
        wikiUrl: "https://baike.baidu.com/item/%E9%95%BF%E5%AD%99%E6%97%A0%E5%BF%8C/461177?fromModule=disambiguation"
      }
    ],
    options: [
      { label: "A", text: "趁机彻底铲除关陇集团等老臣。", scores: [15, -10, 10, -5], reaction: { speaker: "长孙无忌", text: "大唐社稷，竟要毁于妇人之手！" } },
      { label: "B", text: "拉拢李勣，许以重位巩固军方支持。", scores: [10, 5, 5, 10], reaction: { speaker: "李勣", text: "臣老矣，唯愿国家安宁。" } },
      { label: "C", text: "劝说高宗适可而止，不要动摇国本。", scores: [0, 15, -5, 20], reaction: { speaker: "李治", text: "媚娘大度，是朕心急了。" } }
    ]
  },
  {
    id: 5,
    text: "第五问：太子李贤英敏过人，朝臣多有依附，甚至传言他非你亲生。面对日益强大的子权与流言，你当如何自处？",
    background: "/assets/bgs/bg_q5.jpg",
    historicalFact: "李贤监国深得人心，却因与武后产生猜忌被废，最终被迫自尽。",
    newCharacters: [
      {
        name: "李贤",
        title: "章怀太子",
        bio: "武后次子，才华横溢却与母后在权力分配上存在深刻矛盾。",
        wikiUrl: "https://baike.baidu.com/item/%E6%9D%8E%E8%B4%A4/21611"
      },
      {
        name: "狄仁杰",
        title: "唐朝时期政治家",
        bio: "一代名臣，此时崭露头角。他曾数次在执法中展现其公正与原则。",
        wikiUrl: "https://baike.baidu.com/item/%E7%8B%84%E4%BB%81%E6%9D%B0/34"
      }
    ],
    options: [
      { label: "A", text: "严厉打击其羽翼，流放李贤，权力不可分享。", scores: [15, -10, 10, -5], reaction: { speaker: "李贤", text: "儿臣不知何罪，竟遭阿娘如此猜忌！" } },
      { label: "B", text: "尝试通过和亲或恩赐缓和母子关系。", scores: [5, 15, -5, 10], reaction: { speaker: "李贤", text: "阿娘若真爱儿臣，便请放权归朝。" } },
      { label: "C", text: "默许大臣上奏其罪名，借刀杀人。", scores: [20, -5, 5, -10], reaction: { speaker: "狄仁杰", text: "陛下，法者天下之公器，不可因私情而易。" } }
    ]
  },
  {
    id: 6,
    text: "第六问：徐敬业在扬州起兵，骆宾王草拟《讨武曌檄》，骂你“入门见嫉，蛾眉不肯让人”。你读罢却大笑，你会如何处理？",
    background: "/assets/bgs/bg_q6.jpg",
    historicalFact: "武则天读檄文至“一抔之土未干，六尺之孤何托”时，叹曰：“宰相安得失此人？”",
    newCharacters: [
      {
        name: "骆宾王",
        title: "初唐四杰之一",
        bio: "檄文名篇的作者。代表了当时反对武后的文人阶层。",
        wikiUrl: "https://baike.baidu.com/item/%E9%AA%86%E5%AE%BE%E7%8E%8B?fromModule=lemma_search-box"
      },
      {
        name: "徐敬业",
        title: "英国公之孙",
        bio: "李勣之孙，李唐皇室的坚决拥护者，扬州起兵的组织者。",
        wikiUrl: "https://baike.baidu.com/item/%E6%9D%8E%E6%95%AC%E4%B8%9A/5958822?fromtitle=%E5%BE%90%E6%95%AC%E4%B8%9A&fromid=6808670"
      }
    ],
    options: [
      { label: "A", text: "此人才华横溢，若能归降必重用之。", scores: [5, 10, 15, 5], reaction: { speaker: "武则天", text: "宰相之过也，竟使此类人才流落敌营。" } },
      { label: "B", text: "雷霆手段镇压，诛其三族以儆效尤。", scores: [15, -15, 0, -5], reaction: { speaker: "徐敬业", text: "妖后误国，我辈当誓死清君侧！" } },
      { label: "C", text: "不予理会，全力支持前线将领。", scores: [10, 5, 0, 15], reaction: { speaker: "将领", text: "得天后信任，微臣定不辱命。" } }
    ]
  },
  {
    id: 7,
    text: "第七问：白马寺薛怀义献上《大云经》，宣称你是弥勒下生。万民请愿改唐为周，这一刻，你是否要迈出那最后一步？",
    background: "/assets/bgs/bg_q7.jpg",
    historicalFact: "武则天利用宗教为女性统治寻找合法性，最终正式登基，国号为大周。",
    newCharacters: [
      {
        name: "薛怀义",
        title: "武则天男宠",
        bio: "原名冯小宝。为你重塑神权合法性的关键人物。",
        wikiUrl: "https://baike.baidu.com/item/%E8%96%9B%E6%80%80%E4%B9%89/1586929"
      },
      {
        name: "武承嗣",
        title: "周国公 / 武家子侄",
        bio: "武则天的侄子，极力主张立武氏子弟为皇嗣，是大周正统论的吹鼓手。",
        wikiUrl: "https://baike.baidu.com/item/%E6%AD%A6%E6%89%BF%E5%97%A3/6184032"
      }
    ],
    options: [
      { label: "A", text: "受命于天，正式登基称帝，改元大周。", scores: [15, -5, 20, 0], reaction: { speaker: "薛怀义", text: "万岁，万岁，万万岁！" } },
      { label: "B", text: "继续以皇太后身份垂帘听政，维持现状。", scores: [5, 10, -10, 15], reaction: { speaker: "武承嗣", text: "姑母何必顾虑？李家江山早已不复存在。" } },
      { label: "C", text: "借此机会改革官制，选拔寒门子弟。", scores: [10, 5, 15, 10], reaction: { speaker: "寒门学子", text: "臣等愿为女皇肝脑涂地！" } }
    ]
  },
  {
    id: 8,
    text: "第八问：酷吏来俊臣制造“罗织经”，后宫与朝堂人人自危。你深知酷吏是你的利刃，但也深知其危害，你决定？",
    background: "/assets/bgs/bg_q8.jpg",
    historicalFact: "武则天前期利用酷吏铲除异己，后期则将酷吏处死以平民愤。",
    // 修改：保持不变
    newCharacters: [
      {
        name: "来俊臣",
        title: "酷吏之首",
        bio: "《罗织经》作者，极度残忍，是你随时可弃的棋子。",
        wikiUrl: "https://baike.baidu.com/item/%E6%9D%8E%E4%BF%8A%E8%87%A3/430467"
      }
    ],
    options: [
      { label: "A", text: "鼓励密告，继续用高压维持统治。", scores: [20, -20, 0, -10], reaction: { speaker: "来俊臣", text: "陛下圣明，臣定将叛逆罗织入罪！" } },
      { label: "B", text: "请君入瓮。除掉来俊臣，收买人心。", scores: [10, 15, 5, 15], reaction: { speaker: "狄仁杰", text: "除此毒瘤，天下太平矣。" } },
      { label: "C", text: "建立更完善的法律体系，限制酷吏。", scores: [5, 10, 15, 20], reaction: { speaker: "百姓", text: "女皇隆恩，法律清明。" } }
    ]
  },
  {
    id: 9,
    text: "第九问：已近耄耋之年，立子还是立侄？狄仁杰言：“陛下立子，则千秋万岁后，配食太庙；立侄，则未闻侄为天子而祔姑于庙者。”",
    background: "/assets/bgs/bg_q9.jpg",
    historicalFact: "狄仁杰以血缘逻辑说服武则天。最终武后召回李显，确立了皇位归还李唐的格局。",
    newCharacters: [
      
      {
        name: "上官婉儿",
        title: "唐朝女官",
        bio: "掌管诏令。武则天最信任的机要人员，见证了权力交接的每一个环节。",
        wikiUrl: "https://baike.baidu.com/item/%E4%B8%8A%E5%AE%98%E5%A9%89%E5%84%BF/26942"
      }
    ],
    options: [
      { label: "A", text: "还政李显。儿子终究比侄子亲。", scores: [5, 15, -10, 20], reaction: { speaker: "狄仁杰", text: "陛下圣裁！此乃万世之基。" } },
      { label: "B", text: "传位武承嗣。我的江山当由武家继承。", scores: [15, -10, 10, -15], reaction: { speaker: "武承嗣", text: "臣定当不负姑母重托。" } },
      { label: "C", text: "立上官婉儿为继承人，开女子传位之先河。", scores: [10, 5, 20, 5], reaction: { speaker: "上官婉儿", text: "臣诚惶诚恐，此举恐天下大乱。" } }
    ]
  },
  {
    id: 10,
    text: "第十问：神龙元年，张柬之等起兵，你卧病长生殿。回首一生，这无字碑上，你打算刻下什么？",
    background: "/assets/bgs/bg_q10.jpg",
    historicalFact: "神龙政变后武后退位。遗命：“去帝号，称则天大圣皇后。”立无字碑。",
    // 修改：删除上官婉儿，增加张柬之、李显
    newCharacters: [
      {
        name: "张柬之",
        title: "唐朝著名政治家",
        bio: "神龙政变的主要策划者。以八十岁高龄发动兵变，恢复李唐江山。",
        wikiUrl: "https://baike.baidu.com/item/%E5%BC%A0%E6%9F%AC%E4%B9%8B/2512988"
      },
      {
        name: "唐中宗 (李显)",
        title: "大唐第四任皇帝",
        bio: "武则天之子。曾在庐陵受难，如今在重臣簇拥下重回权力巅峰。",
        wikiUrl: "https://baike.baidu.com/item/%E6%9D%8E%E6%98%BE/56173"
      }
    ],
    options: [
      { label: "A", text: "刻下朕的千秋丰功伟绩。", scores: [10, -5, 10, 0], reaction: { speaker: "张柬之", text: "历史的评价，不在碑文，而在人心。" } },
      { label: "B", text: "去帝号，称皇后，归葬李氏祖坟。", scores: [5, 15, -5, 20], reaction: { speaker: "李显", text: "母后，儿臣接您回家。" } },
      { label: "C", text: "不著一字，留白于天地，留待后人评说。", scores: [20, 10, 20, 10], reaction: { speaker: "武则天", text: "碑虽无字，胜却千言。朕，无憾了。" } }
    ]
  }
];