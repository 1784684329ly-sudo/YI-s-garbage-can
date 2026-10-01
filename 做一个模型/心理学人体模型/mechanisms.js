// ============================================================
//  真题脑机制：只讲“这个心理现象在大脑里是怎么发生的”。
//  questions.js 里每道题用 mech 指向这里（或用 dis 指向 disorders.js 的病变机理）。
//  structs = data.js 的结构 id（整块高亮）；fine = "网格基名=显示名"（金色细分高亮）；
//  fn = 相关功能分组 id（功能卡里会列出这些题）。
// ============================================================

export const MECHS = [
  // ---------- 学习 ----------
  { id: "reinforce", title: "正强化与负强化的大脑回路",
    structs: ["striatum", "amygdala"], fine: ["Midbrain=中脑 VTA（多巴胺）", "Putamen=壳核（习惯）"], fn: ["learning", "reward"],
    steps: [
      "正强化：行为后得到奖励 → 中脑腹侧被盖区（VTA）多巴胺神经元爆发放电，多巴胺释放到伏隔核（腹侧纹状体）。",
      "多巴胺传递的是“奖赏预测误差”：结果比预期好就放电增强，把“这个行为 → 好结果”的联结加固，下次更想做。",
      "负强化：厌恶刺激（噪音、焦虑）被撤除时，杏仁核警报解除，伏隔核同样出现多巴胺“解脱信号”——所以“摆脱不舒服”也会让行为增加。",
      "反复强化后，控制权从腹侧纹状体（为结果而做）移交给背侧的壳核（自动习惯）。"
    ] },
  { id: "reward_punish", title: "奖励和惩罚在儿童脑中的不同路线",
    structs: ["striatum", "amygdala", "insula", "pfc"], fine: ["Midbrain=中脑 VTA", "Habenula=缰核（失望信号）", "Middle_frontal_gyrus=背外侧前额叶"], fn: ["learning", "reward", "dev_brain"],
    steps: [
      "奖励：中脑VTA多巴胺 → 伏隔核，强化“趋近”学习，告诉大脑“下次还这样做”。",
      "惩罚：缰核发出“失望”信号压低多巴胺，杏仁核和岛叶产生恐惧与厌恶——学到的主要是“回避”，而不是“该做什么”。",
      "发展差异：8–9岁儿童的背外侧前额叶和顶叶对正反馈反应强、对负反馈几乎不反应，成年后才反过来（van Duijvenvoorde 2008）——儿童的大脑更擅长从奖励中学习。",
      "儿童前额叶未成熟，难以把“被罚”转化成下次的行为计划；惩罚过强时杏仁核的恐惧反应还会干扰学习。"
    ] },
  { id: "habit_tv", title: "边吃饭边看电视时的大脑",
    structs: ["striatum", "insula", "hypothalamus", "pfc"], fn: ["reward", "learning", "motivation"],
    steps: [
      "电视画面持续带来新奇刺激，激活纹状体奖赏系统；“吃饭 + 电视”反复配对后形成背侧纹状体主导的习惯。",
      "注意被电视占走，岛叶对“饱了”的内感受信号变弱，对吃了多少的记忆也变差 → 吃得多或心不在焉。",
      "下丘脑的饥饱信号需要被注意到才能调节进食，分心时这条反馈环路失灵。",
      "幼儿前额叶抑制控制未成熟，靠意志放弃眼前的强奖励很难——改变环境和奖励安排比说教有效。"
    ] },
  { id: "learned_helplessness", title: "习得性无助：被动是默认，可控要学",
    structs: ["brainstem", "pfc", "amygdala"], fine: ["Midbrain=中缝背核（5-羟色胺）", "Straight_gyrus_Gyrus_rectus=腹内侧前额叶（可控感）"], fn: ["learning", "emotion"],
    steps: [
      "不可控的厌恶刺激强烈激活中脑中缝背核的5-羟色胺神经元 → 被动、放弃、焦虑。",
      "这其实是默认反应；当个体发现“我的行动有用”时，腹内侧前额叶会抑制中缝背核，被动才消失（Maier & Seligman 2016）。",
      "所以“无助”的本质是没学到“可控”；先经历过可控情境的动物，前额叶回路被训练过，之后就不容易无助（免疫效应）。"
    ] },
  { id: "advertising", title: "广告是怎样写进大脑的",
    structs: ["amygdala", "hippocampus", "striatum", "v1"], fine: ["Straight_gyrus_Gyrus_rectus=腹内侧前额叶（品牌偏好）"], fn: ["learning", "emo_memory", "reward"],
    steps: [
      "评价性条件反射：品牌与明星、美景反复配对，杏仁核和纹状体把愉快情绪“转移”到品牌上。",
      "情绪唤醒让杏仁核增强海马的记忆巩固，所以有情绪的广告记得更牢。",
      "品牌改变价值信号：盲测时两种可乐差不多，一看到品牌，偏好就随腹内侧前额叶和海马的活动一起改变（McClure 2004）。",
      "重复曝光让视觉皮层加工更流畅，这种流畅感被误读成“喜欢”。"
    ] },

  // ---------- 记忆 ----------
  { id: "working_memory", title: "工作记忆三成分的脑定位",
    structs: ["pfc", "broca", "parietal", "v1"], fine: ["Middle_frontal_gyrus=背外侧前额叶（中央执行）", "Supramarginal_gyrus=左缘上回（语音存储）"], fn: ["working_memory", "executive"],
    steps: [
      "中央执行 → 背外侧前额叶：分配注意、更新和操作信息，是“工作”的部分。",
      "语音环 → 左缘上回暂存语音，布洛卡区负责默念复述，所以发音抑制会削弱语音记忆。",
      "视空画板 → 顶叶（空间位置）和枕叶视觉区（形象）。",
      "与短时记忆的区别在脑上的体现：单纯保持信息主要靠后部感觉皮层的持续活动；一旦需要“操作”，前额叶就明显加入。"
    ] },
  { id: "stm_capacity", title: "短时记忆容量的大脑上限",
    structs: ["parietal", "pfc", "hippocampus"], fine: ["Intraparietal_sulcus=顶内沟（容量上限）", "Middle_frontal_gyrus=背外侧前额叶"], fn: ["working_memory"],
    steps: [
      "顶内沟的活动随记忆项目增加而上升，约到4个项目就到达平台——被认为是容量上限的神经标志（Todd & Marois 2004）。",
      "背外侧前额叶持续放电把信息“挂住”，并把零散项目组合成组块；组块后占用的“槽位”变少。",
      "精细复述和语义加工会调动海马，把信息转入长时记忆，从而绕开短时记忆的容量限制。"
    ] },
  { id: "decl_proc", title: "陈述性记忆与程序性记忆：两套系统",
    structs: ["hippocampus", "striatum", "cerebellum"], fine: ["Medial_occipitotemporal_gyrus_Parahippocampal=海马旁回", "Putamen=壳核"], fn: ["decl_memory", "learning", "motor"],
    steps: [
      "陈述性记忆：海马和内侧颞叶把事件快速绑定成记忆，之后逐渐转存到大脑皮层。",
      "程序性记忆：基底神经节（纹状体）和小脑在反复练习中逐步调整动作，不需要海马。",
      "H.M.切除双侧海马后记不住新事，却能一天天学会镜画；帕金森病（纹状体受损）患者正好相反——两套系统可以分别受损（双分离）。"
    ] },
  { id: "encoding_spec", title: "情境为什么能帮你想起来",
    structs: ["hippocampus", "pfc"], fine: ["Medial_occipitotemporal_gyrus_Parahippocampal=海马旁回（场景/情境）"], fn: ["decl_memory"],
    steps: [
      "编码时，海马把“内容”和当时的情境（地点、气味、心境）绑成同一个记忆痕迹；海马旁回负责场景信息。",
      "提取时，只要线索重现了一部分情境，海马就能“模式补全”，重新激活整个痕迹和编码时的脑区活动模式。",
      "状态依存记忆同理：药物或情绪状态也是痕迹的一部分；前额叶负责有意地搜索和核对线索。"
    ] },
  { id: "serial_position", title: "首因与近因效应的不同脑基础",
    structs: ["hippocampus", "pfc"], fn: ["decl_memory", "working_memory"],
    steps: [
      "首因效应：开头的项目复述得多，经海马转入长时记忆。",
      "近因效应：末尾的项目还在工作记忆里，由前额叶和后部皮层的持续活动维持。",
      "证据：海马损伤的遗忘症患者首因效应消失、近因效应正常；呈现后插入干扰任务清空工作记忆，近因效应就消失。"
    ] },
  { id: "schema", title: "图式在脑中的样子",
    structs: ["pfc", "hippocampus"], fine: ["Superior_frontal_gyrus=内侧前额叶（调用图式）"], fn: ["decl_memory", "social"],
    steps: [
      "图式存在新皮层的知识网络里，内侧前额叶负责调用和新信息匹配的图式。",
      "与图式一致的新信息能快速并入皮层、较少依赖海马；与图式冲突的信息要靠海马慢慢学（van Kesteren 2012）。",
      "这就是图式的两面：加快理解和记忆，也让人忽视或歪曲不一致的信息。"
    ] },

  // ---------- 感知觉 ----------
  { id: "perception_constancy", title: "知觉恒常性与整体性的大脑实现",
    structs: ["v1", "parietal"], fine: ["Lateral_occipitotemporal_gyrus=枕颞区（物体识别）", "Inferior_temporal_gyrus=颞下回"], fn: ["perception", "vision"],
    steps: [
      "V1只记录视网膜上的像：狗走远了，V1上的像就变小。",
      "腹侧通路（枕颞区 → 颞下回）把局部特征整合成“一只狗”，这里的神经元对大小、位置变化不敏感——整体性和恒常性的基础。",
      "顶叶背侧通路估计距离，大脑用“距离 × 视网膜像大小”推算真实大小（大小-距离不变）。",
      "记忆里关于“狗”的知识自上而下反馈到视觉皮层，帮助识别——这就是理解性。"
    ] },
  { id: "gestalt", title: "格式塔组织在视觉皮层里怎么发生",
    structs: ["v1", "parietal", "a1"], fine: ["Lateral_occipital_gyrus_Middle_occipital_gyrus=枕外侧区（轮廓整合）"], fn: ["perception"],
    steps: [
      "V1神经元之间有横向连接，朝向一致、首尾相接的线段彼此增强 → 连续性、闭合性。",
      "枕外侧区等高级视区对完整图形的反应强于零散片段，图形与背景在这里分离。",
      "运动方向相同的元素激活同一群运动敏感神经元（MT/V5）→ 共同命运。",
      "时间上的组织：听皮层把时间上接近的声音合并成节奏；两个光点交替闪现产生似动，是视觉运动区“补”出了中间的运动。"
    ] },
  { id: "depth_cliff", title: "视崖上婴儿的大脑在做什么",
    structs: ["v1", "parietal", "amygdala", "pfc"], fine: ["Superior_parietal_lobule=顶叶背侧通路（深度/空间）"], fn: ["perception", "dev_brain", "emotion"],
    steps: [
      "深度线索（纹理梯度、运动视差、双眼视差）由V1和顶叶背侧通路加工，出生后几个月内逐渐成熟。",
      "会爬以后，自主移动让婴儿把视觉深度和“掉下去”的身体经验联系起来 → 杏仁核开始对深侧产生恐惧（心率加快）。",
      "社会参照：婴儿看母亲的表情，母亲恐惧时婴儿的恐惧系统被进一步激活、不敢爬；母亲微笑时恐惧被抑制。",
      "所以影响表现的因素在脑上分三层：视觉深度加工是否成熟、运动经验带来的恐惧学习、他人情绪的调节。"
    ] },
  { id: "color_afterimage", title: "负后像从哪里来",
    structs: ["visual_pathway", "v1"], fine: ["Lateral_geniculate_body=外侧膝状体（颜色拮抗细胞）"], fn: ["vision"],
    steps: [
      "视网膜的视锥细胞按红、绿、蓝三种分工——三色说成立的层面。",
      "到神经节细胞和外侧膝状体，信号被改编成红-绿、黄-蓝、黑-白三对拮抗通道：一方兴奋，另一方就被抑制。",
      "长时间看黄色，黄-蓝通道里“黄”的一侧疲劳；再看白色时“蓝”的一侧相对占优 → 看到蓝色后像。",
      "所以三色说和拮抗说描述的是视觉通路上前后两个阶段。"
    ] },
  { id: "blind_spot", title: "盲点与大脑的“填补”",
    structs: ["visual_pathway", "v1"], fine: ["Optic_chiasm=视交叉"], fn: ["vision"],
    steps: [
      "视神经从视网膜鼻侧约15°处离开眼球，这里（视神经盘）没有感光细胞 → 生理盲点。",
      "盲点在V1上对应的区域没有来自这只眼的输入，但另一只眼的视野覆盖了它。",
      "单眼看时，V1和高级视区用周围的颜色和纹理把这块空白“填补”上，所以平时察觉不到。"
    ] },
  { id: "serial_parallel", title: "平行加工与系列加工的神经基础",
    structs: ["v1", "parietal"], fine: ["Superior_parietal_lobule=顶叶（空间注意）"], fn: ["attention", "perception"],
    steps: [
      "视觉系统天然是平行的：V1之后，颜色、形状、运动由不同视区同时加工。",
      "单一特征（如红色）在各自的特征地图上直接“跳出”，不依赖注意 → 平行加工。",
      "把几个特征绑定成一个物体（红色 + 竖线）需要顶叶的空间注意逐个位置扫描 → 系列加工；顶叶损伤者会出现特征错误结合。"
    ] },

  // ---------- 意识与注意 ----------
  { id: "rem", title: "REM睡眠的开关在脑干",
    structs: ["brainstem", "thalamus", "amygdala", "hypothalamus"], fine: ["Pons=脑桥（REM发生器）", "Medulla_oblongata=延髓（肌肉瘫痪通路）"], fn: ["arousal", "consciousness"],
    steps: [
      "脑桥启动REM：PGO波经丘脑传到枕叶视皮层，产生快速眼动和梦中的视觉画面。",
      "脑桥 → 延髓 → 脊髓抑制运动神经元，全身肌肉松弛，梦里的动作不会被做出来。",
      "REM期杏仁核等边缘系统高度活跃、背外侧前额叶活动低 → 梦情绪浓烈而不合逻辑。",
      "下丘脑视交叉上核管理昼夜节律；婴儿REM约占一半睡眠，可能为发育中的大脑提供内部刺激，随年龄下降。"
    ] },
  { id: "attention_dual", title: "控制加工与自动加工的脑区交接",
    structs: ["pfc", "acc", "parietal", "striatum"], fine: ["Middle_frontal_gyrus=背外侧前额叶", "Intraparietal_sulcus=顶内沟"], fn: ["attention", "consciousness"],
    steps: [
      "新任务需要控制加工：背外侧前额叶、前扣带和顶叶注意网络高度活跃，容量有限，两件事会抢资源。",
      "练习后这些区域的激活明显下降，加工转交给基底神经节和感觉运动区 → 自动化，几乎不占注意。",
      "所以只有其中一项已经自动化，注意才能顺利分配到另一项上。"
    ] },
  { id: "unconscious", title: "无意识加工：大脑做了，你却不知道",
    structs: ["v1", "amygdala", "thalamus", "pfc", "parietal"], fine: ["Superior_colliculus=上丘（盲视通路）"], fn: ["consciousness"],
    steps: [
      "盲视：V1损伤者说“看不见”，却能指出刺激位置——信息经上丘、丘脑枕核绕过V1到达高级视区，没有进入意识。",
      "阈下呈现的恐惧面孔仍会经丘脑快路激活杏仁核，影响后续判断。",
      "意识化需要“点火”：刺激足够强时，前额叶-顶叶网络大范围同步激活（全局工作空间），信息才能被报告和灵活使用。",
      "这就是质的差异：无意识信号只在局部短暂活动，无法被前额叶调用去执行反向、灵活的指令。"
    ] },

  // ---------- 思维与决策 ----------
  { id: "dual_system", title: "“快系统”和“慢系统”在脑中的对应",
    structs: ["pfc", "acc", "amygdala", "striatum"], fine: ["Middle_frontal_gyrus=背外侧前额叶（慢系统）", "Straight_gyrus_Gyrus_rectus=腹内侧前额叶（直觉价值）"], fn: ["thinking", "executive"],
    steps: [
      "直觉（快系统）：杏仁核、纹状体和腹内侧前额叶快速给出情绪和价值判断。",
      "分析（慢系统）：背外侧前额叶在工作记忆中按规则推理，耗时又耗资源。",
      "冲突时前扣带回检测到“直觉和逻辑不一致”，调动背外侧前额叶压住直觉答案（De Neys）。",
      "但脑中并没有两个分开的模块，只是同一网络中不同区域的权重变化——这也是“双系统”被批评过于简化的原因。"
    ] },
  { id: "framing", title: "框架效应与启发式背后的情绪脑",
    structs: ["amygdala", "pfc", "insula", "striatum", "hippocampus"], fine: ["Orbital_gyri=眶额/内侧前额叶"], fn: ["thinking"],
    steps: [
      "框架效应：顺着框架做选择（得框架求稳、失框架冒险）时杏仁核激活更强；不受框架影响的人眶额/内侧前额叶更活跃（De Martino 2006）——框架效应源于情绪系统的快速反应。",
      "损失厌恶：面对潜在损失，纹状体价值信号下降的幅度大于等量收益时的上升，岛叶也对损失敏感。",
      "可得性启发：判断频率时依赖海马提取例子的难易——生动、最近、情绪强的例子容易想起，于是被高估。",
      "代表性启发：用“像不像”的模式匹配快速判断，绕开了前额叶对基础概率的计算。"
    ] },
  { id: "gratitude_risk", title: "情绪如何改变风险偏好",
    structs: ["pfc", "amygdala", "striatum", "insula"], fine: ["Straight_gyrus_Gyrus_rectus=腹内侧前额叶（价值整合）"], fn: ["thinking", "emotion"],
    steps: [
      "风险决策时，腹内侧前额叶整合收益（纹状体）和潜在损失（岛叶、杏仁核）两类信号。",
      "感恩等积极情绪降低杏仁核对威胁的敏感性，提高对未来的耐心和对他人的信任。",
      "恐惧等消极情绪放大杏仁核和岛叶的损失信号 → 更加规避风险。"
    ] },
  { id: "ai_mind", title: "人类思维的脑基础与AI的差异",
    structs: ["pfc", "hippocampus", "insula", "striatum"], fn: ["thinking"],
    steps: [
      "人类思维依托前额叶的工作记忆、海马的情景记忆与想象，并与身体状态（岛叶）、动机（纹状体）紧密耦合。",
      "大脑约860亿个神经元、功耗约20瓦，能从极少样本中学习并迁移；人工神经网络借鉴了“神经元加权连接”的思想，但学习机制与生物脑不同。",
      "人的思考由需要和情绪驱动，并伴随主观体验；当前AI缺少这种身体和动机基础——这是“模仿思维过程”的主要差距。"
    ] },
  { id: "intelligence", title: "智力与创造力的脑网络",
    structs: ["pfc", "parietal", "hippocampus"], fine: ["Middle_frontal_gyrus=背外侧前额叶", "Angular_gyrus=顶叶（P-FIT）", "Precuneus=楔前叶（默认网络）"], fn: ["thinking"],
    steps: [
      "智力：顶-额整合理论（P-FIT）——信息从后部感觉区经顶叶整合，再到前额叶推理；两者间白质连接越高效，智力测验分数越高（Jung & Haier 2007）。",
      "创造力：默认网络（楔前叶、内侧前额叶、海马）自由联想和想象，执行控制网络（背外侧前额叶）筛选和评估，两者协作越灵活越有创造力（Beaty 2018）。",
      "情绪智力更依赖腹内侧前额叶、岛叶和杏仁核的情绪信号处理，与IQ的网络部分分离。"
    ] },

  // ---------- 情绪、动机与压力 ----------
  { id: "emotion_theories", title: "经典情绪理论在脑中的对应",
    structs: ["thalamus", "hypothalamus", "amygdala", "insula", "pfc"], fn: ["emotion"],
    steps: [
      "詹姆斯-兰格：身体先变化 → 岛叶把心跳、呼吸等内感受整合为情绪体验（高位脊髓损伤者情绪强度下降支持这一点）。",
      "坎农-巴德：丘脑同时把信号送到皮层（体验）和下丘脑（生理反应），两者并行。",
      "沙赫特-辛格：生理唤醒 + 前额叶的认知解释 = 具体情绪。",
      "现代整合（LeDoux）：丘脑 → 杏仁核“快路”先触发反应，丘脑 → 皮层 → 杏仁核“慢路”精细评估；各理论描述的是不同环节。"
    ] },
  { id: "stress_appraisal", title: "认知评价如何改写情绪与压力反应",
    structs: ["pfc", "amygdala", "acc", "hypothalamus", "pituitary"], fine: ["Middle_frontal_gyrus=背外侧前额叶（重评）", "Straight_gyrus_Gyrus_rectus=腹内侧前额叶"], fn: ["emotion", "arousal"],
    steps: [
      "刺激先经丘脑快速到达杏仁核，产生初步的情绪反应。",
      "认知重评时，外侧前额叶重新解释情境，经腹内侧前额叶下调杏仁核，负性情绪和生理反应随之减弱（Ochsner 2002）。",
      "评价为“威胁”→ 杏仁核启动下丘脑-垂体-肾上腺轴，皮质醇升高；评价为“挑战”→ 心输出量增加、血管舒张，皮质醇反应较小。",
      "表达抑制（只压住表情）不降低杏仁核反应，反而增加交感唤醒——这就是重评优于压抑的脑机制。"
    ] },
  { id: "motivation", title: "动机的两个引擎：驱力与奖赏",
    structs: ["hypothalamus", "striatum", "pfc"], fine: ["Midbrain=中脑 VTA（多巴胺）"], fn: ["motivation", "reward"],
    steps: [
      "基本需要（饥、渴、体温、性）由下丘脑维持内稳态——对应驱力理论和需要层次的底层。",
      "多巴胺奖赏系统（VTA → 伏隔核）负责“想要”和为目标付出努力：多巴胺越高，越愿意为更大的奖励付出更多努力。",
      "前额叶把长远目标（成就、认可、自我实现）表征为价值并维持行为——越高层的需要越依赖前额叶。",
      "外部奖励撤掉后，纹状体对任务本身的反应下降（德西效应在脑中也能看到，Murayama 2010）。"
    ] },
  { id: "eating", title: "压力和他人如何改变进食",
    structs: ["hypothalamus", "pituitary", "striatum", "pfc"], fine: ["Orbital_gyri=眶额皮层（食物价值）"], fn: ["motivation", "reward"],
    steps: [
      "下丘脑整合饥饿素、瘦素、血糖等信号：外侧区驱动进食，腹内侧核产生饱足感。",
      "急性压力：下丘脑释放促肾上腺皮质激素释放激素（CRH），抑制食欲 → 很多人吃不下。",
      "慢性压力：皮质醇持续偏高，增强纹状体和眶额对高糖高脂食物的奖赏反应 → 压力性进食；吃完又能暂时压低应激反应，形成负强化。",
      "有他人在场时，前额叶的印象管理和自我控制加入进来，可以压过下丘脑的饥饿信号——在想留下好印象的人面前吃得更少。"
    ] },
  { id: "self_efficacy", title: "“我能行”在大脑里是什么",
    structs: ["striatum", "pfc", "amygdala"], fine: ["Straight_gyrus_Gyrus_rectus=腹内侧前额叶（自我评价）"], fn: ["motivation", "emotion"],
    steps: [
      "成功经验通过纹状体的奖赏预测误差不断累积，让大脑形成“我的行动会带来好结果”的预期。",
      "预期越高，多巴胺系统越愿意为目标投入努力；预期低时，大脑判断“努力不值得”→ 退缩。",
      "把紧张解读为“兴奋”而非“危险”，杏仁核的威胁反应减弱——对应效能感来源里的“生理与情绪状态”。",
      "腹内侧前额叶参与自我评价，反复的失败和批评会强化负性的自我评价。"
    ] },
  { id: "self_control", title: "自控力：前额叶与奖赏系统的拔河",
    structs: ["pfc", "striatum", "acc"], fine: ["Middle_frontal_gyrus=背外侧前额叶（控制）", "Straight_gyrus_Gyrus_rectus=腹内侧前额叶（整合价值）"], fn: ["executive", "reward", "personality_fn"],
    steps: [
      "诱惑出现时，纹状体和腹内侧前额叶快速计算“眼前的好处”。",
      "背外侧前额叶把长远目标（健康、安全）纳入价值计算，压低即时诱惑的权重——自控成功的人这种调节更强（Hare 2009）。",
      "前扣带回监测冲突，提醒需要控制。",
      "失效因素：压力（皮质醇和去甲肾上腺素削弱前额叶）、睡眠不足、酒精、疲劳都会让前额叶“下线”，奖赏系统占上风；青少年前额叶未成熟而纹状体特别敏感，所以更冲动。"
    ] },
  { id: "type_a", title: "A型人格：一直开着的应激系统",
    structs: ["hypothalamus", "pituitary", "amygdala", "brainstem"], fn: ["arousal", "personality_fn"],
    steps: [
      "时间紧迫、竞争和敌意让杏仁核持续感知威胁，下丘脑反复启动两条应激通路。",
      "交感-肾上腺髓质通路：肾上腺素、去甲肾上腺素升高 → 血压、心率上升。",
      "HPA轴：皮质醇长期偏高 → 血脂、血糖和炎症反应增加。",
      "日积月累损伤血管内皮，增加冠心病风险——其中“敌意”成分与心血管反应关系最密切。"
    ] },
  { id: "burnout", title: "工作倦怠时大脑被什么耗竭",
    structs: ["hypothalamus", "pituitary", "amygdala", "acc", "pfc"], fn: ["arousal", "executive"],
    steps: [
      "慢性工作压力让HPA轴长期激活，最后皮质醇节律变得紊乱、平坦——对应情绪衰竭。",
      "倦怠者杏仁核体积增大，杏仁核与前扣带、内侧前额叶的连接减弱，情绪调节能力下降（Golkar 2014）。",
      "前额叶长期处在应激下，注意、工作记忆和决策能力下降 → 效率下降、成就感降低。"
    ] },
  { id: "personality", title: "人格差异的脑基础",
    structs: ["brainstem", "striatum", "amygdala", "pfc"], fine: ["Orbital_gyri=眶额皮层（外倾：奖赏）", "Middle_frontal_gyrus=外侧前额叶（尽责性）"], fn: ["personality_fn"],
    steps: [
      "艾森克：内倾者脑干网状激活系统的基础唤醒高，外倾者低 → 外倾者寻求刺激来达到最佳唤醒，在噪音和压力下表现反而更好。",
      "外倾性与多巴胺奖赏系统（纹状体、眶额）的敏感性相关：对奖励反应更强、更积极。",
      "神经质与杏仁核对负性刺激的反应性有关；尽责性与外侧前额叶体积相关（DeYoung 2010）。"
    ] },
  { id: "smoking", title: "戒烟难在哪里：尼古丁成瘾的大脑",
    structs: ["striatum", "insula", "pfc", "amygdala"], fine: ["Midbrain=中脑 VTA（尼古丁受体）"], fn: ["reward", "motivation"],
    steps: [
      "尼古丁作用于中脑VTA的乙酰胆碱受体，引起伏隔核多巴胺释放 → 吸烟被强化。",
      "岛叶编码“想抽烟”的渴求：岛叶卒中的吸烟者能轻易戒烟（Naqvi 2007）。",
      "意向要变成行动，需要前额叶在渴求出现时压住冲动——对应计划行为理论里的“知觉行为控制”。",
      "戒断时杏仁核应激系统激活带来烦躁焦虑，复吸可以解除这种不适（负强化）。"
    ] },
  { id: "short_video", title: "短剧为什么让人停不下来",
    structs: ["striatum", "amygdala", "insula", "pfc"], fine: ["Midbrain=中脑 VTA（多巴胺）"], fn: ["reward"],
    steps: [
      "每集结尾的悬念制造“奖赏不确定”，这时中脑多巴胺神经元最活跃，驱动“再看一集”。",
      "逆袭、打脸等强情绪情节激活杏仁核和纹状体，情绪满足来得很快。",
      "算法推荐的随机奖励与老虎机原理相同；前额叶在疲劳、深夜时控制力下降，更难停下来。",
      "看剧中人物的遭遇时，岛叶、前扣带等共情相关脑区被调动，带来代入感。"
    ] },

  // ---------- 社会 ----------
  { id: "tom", title: "心理理论的“社会脑”网络",
    structs: ["pfc", "parietal", "wernicke", "amygdala"], fine: ["Supramarginal_gyrus=右颞顶联合区（推断信念）", "Superior_frontal_gyrus=内侧前额叶", "Superior_temporal_sulcus=颞上沟", "Precuneus=楔前叶"], fn: ["social", "dev_brain"],
    steps: [
      "右侧颞顶联合区：专门在“想别人怎么想”时激活，推断他人的错误信念（Saxe）。",
      "内侧前额叶区分他人和自己的心理状态，进行心理化推理；楔前叶参与视角转换。",
      "颞上沟读取目光和动作意图，杏仁核读取面部情绪。",
      "约4岁通过错误信念任务，与这些区域及前额叶执行功能的成熟同步；孤独症中这一网络活动偏低。"
    ] },
  { id: "empathy", title: "换位思考与共情的两套系统",
    structs: ["pfc", "parietal", "insula", "acc"], fine: ["Supramarginal_gyrus=右颞顶联合区（区分自我与他人）", "Superior_frontal_gyrus=内侧前额叶"], fn: ["social"],
    steps: [
      "认知共情（换位思考）：颞顶联合区和内侧前额叶模拟对方的想法，并把“我”和“他”的视角分开。",
      "情感共情：看到他人痛苦时，前脑岛和前扣带回出现与自己疼痛相似的激活（Singer 2004）——“感同身受”在脑中是真实的。",
      "换位思考时要压住自我中心的视角，右颞顶联合区和外侧前额叶参与这种抑制。",
      "经常练习观点采择或慈悲训练后，这些区域的反应会增强。"
    ] },
  { id: "conformity", title: "从众与服从：大脑如何被他人改变",
    structs: ["striatum", "acc", "amygdala", "pfc"], fine: ["Cingulate_gyrus_and_sulcus_Middle_posterior_part=扣带回中部（“与众不同”的错误信号）"], fn: ["social"],
    steps: [
      "从众：发现自己与群体不一致时，扣带回中部像犯错一样发出“预测误差”信号，腹侧纹状体活动下降——大脑把“与众不同”当成错误来纠正（Klucharev 2009）。",
      "与群体一致时纹状体奖赏区激活——和大家一样本身就有奖赏。",
      "阿希式从众不只是嘴上附和：从众时视觉和顶叶空间区的活动也改变，说明群体意见改变了知觉本身；坚持己见时杏仁核激活，这是独立的情绪代价（Berns 2005）。",
      "服从：按命令行事时，“这是我做的”主体感减弱，大脑对自己行为后果的加工也减弱，包括对他人痛苦的共情反应（Caspar 2016）——“我只是执行命令”的神经基础。"
    ] },
  { id: "deindividuation", title: "匿名与去个体化的大脑",
    structs: ["pfc", "amygdala", "acc"], fine: ["Superior_frontal_gyrus=内侧前额叶（自我参照）"], fn: ["social"],
    steps: [
      "内侧前额叶负责自我参照——“这是我、我在做什么”。在群体或匿名状态下它的活动下降，自我意识减弱（Cikara 2014）。",
      "自我监控减弱 → 个人道德标准对行为的约束变弱，更容易跟着情境和群体走。",
      "实名或被看见时，评价顾忌让前额叶的自我监控和杏仁核对社会评价的敏感性上升，行为更克制。"
    ] },
  { id: "social_facilitation", title: "有人在场为什么骑得更快",
    structs: ["amygdala", "hypothalamus", "brainstem", "striatum", "cerebellum"], fine: ["Pons=脑桥蓝斑（去甲肾上腺素）"], fn: ["arousal", "social"],
    steps: [
      "他人在场 → 杏仁核觉察到社会评价，经下丘脑和脑干蓝斑提高唤醒：去甲肾上腺素、肾上腺素上升，心率和肌肉供血增加。",
      "唤醒增强“优势反应”：骑车这类熟练动作由基底神经节和小脑自动执行，唤醒越高输出越强 → 更快。",
      "复杂或生疏的任务需要前额叶精细控制，唤醒过高反而干扰 → 社会抑制（倒U）。"
    ] },
  { id: "mere_exposure", title: "为什么越熟悉越喜欢",
    structs: ["v1", "amygdala", "striatum"], fine: ["Lateral_occipitotemporal_gyrus=梭状回（面孔/物体）", "Straight_gyrus_Gyrus_rectus=腹内侧前额叶（价值）"], fn: ["perception", "emotion", "reward"],
    steps: [
      "反复看同一刺激，视觉皮层（梭状回等）的反应逐渐减弱（重复抑制）——加工变得更省力、更流畅。",
      "这种流畅感被误读为“喜欢”；同时杏仁核对新异刺激的警觉下降，熟悉的东西显得更安全。",
      "熟悉的面孔和品牌在腹内侧前额叶、纹状体中引起更强的价值信号，熟悉面孔也更容易被判断为积极表情。"
    ] },
  { id: "social_perception", title: "一眼看人：社会知觉的快速回路",
    structs: ["amygdala", "wernicke", "pfc"], fine: ["Lateral_occipitotemporal_gyrus=梭状回（面孔）", "Superior_temporal_sulcus=颞上沟（目光/动作）", "Orbital_gyri=眶额（吸引力/价值）"], fn: ["social"],
    steps: [
      "梭状回识别面孔，颞上沟读取目光方向和动作意图。",
      "杏仁核在约100毫秒内对面孔做出“可不可信”的判断，第一印象由此形成。",
      "晕轮效应：好看的面孔激活眶额皮层的奖赏和价值信号，这种正价值“溢出”到对能力、品德的判断上。",
      "内侧前额叶整合这些信息形成整体印象，并用已有图式（刻板印象、内隐人格理论）快速填补空白。"
    ] },
  { id: "attribution", title: "归因时大脑在想什么",
    structs: ["pfc", "parietal"], fine: ["Superior_frontal_gyrus=内侧前额叶（推断性格）", "Supramarginal_gyrus=颞顶联合区（推断意图）"], fn: ["social"],
    steps: [
      "看到他人行为时，内侧前额叶和颞顶联合区（心理化网络）会自动推断对方的性格，即使没被要求——基本归因错误的神经基础。",
      "考虑情境因素是额外的、费力的修正（外侧前额叶）；认知负荷高时修正失败，更偏向归因于人格。",
      "文化差异：中国被试想到“母亲”时，内侧前额叶的自我表征区也会激活（Zhu 2007），自我更关系化——与更重视情境的归因风格一致。"
    ] },
  { id: "self_bias", title: "为什么总觉得自己干得多",
    structs: ["pfc", "hippocampus", "striatum"], fine: ["Superior_frontal_gyrus=内侧前额叶（自我参照）"], fn: ["social", "decl_memory"],
    steps: [
      "自我参照效应：与“我”有关的信息经内侧前额叶加工，编码更深、记得更牢——自己买菜的经历比对方买菜更容易想起。",
      "判断“谁做得多”时，大脑依赖海马提取例子的难易（可得性），自己付出的例子更多、更生动。",
      "把付出归于自己会激活纹状体奖赏区，维护自尊本身带有奖赏。"
    ] },
  { id: "stereotype", title: "刻板印象的自动激活与控制",
    structs: ["amygdala", "acc", "pfc"], fine: ["Lateral_occipitotemporal_gyrus=梭状回（社会分类）", "Middle_frontal_gyrus=背外侧前额叶（控制偏见）"], fn: ["social"],
    steps: [
      "看到外群体面孔的几百毫秒内，梭状回完成社会分类；杏仁核反应与内隐偏见（IAT分数）相关（Phelps 2000）。",
      "前扣带回检测到“自动反应与平等观念冲突”，背外侧前额叶随后压住刻板反应——所以时间紧或分心时刻板印象更容易表现出来。",
      "与外群体成员的个人接触、个体化加工能降低杏仁核的分类反应。"
    ] },
  { id: "stereotype_threat", title: "刻板印象威胁为什么让人发挥失常",
    structs: ["amygdala", "acc", "pfc"], fine: ["Middle_frontal_gyrus=背外侧前额叶（工作记忆）"], fn: ["social", "working_memory"],
    steps: [
      "意识到“可能证实负面刻板印象”时，杏仁核和前扣带活动增强，产生威胁感和过度自我监控。",
      "担忧占用了背外侧前额叶的工作记忆资源：威胁下女性做数学题时，情绪相关的腹侧前扣带激活增加、数学相关脑区激活减少（Krendl 2008）。",
      "应激激素上升进一步削弱前额叶功能。"
    ] },
  { id: "dissonance", title: "认知失调的不适感从哪里来",
    structs: ["acc", "insula", "pfc"], fine: ["Middle_frontal_gyrus=背外侧前额叶（调整态度）"], fn: ["social", "thinking"],
    steps: [
      "说出与自己态度相反的话时，前扣带回和前脑岛激活更强（van Veen 2009）——它们监测冲突并产生不舒服的感觉，这就是“失调”的生理信号。",
      "前扣带越活跃，随后的态度改变越大；背外侧前额叶参与把态度“调”到与行为一致。",
      "这为失调理论“存在不愉快唤醒”提供了证据；自我知觉理论则认为只是冷静推理，不需要这种冲突信号。"
    ] },
  { id: "fairness", title: "公平与交换：大脑的奖赏-代价计算",
    structs: ["insula", "striatum", "pfc", "acc"], fine: ["Orbital_gyri=眶额皮层（比较得失）"], fn: ["social", "reward"],
    steps: [
      "获得社会回报（赞许、合作、公平对待）激活纹状体，与金钱奖赏共用奖赏回路；即使金额相同，公平的分配也更让纹状体兴奋（Tabibnia 2008）。",
      "眶额和腹内侧前额叶比较“得到的”与“付出的”，计算关系或交换的价值。",
      "受到不公平对待时前脑岛激活（类似厌恶），越活跃越可能拒绝（最后通牒博弈，Sanfey 2003）；背外侧前额叶参与压住拒绝冲动、为长远利益接受。",
      "恢复公平的种种做法（少干活、要加薪、换参照对象），在脑中都是为了消除这种岛叶的不舒服信号。"
    ] },
  { id: "prosocial", title: "帮助别人为什么让人快乐",
    structs: ["insula", "acc", "striatum", "pfc", "hypothalamus"], fine: ["Supramarginal_gyrus=颞顶联合区（理解对方需要）", "Neurohypophysis=神经垂体（催产素）"], fn: ["social", "reward"],
    steps: [
      "共情：看到他人受苦，前脑岛和前扣带回激活，引发帮助动机。",
      "捐赠或帮助时纹状体奖赏区激活，自愿捐赠时更强（“温暖光辉”，Harbaugh 2007）。",
      "颞顶联合区和内侧前额叶理解对方的需要和意图，决定怎么帮。",
      "催产素增强信任和亲社会倾向（效果受情境影响）。"
    ] },
  { id: "aggression", title: "攻击行为的脑与基因",
    structs: ["amygdala", "hypothalamus", "pfc", "brainstem"], fine: ["Orbital_gyri=眶额/腹内侧前额叶（刹车）", "Midbrain=中脑导水管周围灰质"], fn: ["emotion", "social"],
    steps: [
      "攻击的“油门”：杏仁核、下丘脑和中脑导水管周围灰质组成防御-攻击回路，电刺激可以直接诱发攻击。",
      "攻击的“刹车”：眶额/腹内侧前额叶抑制冲动，前额叶受损或发育不成熟时冲动性攻击增多。",
      "5-羟色胺偏低、睾酮偏高会削弱刹车、增强油门。",
      "先天与后天交汇：MAOA低活性基因携带者只有在童年受虐时攻击性才显著升高——基因让杏仁核-前额叶回路对环境更敏感（Caspi 2002）。"
    ] },
  { id: "social_support", title: "社会支持怎样保护身体",
    structs: ["acc", "hypothalamus", "pituitary", "amygdala"], fine: ["Neurohypophysis=神经垂体（催产素）"], fn: ["social", "arousal"],
    steps: [
      "被排斥时前扣带回背侧和前脑岛激活，与生理疼痛共用通路（Eisenberger 2003）。",
      "受到电击威胁时握着爱人的手，下丘脑和前扣带的威胁反应减弱（Coan 2006）。",
      "社会接触促进催产素释放，抑制杏仁核和HPA轴 → 皮质醇降低——这是社会支持缓冲压力的生理通路。",
      "长期缺乏社会支持（孤独）让HPA轴和炎症反应长期偏高，影响免疫和心血管健康。"
    ] },

  // ---------- 发展 ----------
  { id: "teen_brain", title: "青春期大脑的双系统失衡",
    structs: ["pfc", "striatum", "amygdala"], fine: ["Middle_frontal_gyrus=背外侧前额叶（约25岁才成熟）"], fn: ["dev_brain"],
    steps: [
      "纹状体奖赏系统在青春期早期迅速变敏感，对新奇、同伴认可和即时奖励反应特别强。",
      "前额叶控制系统的髓鞘化和突触修剪要持续到25岁左右 → 两者成熟时间错位，冲动和冒险增加（Steinberg 双系统模型）。",
      "杏仁核情绪反应强、前额叶调控弱 → 情绪波动大，也是抑郁、焦虑在青春期高发的脑基础之一。"
    ] },
  { id: "bullying", title: "霸凌中三方的大脑",
    structs: ["striatum", "pfc", "acc", "amygdala", "hippocampus"], fn: ["social", "dev_brain"],
    steps: [
      "施暴者：青春期纹状体对同伴认可特别敏感，而前额叶刹车未成熟——在同伴面前冒险和攻击被强化。",
      "受害者：被排斥激活前扣带的“社交痛”；长期霸凌让HPA轴和杏仁核持续处于应激，增加抑郁、焦虑风险，并可能影响海马发育。",
      "旁观者：责任分散降低帮助动机；共情脑区（前脑岛、前扣带）被激活的旁观者更可能出手。"
    ] },
  { id: "left_behind", title: "早期亲子分离对大脑发育的影响",
    structs: ["amygdala", "pfc", "hippocampus", "hypothalamus", "pituitary"], fn: ["dev_brain"],
    steps: [
      "父母是儿童情绪调节的“外部前额叶”：父母在场时，儿童的杏仁核反应被缓冲（Gee 2014）。",
      "长期缺少稳定照料，HPA轴应激反应改变、杏仁核反应增强；杏仁核-前额叶连接可能提前“成熟”，但调节力较弱（Gee 2013）。",
      "慢性压力影响海马发育，与学习和记忆困难有关。",
      "稳定的祖辈照料、学校支持等保护因素可以部分替代这种缓冲。"
    ] },
  { id: "attachment", title: "依恋的神经内分泌基础",
    structs: ["hypothalamus", "pituitary", "striatum", "amygdala", "pfc"], fine: ["Neurohypophysis=神经垂体（催产素）", "Midbrain=中脑 VTA（奖赏）"], fn: ["social", "dev_brain"],
    steps: [
      "母婴接触和照料促进下丘脑合成、神经垂体释放催产素，增强亲近和信任。",
      "母亲看到自己孩子的笑脸时，中脑VTA和纹状体奖赏区强烈激活——爱在脑中是一种奖赏（Strathearn 2008）。",
      "照料者在场能降低婴儿的HPA应激反应；安全型依恋的婴儿分离后皮质醇恢复更快。",
      "早期依恋经验塑造杏仁核-前额叶的情绪调节回路，形成日后人际关系的“内部工作模式”。"
    ] },
  { id: "piaget", title: "认知发展与大脑成熟",
    structs: ["pfc", "parietal", "hippocampus"], fine: ["Middle_frontal_gyrus=背外侧前额叶"], fn: ["dev_brain"],
    steps: [
      "客体永存：记住“东西藏在哪”需要背外侧前额叶的工作记忆；A非B错误是因为抑制不了“去老地方找”的习惯——前额叶成熟后（约12个月）错误消失（Diamond）。",
      "具体运算期（7–11岁）：前额叶和顶叶持续成熟，工作记忆和抑制控制增强 → 能同时考虑两个维度（守恒）、进行可逆思维。",
      "顶叶负责数量和空间关系，支持分类、排序和守恒判断。"
    ] },
  { id: "motor_dev", title: "动作发展顺序与神经成熟",
    structs: ["m1", "cerebellum", "brainstem"], fn: ["motor", "dev_brain"],
    steps: [
      "新生儿的反射由脑干和脊髓控制；运动皮层成熟后，原始反射逐渐被抑制，随意动作出现。",
      "髓鞘化从头向脚、从躯干向四肢推进 → 头尾原则、近远原则。",
      "小脑成熟让平衡和协调提升，支撑从独坐、爬到独立行走。",
      "精细动作（拇指和食指对捏）依赖皮质脊髓束成熟，晚于大动作。"
    ] },
  { id: "kohlberg", title: "道德判断的大脑",
    structs: ["pfc", "amygdala", "parietal"], fine: ["Straight_gyrus_Gyrus_rectus=腹内侧前额叶（情绪+价值）", "Supramarginal_gyrus=颞顶联合区（推断意图）"], fn: ["social", "dev_brain"],
    steps: [
      "道德判断是情绪与推理的结合：腹内侧前额叶整合杏仁核的情绪信号；腹内侧前额叶受损者在道德两难中更“冷血功利”（Koenigs 2007）。",
      "颞顶联合区推断行为者的意图——从“看后果”（低阶段）发展到“看动机”的基础。",
      "高阶段的抽象原则推理依赖背外侧前额叶，它在青春期后才成熟，所以后习俗水平很少在儿童中出现。"
    ] },
  { id: "language", title: "语言的专门脑区：先天论的神经证据",
    structs: ["broca", "wernicke", "corpus_callosum"], fine: ["Supramarginal_gyrus=缘上回（弓状束经过）", "Transverse_temporal_gyri=颞横回（听觉入口）"], fn: ["language"],
    steps: [
      "左半球的布洛卡区（产出、语法）和韦尼克区（理解）由弓状束相连，约95%右利手者的语言在左半球——语言有专门的神经基础。",
      "新生儿听语言时左颞叶已有偏侧化反应，说明这套网络出生前就在准备。",
      "关键期：早期大脑可塑性高；错过关键期的个案（Genie）语法习得困难，晚学第二语言者也更多动用额外脑区。",
      "言语发展与脑成熟同步：咿呀学语对应听觉-发音回路的建立，词汇爆发和语法发展对应左额颞网络和弓状束的髓鞘化。"
    ] },
  { id: "reading_dev", title: "学前识字：大脑在“回收利用”",
    structs: ["v1", "parietal", "hippocampus", "pfc"], fine: ["Lateral_occipitotemporal_gyrus=左枕颞区（视觉词形区）", "Precuneus=楔前叶（默认网络）"], fn: ["dev_brain", "language"],
    steps: [
      "学认字时，左枕颞区原本识别物体和面孔的一部分神经元被“改造”成视觉词形区（神经元再利用，Dehaene 2010）。",
      "这种改造在学前期就能发生，说明大脑已经具备识字的可塑性——关键在学习方式，而不是识字本身。",
      "创造性想象依赖默认网络（海马、楔前叶、内侧前额叶）的自由联想；游戏和探索是锻炼这个网络的主要方式，机械、单调的训练挤占的正是这部分时间。"
    ] },
  { id: "gene_env", title: "基因和环境如何共同塑造大脑",
    structs: ["amygdala", "pfc", "hypothalamus", "hippocampus"], fine: ["Midbrain=中缝核（5-羟色胺）"], fn: ["dev_brain", "emotion"],
    steps: [
      "基因决定神经递质系统的“出厂设置”：5-羟色胺转运体基因短型携带者的杏仁核对威胁反应更强（Hariri 2002）。",
      "环境决定这些设置是否被“启动”：短型携带者只有在生活压力较多时抑郁风险才明显升高（Caspi 2003）；MAOA×童年受虐与攻击同理。",
      "表观遗传：早期照料质量会改变应激激素受体基因的表达（母鼠舔舐实验，Meaney），影响一生的HPA轴反应。",
      "大脑本身随经验改变——同一家庭的兄弟姐妹经历不同的非共享环境，大脑的发育也会不同。"
    ] },

  // ---------- 治疗 ----------
  { id: "therapy_brain", title: "心理治疗如何改变大脑",
    structs: ["pfc", "amygdala", "acc", "hippocampus"], fine: ["Straight_gyrus_Gyrus_rectus=腹内侧前额叶（消退记忆）"], fn: ["emotion"],
    steps: [
      "CBT偏“自上而下”：训练前额叶重新评价想法，治疗后前额叶调控增强、杏仁核反应下降（抑郁、焦虑、恐惧症研究结果一致）。",
      "暴露类技术依靠腹内侧前额叶建立新的“安全”记忆去抑制杏仁核（消退学习）。",
      "心理动力治疗通过长期关系和领悟起作用，研究提示它也能改变边缘系统与前额叶的连接，但证据少于CBT。",
      "药物多偏“自下而上”（直接作用于边缘系统和神经递质），与心理治疗作用的环路不同，所以联合使用常效果更好。"
    ] }
];
