// ============================================================
//  心理学人体模型 · 结构知识库（真实解剖版）
//  meshNames = 该结构对应 brain.glb 里的真实网格名（精确匹配）。
//  bodyOnly=true 的结构属全身范围，本"大脑视图"暂不显示，数据保留待全身版。
// ============================================================

export const STRUCTURES = [
  {
    id: "amygdala", name: "杏仁核", en: "Amygdaloid body", system: "limbic",
    subtitle: "情绪（尤其恐惧）的核心中枢", color: 0xff5a5a,
    meshNames: ["Amygdaloid body.l", "Amygdaloid body.r"],
    location: "颞叶内侧、海马前端，左右各一，属边缘系统。",
    functions: [
      "对威胁与情绪刺激快速评估，是恐惧与焦虑的核心。",
      "给记忆'贴情绪标签'，让强情绪事件记得更牢。",
      "调节攻击/愤怒，解读他人恐惧表情。"
    ],
    memory: "与海马协作：海马记'事情本身'，杏仁核加'情绪权重'，情绪越强记忆越深（闪光灯记忆）。",
    disorders: [
      "焦虑症/恐惧症：杏仁核过度激活，对无害刺激报警。",
      "PTSD：杏仁核高反应 + 前额叶抑制不足，闪回惊跳。",
      "抑郁症：对负面信息反应增强。",
      "精神病态/反社会人格：对恐惧痛苦线索反应低下。"
    ],
    experiments: [
      "Klüver-Bucy 综合征：切除猴颞叶（含杏仁核）后恐惧消失。",
      "LeDoux 恐惧条件反射：'丘脑→杏仁核'快速低通路，先反应后思考。",
      "S.M. 病例：杏仁核双侧受损者几乎不知恐惧。"
    ],
    treatment: [
      "暴露疗法：让前额叶重新学会抑制杏仁核警报（消退学习）。",
      "SSRI 抗抑郁/抗焦虑：调节5-羟色胺降低过度反应。",
      "正念：增强前额叶自上而下调控。"
    ]
  },
  {
    id: "hippocampus", name: "海马", en: "Hippocampus", system: "limbic",
    subtitle: "把'经历'变成'长期记忆'的枢纽", color: 0x5a9bff,
    meshNames: ["Hippocampus.l", "Hippocampus.r"],
    location: "颞叶内侧，形似海马，紧邻杏仁核，属边缘系统。",
    functions: [
      "把短时记忆转为长时记忆（记忆巩固）。",
      "空间导航与认知地图（'位置细胞'所在）。",
      "情境记忆：把事件与时间地点绑定。"
    ],
    memory: "记忆的'总编辑室'。受损后无法形成新长期记忆（顺行性遗忘），但旧记忆与技能仍在。",
    disorders: [
      "阿尔茨海默病：海马最早、最严重萎缩，'记不住新事'是首发症状。",
      "抑郁/长期压力：皮质醇偏高会损伤海马、使其缩小。",
      "PTSD：海马体积减小，情境记忆碎片化。"
    ],
    experiments: [
      "H.M. 病例：切除双侧海马后再也记不住新事，却能学会镜画——外显与内隐记忆分离。",
      "伦敦出租车司机：记路者后海马更大，证明神经可塑性。",
      "莫里斯水迷宫：经典空间记忆范式。"
    ],
    treatment: [
      "有氧运动：促进海马神经新生（BDNF 增加）。",
      "抗抑郁治疗可部分逆转压力性海马萎缩。",
      "记忆策略借助内隐系统代偿。"
    ]
  },
  {
    id: "pfc", name: "前额叶皮层", en: "Prefrontal Cortex", system: "cortex",
    subtitle: "理性、计划与自我控制的'CEO'", color: 0xffd24a,
    meshNames: [
      "Superior frontal gyrus.l", "Superior frontal gyrus.r",
      "Middle frontal gyrus.l", "Middle frontal gyrus.r",
      "Orbital gyri.l", "Orbital gyri.r",
      "Straight gyrus (Gyrus rectus).l", "Straight gyrus (Gyrus rectus).r",
      "Transverse frontopolar gyrus and sulcus*.l", "Transverse frontopolar gyrus and sulcus*.r"
    ],
    location: "额叶最前部，人类相对最发达的皮层区。",
    functions: [
      "执行功能：计划、决策、工作记忆、抑制冲动。",
      "自上而下调控情绪，给杏仁核'踩刹车'。",
      "参与人格、道德判断与社会行为。"
    ],
    memory: "工作记忆的核心座椅（背外侧前额叶），暂存并操作信息。",
    disorders: [
      "ADHD：执行功能与抑制控制不足。",
      "抑郁症：背外侧前额叶活动降低，反刍难止。",
      "精神分裂症：前额叶功能低下（低额叶症）。",
      "成瘾：对奖赏冲动的控制被削弱。"
    ],
    experiments: [
      "菲尼亚斯·盖奇（铁棒穿脑）：前额叶损伤后人格剧变。",
      "威斯康星卡片分类（WCST）：评估认知灵活性。",
      "Stroop 任务：测量抑制控制。",
      "米歇尔棉花糖实验：延迟满足与自我控制。"
    ],
    treatment: [
      "认知行为疗法（CBT）：重构对情绪与念头的加工。",
      "经颅磁刺激（rTMS）：刺激背外侧前额叶治难治性抑郁。",
      "正念与执行功能训练。"
    ]
  },
  {
    id: "hypothalamus", name: "下丘脑", en: "Hypothalamus", system: "limbic",
    subtitle: "身体的'恒温器'· HPA轴起点", color: 0xff9a3a,
    meshNames: ["Hypothalamus", "Mamillary body.l", "Mamillary body.r"],
    location: "丘脑下方、脑底部中央，紧邻垂体。",
    functions: [
      "维持内稳态：体温、饥饿、口渴、睡眠、性行为。",
      "连接神经系统与内分泌系统，指挥垂体分泌激素。",
      "启动应激反应，是 HPA 轴（下丘脑-垂体-肾上腺）第一站。"
    ],
    memory: "本身不存记忆，但通过应激激素影响海马与杏仁核的记忆加工。",
    disorders: [
      "抑郁症：HPA 轴过度活跃、皮质醇长期升高。",
      "进食障碍：下丘脑摄食调节紊乱。",
      "睡眠障碍：生物钟（视交叉上核）位于此。"
    ],
    experiments: [
      "塞里一般适应综合征：警觉→抵抗→衰竭，压力生理学奠基。",
      "外侧/腹内侧下丘脑损毁：一个不吃、一个暴食。",
      "坎农'战或逃'反应理论。"
    ],
    treatment: [
      "压力管理/放松训练降低 HPA 轴过度激活。",
      "规律作息、光照疗法调节生物钟（季节性抑郁）。"
    ]
  },
  {
    id: "striatum", name: "纹状体", en: "Striatum (Caudate·Putamen·Pallidum)", system: "deep",
    subtitle: "快感、动机、习惯与成瘾中心（含伏隔核）", color: 0xc06aff,
    meshNames: [
      "Caudate nucleus.l", "Caudate nucleus.r",
      "Putamen.l", "Putamen.r",
      "Globus pallidus.l", "Globus pallidus.r"
    ],
    location: "基底神经节，深埋于大脑半球内。腹侧部分即伏隔核（奖赏核心）。",
    functions: [
      "处理奖赏、快感与动机（腹侧纹状体/伏隔核）。",
      "习惯与程序性学习、动作发起（背侧纹状体）。",
      "接收腹侧被盖区多巴胺信号，驱动趋近行为。"
    ],
    memory: "通过奖赏强化塑造习惯记忆——'为什么会上瘾'的关键。",
    disorders: [
      "各类成瘾（物质/赌博/手机/短视频）：奖赏回路被劫持。",
      "抑郁症快感缺失：奖赏系统反应迟钝。",
      "帕金森病/亨廷顿病：基底神经节退化，运动障碍。",
      "强迫症：皮层-纹状体环路过度活动。"
    ],
    experiments: [
      "奥尔兹与米尔纳(1954)颅内自我刺激：大鼠不停按压'快乐中枢'甚至放弃进食。",
      "斯金纳操作条件反射：可变比率强化最易成瘾（老虎机、刷短视频）。",
      "Schultz 多巴胺'预测误差'：编码的是'超出预期的奖赏'。"
    ],
    treatment: [
      "行为替代/强化管理：用健康奖赏替换成瘾奖赏。",
      "动机访谈、CBT 治疗成瘾。",
      "纳曲酮阻断阿片-多巴胺奖赏以降低渴求。"
    ]
  },
  {
    id: "acc", name: "前扣带回", en: "Anterior Cingulate Cortex", system: "limbic",
    subtitle: "情绪与认知的'冲突监测器'", color: 0x4ad6c0,
    meshNames: ["Cingulate gyrus and sulcus (Middle anterior part).l", "Cingulate gyrus and sulcus (Middle anterior part).r"],
    location: "扣带回前部，胼胝体上方，连接边缘系统与前额叶。",
    functions: [
      "冲突监测与错误检测，发现'不对劲'并调动控制。",
      "疼痛的情绪成分（含社会排斥之痛）。",
      "情绪脑与理性脑之间的桥梁。"
    ],
    memory: "参与情绪调节相关的注意与监控，影响记忆优先级。",
    disorders: [
      "抑郁症：膝下前扣带回(Area 25)过度活跃，是深部脑刺激靶点。",
      "强迫症：前扣带-纹状体环路过度活动，'错误信号'关不掉。",
      "慢性疼痛与情绪障碍共病。"
    ],
    experiments: [
      "Eisenberger Cyberball 网络排斥：社会排斥激活前扣带，'心痛'与生理痛共享脑区。",
      "冲突任务中的 ERN（错误相关负波）源于前扣带。"
    ],
    treatment: [
      "深部脑刺激(DBS) Area 25 治难治性抑郁。",
      "CBT 与暴露反应预防(ERP)治强迫症。"
    ]
  },
  {
    id: "insula", name: "岛叶", en: "Insula", system: "cortex",
    subtitle: "内感受、厌恶与渴求的中枢", color: 0xff7fb0,
    meshNames: ["Insula (Subcentral gyrus and ant. and post. sulci*).l", "Insula (Subcentral gyrus and ant. and post. sulci*).r"],
    location: "藏在外侧裂深处，被额、顶、颞叶盖住。",
    functions: [
      "内感受(interoception)：感知心跳、饥饿、疼痛等身体内部状态。",
      "产生厌恶(disgust)情绪，参与共情。",
      "整合身体状态与情绪，与成瘾的'渴求'密切相关。"
    ],
    memory: "把身体感觉与情绪体验绑定，参与'躯体标记'式的直觉判断。",
    disorders: [
      "成瘾：岛叶损伤的吸烟者可自发戒烟——渴求的关键脑区。",
      "焦虑/惊恐障碍：对身体信号过度解读（如把心跳当心梗）。",
      "抑郁：内感受异常。"
    ],
    experiments: [
      "达马西奥'躯体标记假说'：身体信号参与决策。",
      "岛叶损伤与吸烟戒断研究(Naqvi 2007)。"
    ],
    treatment: [
      "内感受暴露：让惊恐患者习惯身体感觉。",
      "正念身体扫描训练。"
    ]
  },
  {
    id: "thalamus", name: "丘脑", en: "Thalamus", system: "deep",
    subtitle: "通往皮层的'感觉中转站'", color: 0x6ad0ff,
    meshNames: ["Thalamus.l", "Thalamus.r"],
    location: "脑中央成对的卵圆结构，几乎所有感觉信息进皮层前的中继站（嗅觉除外）。",
    functions: [
      "中继并筛选感觉信息送往皮层。",
      "调节觉醒、注意与意识水平。",
      "参与睡眠-觉醒节律。"
    ],
    memory: "特定核团（如前核）属边缘环路，参与记忆（受损可致遗忘）。",
    disorders: [
      "意识障碍/昏迷与丘脑-皮层环路受损相关。",
      "精神分裂症：丘脑对信息的门控异常。",
      "丘脑痛：损伤后的顽固性疼痛。"
    ],
    experiments: [
      "感觉门控(sensory gating)研究：丘脑过滤无关刺激。",
      "睡眠纺锤波起源于丘脑网状核。"
    ],
    treatment: [
      "针对丘脑-皮层环路的神经调控（研究中）。",
      "抗精神病药调节相关多巴胺通路。"
    ]
  },
  {
    id: "corpus_callosum", name: "胼胝体", en: "Corpus Callosum", system: "deep",
    subtitle: "连接左右脑的'高速公路'", color: 0xf0e68c,
    meshNames: ["Corpus callosum"],
    location: "两半球之间最大的白质纤维束，约2亿条神经纤维。",
    functions: [
      "在左右半球之间传递信息、协调两侧。",
      "让语言脑(左)与空间/情绪脑(右)协同工作。"
    ],
    memory: "使两半球共享记忆与经验；切断后两侧可各自独立学习。",
    disorders: [
      "裂脑：治疗顽固癫痫切断胼胝体后，左右脑'各行其是'。",
      "胼胝体发育不全与认知/社交障碍相关。"
    ],
    experiments: [
      "Sperry & Gazzaniga 裂脑研究(诺奖)：左视野物体右脑知道却说不出名（语言在左脑）——揭示大脑偏侧化。"
    ],
    treatment: [
      "胼胝体切开术是顽固癫痫的最后手段。",
      "康复训练促进两侧协调代偿。"
    ]
  },
  {
    id: "cerebellum", name: "小脑", en: "Cerebellum", system: "cortex",
    subtitle: "不只管运动，也管认知与情绪", color: 0x9acd6a,
    meshNames: [
      "Anterior quadrangular lobule.l", "Anterior quadrangular lobule.r",
      "Posterior quadrangular lobule.l", "Posterior quadrangular lobule.r",
      "Superior semilunar lobule.l", "Superior semilunar lobule.r",
      "Inferior semilunar lobule.l", "Inferior semilunar lobule.r",
      "Biventral lobule.l", "Biventral lobule.r",
      "Gracile lobule.l", "Gracile lobule.r",
      "Tonsil of cerebellum.l", "Tonsil of cerebellum.r",
      "Culmen", "Declive", "Uvula of vermis", "Pyramis of vermis"
    ],
    location: "脑后下方，'小小的脑'，含全脑一半以上的神经元。",
    functions: [
      "协调运动、维持平衡与姿势、让动作流畅精准。",
      "运动学习与时序（如乐器、运动技能）。",
      "参与认知、语言与情绪调节（新近认识）。"
    ],
    memory: "程序性/运动记忆与经典条件反射（如眨眼条件反射）的关键。",
    disorders: [
      "小脑认知情感综合征(CCAS)：损伤致执行、情绪调节障碍。",
      "自闭症、精神分裂症中可见小脑异常。",
      "共济失调：运动不协调。"
    ],
    experiments: [
      "眨眼条件反射：小脑是经典条件反射的存储部位。",
      "运动适应实验（棱镜适应）显示小脑的误差校正作用。"
    ],
    treatment: [
      "康复与运动训练。",
      "针对小脑的经颅刺激用于情绪/认知（研究中）。"
    ]
  },
  {
    id: "broca", name: "布洛卡区", en: "Broca's Area", system: "sensorimotor",
    subtitle: "语言'产出'中枢", color: 0xff8c42,
    meshNames: [
      "Opercular part of inferior frontal gyrus.l", "Opercular part of inferior frontal gyrus.r",
      "Triangular part of inferior frontal gyrus.l", "Triangular part of inferior frontal gyrus.r"
    ],
    location: "左额下回后部（多数人语言在左脑）。",
    functions: [
      "语言的产生与语法组织。",
      "参与言语计划与发音编程。"
    ],
    memory: "与语言性工作记忆、内部言语相关。",
    disorders: [
      "布洛卡失语（表达性失语）：能听懂，但说话费力、电报式、不流畅。",
      "口吃等言语流畅性问题的相关脑区。"
    ],
    experiments: [
      "布洛卡'Tan'病例(1861)：患者只会说'tan'，尸检发现左额下回受损——脑功能定位里程碑。"
    ],
    treatment: [
      "言语-语言治疗(SLT)。",
      "旋律语调疗法等康复手段。"
    ]
  },
  {
    id: "pituitary", name: "垂体", en: "Pituitary (Hypophysis)", system: "endocrine",
    subtitle: "内分泌'总指挥'· HPA轴第二站", color: 0xffb86b,
    meshNames: ["Adenohypophysis", "Neurohypophysis"],
    location: "下丘脑正下方，蝶鞍内，豌豆大小。",
    functions: [
      "受下丘脑指挥，分泌激素调控甲状腺、肾上腺、性腺。",
      "应激中分泌 ACTH，命令肾上腺释放皮质醇。",
      "分泌催产素、催乳素、生长激素等。"
    ],
    memory: "催产素影响信任、依恋与社会记忆；应激激素轴影响记忆巩固。",
    disorders: [
      "抑郁/焦虑：HPA 轴失调时 ACTH 分泌异常。",
      "催产素系统异常与孤独症社会障碍相关（研究中）。"
    ],
    experiments: [
      "地塞米松抑制试验(DST)：检测 HPA 轴负反馈，曾作抑郁生物标志。",
      "催产素鼻喷提升信任与共情的实验。"
    ],
    treatment: [
      "针对 HPA 轴的压力干预。",
      "催产素相关社会认知干预（研究阶段）。"
    ]
  },

  {
    id: "m1", name: "初级运动皮层", en: "Primary Motor Cortex (M1)", system: "sensorimotor",
    subtitle: "随意运动的发令区 · '运动小人'", color: 0xff6b6b,
    meshNames: ["Precentral_gyrus_l", "Precentral_gyrus_r"],
    location: "中央前回（中央沟前方），额叶后部。",
    functions: ["发出随意运动指令，控制对侧身体肌肉。", "身体各部位按'运动小人'(homunculus)比例映射，手与口面积最大。"],
    memory: "程序性动作的执行端；技能记忆的输出。",
    disorders: ["卒中/损伤致对侧偏瘫。", "帕金森、运动障碍时运动皮层输出受影响。"],
    experiments: ["彭菲尔德电刺激皮层绘出'运动小人'。", "经颅磁刺激(TMS)运动区可诱发肢体抽动，用于测皮层兴奋性。"],
    treatment: ["康复训练与运动再学习（神经可塑性）。", "镜像疗法、脑机接口辅助运动恢复。"]
  },
  {
    id: "s1", name: "初级躯体感觉皮层", en: "Primary Somatosensory Cortex (S1)", system: "sensorimotor",
    subtitle: "触觉温痛觉的接收区 · '感觉小人'", color: 0x5ac8fa,
    meshNames: ["Postcentral_gyrus_l", "Postcentral_gyrus_r"],
    location: "中央后回（中央沟后方），顶叶前部。",
    functions: ["接收对侧身体的触觉、压觉、温度、痛觉与本体感觉。", "身体按'感觉小人'比例映射，手指与嘴唇代表区最大。"],
    memory: "身体感觉的即时表征，参与'躯体标记'。",
    disorders: ["损伤致对侧感觉缺失或麻木。", "幻肢痛与皮层重组相关。"],
    experiments: ["彭菲尔德电刺激绘出'感觉小人'。", "两点辨别阈实验：手指分辨力最高，反映皮层代表区大小。"],
    treatment: ["感觉再训练。", "针对幻肢痛的镜像疗法。"]
  },
  {
    id: "v1", name: "初级视皮层 / 枕叶视区", en: "Primary Visual Cortex (V1) & Occipital", system: "sensorimotor",
    subtitle: "视觉信息进入皮层的第一站", color: 0x9b7bff,
    meshNames: ["Calcarine_sulcus_l","Calcarine_sulcus_r","Occipital_pole_l","Occipital_pole_r","Cuneus_l","Cuneus_r","Lingual_gyrus_l","Lingual_gyrus_r","Superior_occipital_gyri_l","Superior_occipital_gyri_r","Lateral_occipital_gyrus_Middle_occipital_gyrus_l","Lateral_occipital_gyrus_Middle_occipital_gyrus_r","Inferior_occipital_gyrus_and_sulcus_l","Inferior_occipital_gyrus_and_sulcus_r"],
    location: "枕叶，V1沿距状沟分布。",
    functions: ["处理视觉最基本特征：朝向、边缘、明暗、颜色、运动。", "分出两条通路：背侧'在哪里/怎么做'、腹侧'是什么'。"],
    memory: "视觉表象与心理旋转会激活视皮层。",
    disorders: ["损伤致对侧视野缺损(偏盲)。", "盲视：V1损伤者能'无意识'反应视觉刺激。", "视觉失认(腹侧通路受损)。"],
    experiments: ["休伯尔与威塞尔(诺奖)发现方位选择性细胞与视皮层柱状结构。", "关键期实验：幼年单眼剥夺致视皮层可塑性改变。"],
    treatment: ["视野康复训练。", "低视力辅助与代偿策略。"]
  },
  {
    id: "a1", name: "初级听皮层", en: "Primary Auditory Cortex (A1)", system: "sensorimotor",
    subtitle: "声音进入皮层的第一站", color: 0x4ecdc4,
    meshNames: ["Transverse_temporal_gyri_l","Transverse_temporal_gyri_r","Temporal_plane_l","Temporal_plane_r"],
    location: "颞横回(Heschl回)，颞上回内侧。",
    functions: ["按频率(音调)有序排列(音频拓扑)加工声音。", "参与语音、音乐与声源分析。"],
    memory: "听觉表象与'耳虫'现象涉及听皮层。",
    disorders: ["皮层性耳聋(双侧损伤)。", "幻听：精神分裂常见，与听皮层异常激活相关。", "耳鸣的中枢机制。"],
    experiments: ["音频拓扑图谱研究。", "失匹配负波(MMN)反映听觉自动辨别，用于意识与预测加工研究。"],
    treatment: ["人工耳蜗与听觉训练。", "针对幻听的抗精神病药与认知行为干预。"]
  },
  {
    id: "wernicke", name: "韦尼克区", en: "Wernicke's Area", system: "sensorimotor",
    subtitle: "语言'理解'中枢", color: 0xffa94d,
    meshNames: ["Superior_temporal_gyrus_Lateral_part_l","Superior_temporal_gyrus_Lateral_part_r","Superior_temporal_sulcus_l","Superior_temporal_sulcus_r"],
    location: "颞上回后部（多数人在左脑），邻近听皮层。",
    functions: ["理解口语与书面语言的意义。", "与布洛卡区经弓状束相连，构成语言网络。"],
    memory: "语义记忆的通达；颞上沟还参与社会认知(目光、生物运动)。",
    disorders: ["韦尼克失语(接受性失语)：说话流利但内容空洞、听不懂别人。", "传导性失语(弓状束损伤)：复述困难。"],
    experiments: ["韦尼克(1874)描述后颞叶损伤致理解障碍，与布洛卡区互补，确立语言双中枢模型。"],
    treatment: ["言语-语言治疗。", "结合手势、图片的多通道沟通训练。"]
  },
  {
    id: "parietal", name: "顶叶联合皮层", en: "Parietal Association Cortex", system: "sensorimotor",
    subtitle: "空间注意与感觉整合", color: 0x74c0fc,
    meshNames: ["Superior_parietal_lobule_l","Superior_parietal_lobule_r","Intraparietal_sulcus_l","Intraparietal_sulcus_r","Supramarginal_gyrus_l","Supramarginal_gyrus_r","Angular_gyrus_l","Angular_gyrus_r"],
    location: "顶叶后部，跨顶上小叶、顶内沟、缘上回、角回。",
    functions: ["整合多种感觉，构建空间与身体图式。", "引导注意、手眼协调、数量与工具使用。"],
    memory: "参与工作记忆的空间成分与注意导向的记忆提取。",
    disorders: ["半侧空间忽视(右顶叶损伤)：忽略左半世界。", "Gerstmann综合征(左角回)：失写、失算、手指失认、左右不分。", "失用症。"],
    experiments: ["空间忽视的线段等分/划消实验。", "顶叶注意网络的Posner线索范式研究。"],
    treatment: ["忽视的视觉扫描训练、棱镜适应。", "注意与空间认知康复。"]
  },
  {
    id: "visual_pathway", name: "视觉通路（视交叉·外侧膝状体）", en: "Visual Pathway", system: "deep",
    subtitle: "眼睛到视皮层的'线路'", color: 0xb2f2bb,
    meshNames: ["Optic_chiasm_l","Optic_chiasm_r","Optic_tract_l","Optic_tract_r","Lateral_geniculate_body_l","Lateral_geniculate_body_r"],
    location: "视神经→视交叉→视束→外侧膝状体(丘脑)→视放射→V1。",
    functions: ["把视网膜信号传到皮层；视交叉处鼻侧纤维交叉到对侧。", "外侧膝状体是丘脑视觉中继与门控站。"],
    memory: "视觉输入的最前端，决定'看得到'的基础。",
    disorders: ["不同部位损伤致特定视野缺损：视交叉受压(如垂体瘤)→双颞侧偏盲；视束/膝状体损伤→对侧同向偏盲。"],
    experiments: ["经典视野缺损定位法：由缺损形状反推损伤部位。", "外侧膝状体的层状结构(大细胞/小细胞层)研究。"],
    treatment: ["病因治疗(如切除压迫视交叉的肿瘤)。", "视野康复与辅助。"]
  },
  {
    id: "brainstem", name: "脑干（网状激活系统）", en: "Brainstem (Reticular Activating System)", system: "deep",
    subtitle: "觉醒、睡眠与生命中枢", color: 0xffd43b,
    meshNames: ["Midbrain_l","Midbrain_r","Pons_l","Pons_r","Medulla_oblongata_l"],
    location: "中脑+脑桥+延髓，连接大脑与脊髓。",
    functions: ["网状激活系统(RAS)调控觉醒、意识水平与睡眠-觉醒。", "控制呼吸、心跳、血压等生命体征。", "含多巴胺(VTA)、去甲肾上腺素(蓝斑)、5-羟色胺(中缝核)等关键递质核团来源。"],
    memory: "唤醒水平是注意与记忆编码的基础(耶克斯-多德森定律)。",
    disorders: ["上行网状系统受损致昏迷/意识障碍。", "蓝斑-去甲肾上腺素与焦虑、应激相关；中缝核-5HT与抑郁相关。", "REM睡眠障碍源于脑桥。"],
    experiments: ["Moruzzi & Magoun(1949)刺激网状结构唤醒动物，发现RAS。", "睡眠分期与脑干核团的关系研究。"],
    treatment: ["针对递质系统的药物(抗抑郁作用于5HT/NE来源核团)。", "意识障碍的促醒与生命支持。"]
  },

  // ===== 以下属全身内分泌，本大脑视图不显示，数据保留待全身版 =====
  {
    id: "adrenal", name: "肾上腺", en: "Adrenal Glands", system: "endocrine", bodyOnly: true, color: 0xffb03a,
    subtitle: "应激激素工厂 · HPA轴终点", meshNames: [],
    location: "左右肾脏上方各一，帽状。",
    functions: ["皮质分泌皮质醇（压力激素）维持长期应激。", "髓质分泌肾上腺素驱动即时'战或逃'。", "HPA 轴执行终端。"],
    memory: "适量应激激素增强情绪记忆；长期过量皮质醇损伤海马。",
    disorders: ["抑郁/慢性压力：皮质醇长期偏高。", "PTSD：应激激素调节异常。", "倦怠(burnout)。"],
    experiments: ["沙赫特-辛格情绪二因素：肾上腺素+情境解释共同决定情绪。", "冷压/TSST 社会应激测试诱发皮质醇。"],
    treatment: ["放松、正念、运动降低皮质醇。", "改善睡眠调节应激激素节律。"]
  },
  {
    id: "thyroid", name: "甲状腺", en: "Thyroid Gland", system: "endocrine", bodyOnly: true, color: 0x7ad67a,
    subtitle: "代谢油门 · 情绪的隐形推手", meshNames: [],
    location: "颈部前方、喉结下方，蝴蝶形。",
    functions: ["分泌甲状腺激素调节全身代谢与能量。", "影响心率、体温、体重与精神活力。"],
    memory: "激素不足致注意力、记忆与反应变慢（'脑雾'）。",
    disorders: ["甲减：常表现为抑郁、疲乏——易误诊为抑郁症。", "甲亢：焦虑、失眠、心悸——易误认为焦虑症。"],
    experiments: ["诊断抑郁/焦虑前需筛查甲状腺，排除躯体病因（鉴别诊断）。"],
    treatment: ["内科激素治疗，情绪症状常随之改善。", "提示身心共病、需同治。"]
  }
];

// 莫兰迪低饱和配色 + 解剖子区（region 用于信息卡标签；分组顺序见 STRUCTURE_TREE）
const META = {
  pfc:            { color: 0xC9B98A, region: "额叶" },
  broca:          { color: 0xC3A47E, region: "额叶" },
  m1:             { color: 0xBF8F88, region: "额叶" },
  s1:             { color: 0x92A6B2, region: "顶叶" },
  parietal:       { color: 0x9AAFC0, region: "顶叶" },
  a1:             { color: 0x93AB9F, region: "颞叶" },
  wernicke:       { color: 0xC7A87E, region: "颞叶" },
  v1:             { color: 0xA99CB6, region: "枕叶" },
  insula:         { color: 0xC59C90, region: "岛叶" },
  amygdala:       { color: 0xC08A82, region: "边缘系统" },
  hippocampus:    { color: 0x8FA6B8, region: "边缘系统" },
  acc:            { color: 0x8FB0A6, region: "边缘系统" },
  striatum:       { color: 0xA893A6, region: "基底神经节" },
  thalamus:       { color: 0x97A6C0, region: "间脑" },
  hypothalamus:   { color: 0xC49A7C, region: "间脑" },
  brainstem:      { color: 0xC4AC7E, region: "脑干" },
  cerebellum:     { color: 0x9DAF8E, region: "小脑" },
  corpus_callosum:{ color: 0xCAC0A0, region: "胼胝体（白质）" },
  visual_pathway: { color: 0xA7B396, region: "视觉通路" },
  pituitary:      { color: 0xCBA7AD, region: "内分泌腺体" },
  adrenal:        { color: 0xC7A77C, region: "内分泌腺体" },
  thyroid:        { color: 0x9DB295, region: "内分泌腺体" }
};
for (const s of STRUCTURES) { const m = META[s.id]; if (m) { s.color = m.color; s.region = m.region; } }

// ============ 数据驱动的左栏「按结构」目录（大类 → 子区 → 结构id）============
// 想调顺序/搬结构，改这里即可，无需动代码。
export const STRUCTURE_TREE = [
  { cat: "大脑皮层", groups: [
    { name: "额叶", ids: ["pfc", "broca", "m1"] },
    { name: "顶叶", ids: ["s1", "parietal"] },
    { name: "颞叶", ids: ["a1", "wernicke"] },
    { name: "枕叶", ids: ["v1"] },
    { name: "岛叶", ids: ["insula"] }
  ]},
  { cat: "皮层下系统与核团", groups: [
    { name: "边缘系统", ids: ["amygdala", "hippocampus", "acc"] },
    { name: "基底神经节", ids: ["striatum"] },
    { name: "间脑", ids: ["thalamus", "hypothalamus"] }
  ]},
  { cat: "脑干与小脑", groups: [
    { name: "脑干", ids: ["brainstem"] },
    { name: "小脑", ids: ["cerebellum"] }
  ]},
  { cat: "白质纤维束与通路", groups: [
    { name: "胼胝体", ids: ["corpus_callosum"] },
    { name: "视觉通路", ids: ["visual_pathway"] }
  ]},
  { cat: "内分泌腺体", groups: [
    { name: "垂体", ids: ["pituitary"] }
  ]}
];

// 按功能：点一个功能，相关脑区一起亮。points 为心理学知识点。
export const FUNCTIONS = [
  { id: "vision", name: "视觉", en: "Vision", members: ["visual_pathway", "v1"],
    brief: "光信息的传导与初级加工",
    detail: "眼→视交叉→外侧膝状体→初级视皮层(V1)；V1提取边缘、朝向等基本特征。",
    points: [
      "视觉通路：视交叉处鼻侧纤维交叉，不同部位损伤→不同视野缺损(如双颞侧偏盲)。",
      "特征觉察器(休伯尔&威塞尔，诺奖)；视皮层柱状结构。",
      "视觉双通路：腹侧'是什么'、背侧'在哪里/怎么做'。",
      "盲视：V1损伤者能'无意识'反应视觉刺激。",
      "知觉恒常性、格式塔组织原则、深度线索。"
    ] },
  { id: "hearing", name: "听觉", en: "Hearing", members: ["a1"],
    brief: "声音的皮层加工",
    detail: "耳蜗→内侧膝状体→初级听皮层(颞横回/Heschl回)，按频率有序排列(音频拓扑)。",
    points: [
      "音频拓扑：不同频率对应皮层不同位置。",
      "幻听：精神分裂常见，与听皮层异常激活相关。",
      "失匹配负波(MMN)反映听觉自动辨别。",
      "鸡尾酒会效应：听觉的选择性注意。"
    ] },
  { id: "somatosensory", name: "躯体感觉", en: "Somatosensation", members: ["s1"],
    brief: "触压、温痛与本体感觉",
    detail: "中央后回(S1)接收对侧身体感觉，按'感觉小人'比例映射。",
    points: [
      "感觉'小人'：手指、嘴唇代表区最大。",
      "两点辨别阈：手指分辨力最高。",
      "幻肢痛与皮层重组。",
      "疼痛的闸门控制理论(Melzack & Wall)。"
    ] },
  { id: "chemical", name: "嗅觉与味觉", en: "Smell & Taste", members: ["insula"],
    brief: "味觉(岛叶)与嗅觉",
    detail: "岛叶前部含原发味觉皮层；嗅觉是唯一不经丘脑、直达皮层的感觉，属考点特例。",
    points: [
      "味觉皮层位于岛叶前部。",
      "嗅觉特例：不经丘脑，嗅球→梨状皮层直接入皮层。",
      "嗅觉与情绪记忆紧密相连(普鲁斯特效应)。",
      "(本模型未含嗅球/梨状皮层，可自行文字补充。)"
    ] },
  { id: "attention", name: "注意与空间加工", en: "Attention", members: ["parietal", "pfc", "acc"],
    brief: "选择、维持与分配心理资源",
    detail: "顶叶负责空间定向，前额叶负责自上而下控制，前扣带负责冲突监测，共同构成注意网络。",
    points: [
      "选择性注意：鸡尾酒会效应；双耳分听实验。",
      "过滤器模型(Broadbent)→衰减模型(Treisman)→后期选择。",
      "注意三网络(Posner)：警觉、定向、执行控制。",
      "非注意盲视、变化盲视(看不见'大猩猩')。",
      "半侧空间忽视(右顶叶损伤)。"
    ] },
  { id: "motor", name: "运动控制", en: "Motor Control", members: ["m1", "striatum", "cerebellum"],
    brief: "发起、协调与流畅的动作",
    detail: "初级运动皮层发令，基底神经节(纹状体)选择与启动动作，小脑负责协调、平衡与精准时序。",
    points: [
      "运动'小人'：手与口面部的皮层代表区最大。",
      "基底神经节病变：帕金森(少动、僵直)、亨廷顿(多动、舞蹈样)。",
      "小脑负责运动学习与适应(镜画、棱镜适应)。",
      "程序性记忆/内隐学习：'会做但说不出'(如骑车)。"
    ] },
  { id: "language", name: "语言表达与理解", en: "Language", members: ["broca", "wernicke", "corpus_callosum"],
    brief: "语言的产生、理解与两半球协作",
    detail: "布洛卡区负责'说'，韦尼克区负责'懂'，胼胝体连接两半球——裂脑研究揭示语言偏侧化。",
    points: [
      "布洛卡失语(表达性)：能听懂但说话费力、电报式。",
      "韦尼克失语(接受性)：说话流利却空洞、听不懂别人。",
      "裂脑：切断胼胝体后，左视野(右脑)物体能认却说不出名(语言在左脑)。",
      "大脑偏侧化：约95%右利手语言在左半球。",
      "语言获得关键期(Lenneberg)；乔姆斯基普遍语法。"
    ] },
  { id: "decl_memory", name: "陈述性/空间记忆", en: "Declarative & Spatial Memory", members: ["hippocampus", "thalamus"],
    brief: "事实、事件与空间的记忆",
    detail: "海马把经历转为长期记忆并支持空间导航；丘脑/乳头体环路受损致柯萨可夫遗忘。",
    points: [
      "H.M.病例：海马受损→顺行性遗忘；外显/内隐分离。",
      "柯萨可夫综合征：丘脑/乳头体受损(酗酒)→顺行遗忘+虚构。",
      "三级记忆模型；巩固与再巩固。",
      "遗忘曲线(艾宾浩斯)、系列位置效应(首因/近因)。",
      "空间记忆：位置细胞、伦敦出租车司机研究。"
    ] },
  { id: "emo_memory", name: "情绪记忆", en: "Emotional Memory", members: ["amygdala"],
    brief: "带情绪的记忆更牢",
    detail: "杏仁核给记忆'贴情绪标签'，情绪越强记得越牢。",
    points: [
      "闪光灯记忆；情绪增强记忆巩固。",
      "恐惧条件反射(LeDoux)。",
      "PTSD：闪回与杏仁核-海马失衡。"
    ] },
  { id: "working_memory", name: "工作记忆", en: "Working Memory", members: ["pfc"],
    brief: "短时保持并操作信息",
    detail: "背外侧前额叶是工作记忆的核心座椅。",
    points: [
      "Baddeley模型：中央执行+语音环+视空画板+情景缓冲。",
      "容量7±2(米勒)→组块可扩容。",
      "与执行功能、流体智力密切相关。"
    ] },
  { id: "emotion", name: "情绪加工", en: "Emotion", members: ["amygdala", "acc", "insula"],
    brief: "情绪的产生、体验与调节",
    detail: "杏仁核产生情绪(尤其恐惧)，岛叶提供身体感受，前扣带监测冲突并调节。",
    points: [
      "情绪三理论：詹姆斯-兰格、坎农-巴德、沙赫特-辛格二因素。",
      "杏仁核与恐惧；LeDoux快慢通路。",
      "岛叶内感受；面部反馈假说。",
      "情绪调节(Gross)：认知重评优于表达抑制。",
      "基本情绪(Ekman)的跨文化普遍性。"
    ] },
  { id: "reward", name: "奖赏与成瘾", en: "Reward & Addiction", members: ["striatum", "pfc"],
    brief: "快感、动机与自控失衡",
    detail: "腹侧纹状体(伏隔核)处理奖赏，前额叶负责自控；自控不敌渴求即成瘾。",
    points: [
      "'快乐中枢'(Olds&Milner)：大鼠不停自我电刺激。",
      "多巴胺'奖赏预测误差'(Schultz)。",
      "强化程式：可变比率最顽固(老虎机、刷短视频)。",
      "成瘾：奖赏敏化↑ + 前额叶自控↓。",
      "延迟折扣与自我控制(棉花糖实验)。"
    ] },
  { id: "motivation", name: "基本动机（饥渴性）", en: "Basic Drives", members: ["hypothalamus"],
    brief: "饥、渴、体温、性等基本驱力",
    detail: "下丘脑调节摄食、饮水、体温与性行为，维持内稳态。",
    points: [
      "外侧下丘脑=摄食中枢，腹内侧=饱足中枢(损毁实验：一个不吃、一个暴食)。",
      "内稳态与驱力理论(坎农)。",
      "唤醒与绩效倒U(耶克斯-多德森)。",
      "马斯洛需求层次：生理需要是基础。"
    ] },
  { id: "executive", name: "执行控制与自控", en: "Executive Control", members: ["pfc", "acc"],
    brief: "计划、决策与冲动抑制",
    detail: "前额叶是执行'CEO'，前扣带监测错误与冲突，共同实现自我控制。",
    points: [
      "执行功能三成分(Miyake)：抑制、刷新、转换。",
      "菲尼亚斯·盖奇：前额叶损伤致人格与自控剧变。",
      "常用测验：WCST、Stroop、Go/No-go。",
      "前扣带错误监测：错误相关负波(ERN)。",
      "延迟满足、自我损耗争议。"
    ] },
  { id: "social", name: "社会认知与共情", en: "Social Cognition", members: ["insula", "pfc", "amygdala"],
    brief: "理解他人、共情与自我",
    detail: "杏仁核读情绪，岛叶与前扣带负责共情，内侧前额叶负责心理理论与自我参照。",
    points: [
      "心理理论(ToM)：错误信念任务(Sally-Anne)。",
      "共情的疼痛网络：前扣带+岛叶。",
      "杏仁核识别面部情绪；孤独症的社会脑异常。",
      "内侧前额叶：自我参照与'心智化'；镜像神经元。",
      "基本归因错误、刻板印象与内隐态度。"
    ] },
  { id: "arousal", name: "觉醒·应激·睡眠", en: "Arousal & Stress", members: ["brainstem", "hypothalamus", "pituitary"],
    brief: "唤醒水平、压力与睡眠",
    detail: "脑干网状激活系统决定觉醒与睡眠，下丘脑-垂体启动HPA应激轴。",
    points: [
      "网状激活系统(RAS)控制觉醒；损伤致昏迷。",
      "睡眠周期：NREM与REM交替；REM与做梦、脑桥有关。",
      "HPA应激轴与皮质醇；一般适应综合征(Selye)。",
      "生物钟(视交叉上核)与昼夜节律、褪黑素。",
      "压力应对：问题中心vs情绪中心；习得性无助。"
    ] }
];

// ============ 数据驱动的左栏「按功能」目录（大类 → 功能id）============
export const FUNCTION_TREE = [
  { cat: "基础感觉通道", ids: ["vision", "hearing", "somatosensory", "chemical"] },
  { cat: "知觉与注意", ids: ["attention"] },
  { cat: "运动与行为", ids: ["motor"] },
  { cat: "语言系统", ids: ["language"] },
  { cat: "记忆系统", ids: ["decl_memory", "emo_memory", "working_memory"] },
  { cat: "情绪、动机与奖赏", ids: ["emotion", "reward", "motivation"] },
  { cat: "高级认知与社会功能", ids: ["executive", "social"] },
  { cat: "生存节律与内环境", ids: ["arousal"] }
];

// 兼容：信息卡标签用（保留）
export const SYSTEMS = {
  sensorimotor: { label: "感觉·运动·语言区", color: "#74c0fc" },
  limbic: { label: "边缘系统", color: "#c08a82" },
  cortex: { label: "皮层区", color: "#c9b98a" },
  deep: { label: "深部结构", color: "#97a6c0" },
  endocrine: { label: "内分泌", color: "#cba7ad" }
};
